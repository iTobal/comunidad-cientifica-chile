require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'cambia-esta-clave-en-produccion';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/api/health', (req, res) => {
    res.json({ ok: true, servicio: 'Comunidad Científica de Chile' });
});

// Configuración de la Base de Datos PostgreSQL
const pool = process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      })
    : new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 5432),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'comunidad_cientifica_db',
      });

// Crear tablas automáticamente y asegurar el admin con clave 0206 al iniciar
async function inicializarDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS solicitudes (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                correo VARCHAR(100) NOT NULL,
                area VARCHAR(100) NOT NULL,
                region VARCHAR(100) NOT NULL,
                descripcion TEXT,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                correo VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                rol VARCHAR(20) DEFAULT 'miembro',
                area VARCHAR(100),
                region VARCHAR(100),
                debe_cambiar_password BOOLEAN DEFAULT FALSE,
                fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Crear administrador por defecto si no existe
        const adminCheck = await pool.query("SELECT * FROM usuarios WHERE rol = 'admin'");
        if (adminCheck.rows.length === 0) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash('0206', salt);
            await pool.query(`
                INSERT INTO usuarios (nombre, correo, password_hash, rol, area, region, debe_cambiar_password) 
                VALUES ('Administrador', 'admin@correo.com', $1, 'admin', 'Informática', 'Metropolitana', FALSE);
            `, [passwordHash]);
            console.log("¡Administrador creado con éxito! Correo: admin@correo.com / Clave: 0206");
        }

        console.log("Tablas 'solicitudes' y 'usuarios' verificadas/creadas con éxito en PostgreSQL.");
    } catch (err) {
        console.error("Error al inicializar las tablas en la base de datos:", err);
    }
}
inicializarDB();

// ==========================================
// ENDPOINTS DE SOLICITUDES (Página principal)
// ==========================================
app.post('/api/registro', async (req, res) => {
    const { nombre, correo, area, region, descripcion } = req.body;
    try {
        const query = `
            INSERT INTO solicitudes (nombre, correo, area, region, descripcion) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
        const values = [nombre, correo, area, region, descripcion];
        const result = await pool.query(query, values);
        res.status(201).json({ mensaje: '¡Solicitud registrada con éxito!', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al guardar la solicitud en la base de datos' });
    }
});

app.get('/api/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM solicitudes ORDER BY fecha DESC;');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al consultar las solicitudes' });
    }
});

// ==========================================
// ENDPOINTS DE AUTENTICACIÓN (Login y Cambio de Clave)
// ==========================================
app.post('/api/auth/login', async (req, res) => {
    const { correo, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos.' });
        }

        const usuario = result.rows[0];
        const passwordValido = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordValido) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos.' });
        }

        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo, rol: usuario.rol, nombre: usuario.nombre },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            mensaje: '¡Inicio de sesión exitoso!',
            token,
            debeCambiarPassword: usuario.debe_cambiar_password,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol,
                area: usuario.area,
                region: usuario.region
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el servidor al iniciar sesión' });
    }
});

// Endpoint para actualizar la contraseña obligatoria
app.post('/api/auth/cambiar-password', async (req, res) => {
    const { correo, nuevaPassword } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(nuevaPassword, salt);

        await pool.query(`
            UPDATE usuarios 
            SET password_hash = $1, debe_cambiar_password = FALSE 
            WHERE correo = $2;
        `, [passwordHash, correo]);

        res.json({ mensaje: '¡Contraseña actualizada con éxito!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar la contraseña' });
    }
});

// ==========================================
// ENDPOINTS DE ADMINISTRACIÓN
// ==========================================

// 1. Obtener lista de usuarios oficiales registrados
app.get('/api/admin/usuarios-lista', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, nombre, correo, rol, area, region, fecha_registro FROM usuarios ORDER BY id ASC;');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
});

// 2. APROBAR Solicitud (La pasa a usuarios con clave temporal y marca el cambio obligatorio)
app.post('/api/admin/aprobar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const solResult = await pool.query('SELECT * FROM solicitudes WHERE id = $1', [id]);
        if (solResult.rows.length === 0) {
            return res.status(404).json({ error: 'Solicitud no encontrada' });
        }

        const sol = solResult.rows[0];

        const userExist = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [sol.correo]);
        if (userExist.rows.length > 0) {
            await pool.query('DELETE FROM solicitudes WHERE id = $1', [id]);
            return res.status(400).json({ error: 'El usuario ya estaba registrado en el sistema (solicitud eliminada).' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('123456', salt);

        await pool.query(`
            INSERT INTO usuarios (nombre, correo, password_hash, rol, area, region, debe_cambiar_password) 
            VALUES ($1, $2, $3, 'miembro', $4, $5, TRUE);
        `, [sol.nombre, sol.correo, passwordHash, sol.area, sol.region]);

        await pool.query('DELETE FROM solicitudes WHERE id = $1', [id]);

        res.json({ mensaje: '¡Solicitud aprobada con éxito! Se le asignó la contraseña temporal: 123456 (Deberá cambiarla al ingresar)' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al aprobar la solicitud' });
    }
});

// 3. Eliminar usuario del sistema
app.delete('/api/admin/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

// 4. Cambiar rol de un usuario
app.put('/api/admin/usuarios/rol/:id', async (req, res) => {
    const { id } = req.params;
    const { rol } = req.body; 
    try {
        await pool.query('UPDATE usuarios SET rol = $1 WHERE id = $2', [rol, id]);
        res.json({ mensaje: 'Rol actualizado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el rol' });
    }
});

// 5. Eliminar solicitud directamente sin aprobar
app.delete('/api/admin/solicitudes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM solicitudes WHERE id = $1', [id]);
        res.json({ mensaje: 'Solicitud eliminada con éxito' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la solicitud' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});