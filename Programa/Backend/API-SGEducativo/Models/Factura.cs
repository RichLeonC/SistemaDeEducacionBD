using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Factura")]
    public class Factura
    {
        [Key]
        public int numeroFactura { get; set; }
        public int consecutivo { get; set; }
        public decimal totalPago { get; set; }
        public decimal iva { get; set; }
        public DateTime fechaPago { get; set; }

    }
}
