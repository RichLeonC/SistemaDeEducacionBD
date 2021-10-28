using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Periodo")]
    public class Periodo
    {
        [Key]
        public int numero { get; set; }
        [Key]
        public int anno { get; set; }
        public DateTime fechaInicio { get; set; }
        public DateTime fechaFinal { get; set; }

    }
}
