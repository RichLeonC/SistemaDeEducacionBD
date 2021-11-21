using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("Generos")]
    public class Generos
    {
        public double femenino { get; set; }
        public double masculino { get; set; }
        [Key]
        public string periodo { get; set; }
    }
}
