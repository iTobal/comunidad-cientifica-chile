from django.contrib import admin

from django.contrib import admin

from .models import (
    Investigador,
    ProyectoInvestigacion,
    PublicacionCientifica,
)


@admin.register(Investigador)
class InvestigadorAdmin(admin.ModelAdmin):
    list_display = (
        "nombre_completo",
        "correo",
        "especialidad",
        "institucion",
        "region",
        "activo",
    )
    search_fields = (
        "nombre_completo",
        "correo",
        "especialidad",
        "institucion",
    )
    list_filter = (
        "especialidad",
        "region",
        "activo",
    )


@admin.register(ProyectoInvestigacion)
class ProyectoInvestigacionAdmin(admin.ModelAdmin):
    list_display = (
        "titulo",
        "area_cientifica",
        "estado",
        "investigador_responsable",
        "fecha_inicio",
        "activo",
    )
    search_fields = (
        "titulo",
        "resumen",
        "area_cientifica",
    )
    list_filter = (
        "estado",
        "area_cientifica",
        "activo",
    )


@admin.register(PublicacionCientifica)
class PublicacionCientificaAdmin(admin.ModelAdmin):
    list_display = (
        "titulo",
        "tipo",
        "anio_publicacion",
        "proyecto",
        "activo",
    )
    search_fields = (
        "titulo",
        "resumen",
        "doi",
    )
    list_filter = (
        "tipo",
        "anio_publicacion",
        "activo",
    )
    filter_horizontal = (
        "autores",
    )

