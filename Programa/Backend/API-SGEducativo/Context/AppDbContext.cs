using API_SGEducativo.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API_SGEducativo.Context
{
    //CLASE ENCARGADA DE INCIALIZAR LAS TABLAS DE LA BASE DE DATOS
    public class AppDbContext : DbContext
    {


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<Grupo>().HasKey(e => new { e.numeroPeriodo, e.anno, e.codigoNombre, e.nombreMateria });
            modelBuilder.Entity<Grupo_Horario>().HasKey(e => new { e.numPeriodo, e.anno, e.codigoGrupo, e.nombreMateria });
            modelBuilder.Entity<Evaluacion>().HasKey(e => new { e.numPeriodo, e.anno, e.codigoGrupo, e.nombreMateria , e.rubro});
            modelBuilder.Entity<Periodo>().HasKey(e => new { e.anno, e.numero});
            modelBuilder.Entity<Asistencia_Estudiante>().HasKey(e => new { e.numPeriodo, e.anno, e.codigoGrupo, e.nombreMateria, e.cedulaEstudiante });
            modelBuilder.Entity<Evaluacion_Estudiante>().HasKey(e => new { e.numPeriodo, e.anno, e.codigoGrupo, e.nombreMateria, e.cedulaEstudiante , e.rubro});
            modelBuilder.Entity<Evaluacion_Grupo_Estudiante>().HasKey(e => new { e.numPeriodo, e.anno, e.codigoGrupo, e.nombreMateria, e.cedulaEstudiante });
            modelBuilder.Entity<Profesor_HistorialSalario>().HasKey(e => new { e.cedula, e.inicio, e.fin });
            modelBuilder.Entity<CantidadEstuPeriodo>().HasKey(e => new { e.anno, e.numPeriodo, e.CantidadEstudiantes, e.codigoGrupo });
            //modelBuilder.Entity<CantidadGrupoPeriodo>().HasKey(e => new { e.anno, e.numero, e.CantidadGrupos });


        }


        public DbSet<Usuario> usuarios { get; set; }
        public DbSet<Matricula> Matricula { get; set; }

        public DbSet<Profesor> Profesor { get; set; }

        public DbSet<Grupo> Grupo { get; set; }

        public DbSet<Usuario_Ubicacion> Usuario_Ubicacion { get; set; }

        public DbSet<Padre> Padre { get; set; }

        public DbSet<Estudiante> Estudiante { get; set; }
        public DbSet<Profesor_HistorialSalario> Profesor_HistorialSalario { get; set; }
        public DbSet<Materia> Materia { get; set; }

        public DbSet<Periodo> Periodo { get; set; }

        public DbSet<Grupo_Horario> Grupo_Horario { get; set; }

        public DbSet<Asistencia_Estudiante> Asistencia_Estudiante { get; set; }

        public DbSet<Evaluacion> Evaluacion { get; set; }

        public DbSet<Cobros> Cobros { get; set; }

        public DbSet<Factura> Factura { get; set; }

        public DbSet<Evaluacion_Estudiante> Evaluacion_Estudiante { get; set; }

        public DbSet<Padre_Vista> Padre_Vistas { get; set; }
        public DbSet<Estudiante_Vista> Estudiante_Vista { get; set; }
        public DbSet<Profesor_Vista> Profesor_Vistas { get; set; }

        public DbSet<Evaluacion_Grupo_Estudiante> Evaluacion_Grupo_Estudiante { get; set; }

        public DbSet<Padre_DeudasVista> Padre_DeudasVistas { get; set; }

        public DbSet<Factura_Vista> Factura_Vistas { get; set; }

        public DbSet<DetalleCobrosPadre_F> DetalleCobrosPadre_F { get; set; }

        public DbSet<Funcion_Promedio_Notas> Funcion_Promedio_Notas { get; set; }

        public DbSet<PromedioEstudiantes_F> PromedioEstudiantes { get; set; }

        public DbSet<CantidadEstuPeriodo> CantidadEstuPeriodo { get; set; }

        //public DbSet<CantidadGrupoPeriodo> CantidadGrupoPeriodo { get; set; }

        public DbSet<Ingresos> Ingresos;

        public DbSet<TopAusencias> TopAusencias { get; set; }

        public DbSet<CantidadGruposEstudiante> CantidadGruposEstudiante { get; set; }


    }
}