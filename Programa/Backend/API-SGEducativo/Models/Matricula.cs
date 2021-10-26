using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Matricula")]
    public class Matricula
    {
        [Key]
        public int idMatricula { get; set; }
        public double costeMatricula { get; set; }
        public DateTime fechaCreacion { get; set; }
        public int cedulaEstudiante { get; set; }
        public string codigoGrupo { get; set; }
        public int numPeriodo { get; set; }
        public int anno { get; set; }
        public string nombreMateria { get; set; }

       


    }
}
