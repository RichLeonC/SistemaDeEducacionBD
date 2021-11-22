using API_SGEducativo.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API_SGEducativo.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CantidadARController : ControllerBase
    {

        private readonly AppDbContext _context;

        public CantidadARController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<CantidadARController>


        [HttpGet("{numPeriodo}/{anno}")]
        public ActionResult GetAprobadosReprobados(int numPeriodo, int anno)
        {
            return Ok(_context.CantidadAR.FromSqlRaw("select codigoNombre,CantidadAprobados, CantidadReprobados from CantidadAR(" + numPeriodo + "," + anno + ")"));
        }

        // GET api/<CantidadARController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CantidadARController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CantidadARController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CantidadARController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
