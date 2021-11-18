using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Padre_DeudasVista")]
    public class Padre_DeudasVista
    {
        [Key]
        public int cedulaPadre { get; set; }
        public string nombrePadre { get; set; }
        public int cantidad { get; set; }

    }
}
