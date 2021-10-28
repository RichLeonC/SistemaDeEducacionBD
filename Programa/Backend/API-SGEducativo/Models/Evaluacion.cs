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
        [Key]
        public string codigoGrupo { get; set; }
        [Key]
        public int numPeriodo { get; set; }
        [Key]
        public int anno { get; set; }
        [Key]
        public string nombreMateria { get; set; }
        public string descripcion { get; set; }


    }
}
