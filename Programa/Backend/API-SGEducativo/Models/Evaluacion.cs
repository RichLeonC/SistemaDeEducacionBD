using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table ("Evaluacion")]
    public class Evaluacion
    {
        public string rubro { get; set; }
        public int porcentaje { get; set; }

        [Key]
        public string codigoGrupo { get; set; }
      
        public int numPeriodo { get; set; }
       
        public int anno { get; set; }
      
        public string nombreMateria { get; set; }
        


    }
}
