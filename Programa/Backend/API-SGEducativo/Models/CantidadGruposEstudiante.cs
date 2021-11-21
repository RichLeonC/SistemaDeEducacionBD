using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("CantidadGruposEstudiante")]
    public class CantidadGruposEstudiante
    {
       
        public int grado { get; set; }
        [Key]
        public string nombreCompleto { get; set; }
        
        public int numPeriodo { get; set; }

        public int anno { get; set; }

        public int CantidadGrupos { get; set; }


    }
}
