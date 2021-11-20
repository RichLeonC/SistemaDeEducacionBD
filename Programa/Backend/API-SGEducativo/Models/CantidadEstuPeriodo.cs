using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("CantidadEstuPeriodo")]
    public class CantidadEstuPeriodo
    {
        [Key]
        public int CantidadEstudiantes { get; set; }
        [Key]
        public string codigoGrupo { get; set; }
        [Key]
        public int anno { get; set; }
        [Key]
        public int numPeriodo { get; set; }
      

    }
}
