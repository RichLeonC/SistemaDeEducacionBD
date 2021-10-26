using API_SGEducativo.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API_SGEducativo.Context
{
    public class AppDbContext: DbContext
    {

      
      public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
      {

       }
      public DbSet<Usuario> usuarios { get; set; }
      public DbSet<Matricula> Matricula { get; set; }

        
    }
}