using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Evaluacion_Estudiante")]
    public class Evaluacion_Estudiante
    {
        [Key]
        public int cedulaEstudiante { get; set; }
        public string codigoGrupo { get; set; }
        public string nombreMateria { get; set; }
        public int numPeriodo { get; set; }
        public int anno { get; set; }

        public double notaObtenida { get; set; }
        public string rubro { get; set; }
    }
}
