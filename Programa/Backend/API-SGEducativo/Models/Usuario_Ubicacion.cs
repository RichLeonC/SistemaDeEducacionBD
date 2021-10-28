using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{

    [Table("Usuario_Ubicacion")]
    public class Usuario_Ubicacion
    {
        [Key]
        public int cedula { get; set; }
        public string provincia { get; set; }
        public string canton { get; set; }
        public string distrito { get; set; }
        public string localidad { get; set; }
    }
}
