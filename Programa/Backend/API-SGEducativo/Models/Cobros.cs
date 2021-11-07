using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_SGEducativo.Models
{
    [Table ("Cobros")]
    public class Cobros
    {
        [Key]
        public int consecutivo { get; set; }
        public int idMatricula { get; set; }

        public string estado { get; set; }

    }
}
