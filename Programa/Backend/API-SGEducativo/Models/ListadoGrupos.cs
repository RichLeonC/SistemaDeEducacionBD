using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{


    [Table("ListadoGrupos")]
    public class ListadoGrupos
    {
        [Key]
        public string codigoGrupo { get; set; }
      
        public double notaObtenida { get; set; }
        
    }
}
