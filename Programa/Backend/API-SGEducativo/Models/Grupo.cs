using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Grupo")]
    public class Grupo
    {
        [Key]
        public string codigoNombre { get; set; }
        [Key]
        public string nombreMateria { get; set; }
        public int cedulaProfesor { get; set; }
        [Key]
        public int numeroPeriodo { get; set; }
        [Key]
        public int anno { get; set; }
        public int grado { get; set; }
        public int cupo { get; set; }
        public string estado { get; set; }

    }
}
