using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Funcion_Promedio_Notas")]
    public class Funcion_Promedio_Notas
    {
        [Key]
      
        public string codigoGrupo { get; set; }
        public int numPeriodo { get; set; }
        public int anno { get; set; }
        public double PromedioNota { get; set; }
        
      
    }
}
