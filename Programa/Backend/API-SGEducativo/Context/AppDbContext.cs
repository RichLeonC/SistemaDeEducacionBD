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
        }

        public DbSet<Usuario> usuarios { get; set; }
        public DbSet<Matricula> Matricula { get; set; }

        public DbSet<Profesor> Profesor { get; set; }

        public DbSet<Grupo> Grupo { get; set; }

        
    }
}