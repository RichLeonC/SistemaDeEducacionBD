using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{

    [Table("CantidadAR")]
    public class CantidadAR
    {
        [Key]
        public string codigoNombre { get; set; }
        public int cantidadAprobados { get; set; }

        public int cantidadReprobados { get; set; }

    }
}
