using API_SGEducativo.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API_SGEducativo.Context
{
    public class AppDbContext : DbContext
    {


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<Grupo>().HasKey(e => new { e.numeroPeriodo, e.anno, e.codigoNombre, e.nombreMateria });
            modelBuilder.Entity<Grupo_Horario>().HasKey(e => new { e.numPeriodo, e.anno, e.codigoGrupo, e.nombreMateria });
            modelBuilder.Entity<Evaluacion>().HasKey(e => new { e.numPeriodo, e.anno, e.codigoGrupo, e.nombreMateria });
            modelBuilder.Entity<Periodo>().HasKey(e => new { e.anno, e.numero});

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

    }
}