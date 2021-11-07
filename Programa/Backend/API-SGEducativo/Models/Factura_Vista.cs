using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Factura_Vista")]
    public class Factura_Vista
    {
        [Key]
        public int consecutivo { get; set; }
        public int idMatricula { get; set; }
        public int cedulaEstudiante { get; set; }
        public string nombreCompleto { get; set; }
        public string codigoGrupo { get; set; }
        public int numPeriodo { get; set; }
        public int anno { get; set; }
        public decimal iva { get; set; }
        public decimal totalPago { get; set; }
        public double totalPagadoIva { get; set; }
        public DateTime fechaPago { get; set; }
    }
}
