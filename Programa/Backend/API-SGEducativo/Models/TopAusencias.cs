using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("TopAusencias")]
    public class TopAusencias
    {
        [Key]
        public string nombreCompleto { get; set; }
   
        public int CantidadAusencias { get; set; }
      

    }
}
