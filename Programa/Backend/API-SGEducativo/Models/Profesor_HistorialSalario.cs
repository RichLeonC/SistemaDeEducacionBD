using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Profesor_HistorialSalario")]
    public class Profesor_HistorialSalario
    {
        [Key]
        public int cedula { get; set; }
        [Key]
        public DateTime inicio { get; set; }
        [Key]
        public DateTime fin { get; set; }
        public decimal monto { get; set; }


    }
}
