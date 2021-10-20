using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

//Clase que hace referencia a la tabla de usuarios
namespace API_SGEducativo.Models
{
    [Table("Usuario")]  //Se relaciona con la tabla Usuario
    public class Usuario
    {
        [Key] 
        public int cedula { get; set; }
        public String nombre { get; set; }
        public String apellido1 { get; set; }
        public String apellido2 { get; set; }
        public String password { get; set; }
        public String sexo { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public String rol { get; set; }
        public DateTime fechaCreacion { get; set; }
    }
}