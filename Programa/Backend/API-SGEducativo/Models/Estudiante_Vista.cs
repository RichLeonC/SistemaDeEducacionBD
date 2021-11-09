using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Estudiante_Vista")]
    public class Estudiante_Vista
    {
        [Key]
        public int cedula { get; set; }
        public string nombreCompleto { get; set; }
        public string sexo { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public string provincia { get; set; }
        public string canton { get; set; }
        public string distrito { get; set; }
        public string localidad { get; set; }
        public int grado { get; set; }
        public int cedulaPadre { get; set; }
    }
}
