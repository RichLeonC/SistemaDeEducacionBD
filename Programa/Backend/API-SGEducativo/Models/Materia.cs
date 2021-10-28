using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table ("Materia")]
    public class Materia
    {
        [Key]
        public string nombre { get; set; }
        public decimal precio { get; set; }
    }
}
