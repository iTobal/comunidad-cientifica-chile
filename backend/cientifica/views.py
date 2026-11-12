from django.shortcuts import render

from django.http import JsonResponse

from .models import (
    Investigador,
    ProyectoInvestigacion,
    PublicacionCientifica,
)


def resumen_cientifico(request):
    investigadores = Investigador.objects.filter(activo=True)
    proyectos = ProyectoInvestigacion.objects.filter(activo=True)
    publicaciones = PublicacionCientifica.objects.filter(activo=True)

    datos = {
        "cantidad_investigadores": investigadores.count(),
        "cantidad_proyectos": proyectos.count(),
        "cantidad_publicaciones": publicaciones.count(),
        "proyectos": [
            {
                "id": proyecto.id,
                "titulo": proyecto.titulo,
                "area_cientifica": proyecto.area_cientifica,
                "estado": proyecto.get_estado_display(),
                "investigador_responsable": (
                    proyecto.investigador_responsable.nombre_completo
                ),
                "cantidad_publicaciones": proyecto.publicaciones.count(),
            }
            for proyecto in proyectos
        ],
    }

    return JsonResponse(datos)

