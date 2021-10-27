using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Profesor")]
    public class Profesor
    {
        [Key]
        public int cedula { get; set; }
        public decimal salario { get; set; }

    }
}
