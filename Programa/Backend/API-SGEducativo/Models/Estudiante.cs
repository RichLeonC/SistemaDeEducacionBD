using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Estudiante")]
    public class Estudiante
    {
        [Key]
        public int cedula { get; set; }
        public int cedulaPadre { get; set; }
        public int grado { get; set; }
    }
}
