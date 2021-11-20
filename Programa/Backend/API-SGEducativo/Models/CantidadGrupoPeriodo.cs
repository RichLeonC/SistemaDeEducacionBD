using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("CantidadGrupoPeriodo")]
    public class CantidadGrupoPeriodo
    {
        [Key]
        public int numero { get; set; }
        [Key]
        public int  anno { get; set; }
        [Key]
        public int CantidadGrupos { get; set; }

    }
}
