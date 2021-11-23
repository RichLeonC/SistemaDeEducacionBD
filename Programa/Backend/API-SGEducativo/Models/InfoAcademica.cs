using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{

    [Table("InfoAcademica")]
    public class InfoAcademica
    {
        [Key]
        public double ponderado { get; set; }

        [Key]
        public int cantidadGrupos { get; set; }

        [Key]
        public int CantidadAprobados { get; set; }

        public int cantidadReprobados { get; set; }
        public double PromedioAprobadas { get; set; }

        public double PromedioReprobadas { get; set; }

    }
}
