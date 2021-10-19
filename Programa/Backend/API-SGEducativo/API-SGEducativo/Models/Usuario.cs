using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_SGEducativo.Models
{
    [Table("Usuario")]
    public class Usuario
    {
        [Key]
        public int cedula { get; set; }
        public String nombre { get; set; }
        public String apellido1 { get; set; }
        public String apellido2 { get; set; }
        public String contrasenia { get; set; }
        public String sexo { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public String rol { get; set; }
        public DateTime fechaCreacion { get; set; }
    }
}