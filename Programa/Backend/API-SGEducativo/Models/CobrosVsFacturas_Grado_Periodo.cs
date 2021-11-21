using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("CobrosVsFacturas_Grado_Periodo")]
    public class CobrosVsFacturas_Grado_Periodo
    {
        [Key]
        public int cobros { get; set; }
        [Key]
        public int facturas { get; set; }
        [Key]
        public string gradoPeriodo { get; set; }

    }
}
