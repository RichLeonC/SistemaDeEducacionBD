using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("VentasPeriodo")]
    public class VentasPeriodo
    {
        public double ventas { get; set; }
        [Key]
        public string rango { get; set; }
        public double otrosPeriodos { get; set; }
    }
}
