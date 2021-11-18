using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("DetalleCobrosPadre_F")]
    public class DetalleCobrosPadre_F
    {
        [Key]
        public int consecutivo { get; set; }
        public int idMatricula { get; set; }
        public int cedulaEstudiante { get; set; }
        public string codigoGrupo { get; set; }
        public string nombreMateria { get; set; }
        public int numPeriodo { get; set; }
        public int anno { get; set; }
    }
}
