using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("PorcentajeReprobados")]
    public class PorcentajeReprobrados
    {
        [Key]
        public string codigoGrupo { get; set; }
        [Key]
        public int numPeriodo { get; set; }
        [Key]
        public int anno { get; set; }
        public double porcentajeReprobado { get; set; }
        public string ProfesorImparte { get; set; }
        public int grado { get; set; }
    }
}
