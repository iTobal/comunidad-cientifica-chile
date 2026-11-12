from django.db import models

class Investigador(models.Model):
    nombre_completo = models.CharField(max_length=150)
    correo = models.EmailField(unique=True)
    especialidad = models.CharField(max_length=150)
    institucion = models.CharField(max_length=150)
    region = models.CharField(max_length=100)
    contacto = models.CharField(max_length=100, blank=True)
    biografia = models.TextField(blank=True)
    activo = models.BooleanField(default=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["nombre_completo"]

    def __str__(self):
        return self.nombre_completo

class ProyectoInvestigacion(models.Model):
    ESTADOS = [
        ("planificado", "Planificado"),
        ("en_ejecucion", "En ejecución"),
        ("finalizado", "Finalizado"),
        ("suspendido", "Suspendido"),
    ]

    titulo = models.CharField(max_length=200)
    resumen = models.TextField()
    area_cientifica = models.CharField(max_length=150)
    estado = models.CharField(
        max_length=30,
        choices=ESTADOS,
        default="planificado"
    )
    fecha_inicio = models.DateField()
    fecha_termino = models.DateField(null=True, blank=True)

    investigador_responsable = models.ForeignKey(
        Investigador,
        on_delete=models.PROTECT,
        related_name="proyectos_responsables"
    )

    activo = models.BooleanField(default=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-fecha_inicio"]

    def __str__(self):
        return self.titulo

class PublicacionCientifica(models.Model):
    TIPOS = [
        ("articulo", "Artículo científico"),
        ("ponencia", "Ponencia"),
        ("informe", "Informe técnico"),
        ("tesis", "Tesis"),
        ("libro", "Libro o capítulo"),
    ]

    titulo = models.CharField(max_length=250)
    resumen = models.TextField(blank=True)
    tipo = models.CharField(
        max_length=30,
        choices=TIPOS,
        default="articulo"
    )
    anio_publicacion = models.PositiveIntegerField()
    doi = models.CharField(max_length=150, blank=True)
    url = models.URLField(blank=True)

    proyecto = models.ForeignKey(
        ProyectoInvestigacion,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="publicaciones"
    )

    autores = models.ManyToManyField(
        Investigador,
        related_name="publicaciones",
        blank=True
    )

    activo = models.BooleanField(default=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-anio_publicacion", "titulo"]

    def __str__(self):
        return self.titulo
