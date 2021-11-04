using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Grupo_Horario")]
    public class Grupo_Horario
    {
        [Key]
        public string codigoGrupo { get; set; }
        [Key]
        public string nombreMateria { get; set; }
        [Key]
        public int numPeriodo { get; set; }
        public int anno { get; set; }
        public string  dias { get; set; }
        public string horaInicio { get; set; }
        public string horaFin { get; set; }


    }
}
