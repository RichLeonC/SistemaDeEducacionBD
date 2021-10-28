using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table ("Padre")]
    public class Padre
    {
        [Key]
        public int cedula { get; set; }
        public string profesion { get; set; }
        public string conyugeNombre { get; set; }
        public int telefonoConyuge { get; set; }


    }
}
