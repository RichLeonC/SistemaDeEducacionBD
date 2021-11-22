using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table("TopProfesores")]
    public class TopProfesores
    {
        [Key]
        public string nombreCompleto { get; set;}
        public decimal salarioInicial { get; set; }
        public decimal salarioActual { get; set; }
        public decimal aumento { get; set; }
    }
}
