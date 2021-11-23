using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{

    [Table("Top15Grupos")]
    public class Top15Grupos
    {
        [Key]
        public string codigoGrupo { get; set; }
        public int numPeriodo { get; set; }
        public int anno { get; set; }
        public double porcentajeAprobado { get; set; }
        public string ProfesorImparte { get; set; }
        public int grado { get; set; }
    }
}
