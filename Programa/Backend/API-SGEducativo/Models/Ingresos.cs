using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Ingresos")]
    public class Ingresos
    {
        [Key]
        public int grado { get; set; }
        [Key]
        public int numeroPeriodo { get; set; }
        [Key]
        public int anno { get; set; }
        public double ingreso { get; set; }
        public decimal totalPeriodo { get; set; }
        public int matriculas { get; set; }
    }
}
