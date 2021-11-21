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
    public class TopAusenciaVistaController : ControllerBase
    {



        private readonly AppDbContext _context;

        public TopAusenciaVistaController(AppDbContext context)
        {
            _context = context;

        }



        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_context.TopAusencias.FromSqlRaw("select nombreCompleto, CantidadAusencias from Top_10_Ausencias"));
        }

        // GET api/<TopAusenciaVistaController>/5


        [HttpGet("{numPeriodo}/{anno}")]
        public ActionResult Getres(int numPeriodo, int anno)
        {
            return Ok(_context.TopAusencias.FromSqlRaw("select nombreCompleto, CantidadAusencias from Top_10_Ausencias_Filtrar(" + numPeriodo + "," + anno + ")"));
        }


        // GET api/<TopAusenciaVistaController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TopAusenciaVistaController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TopAusenciaVistaController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TopAusenciaVistaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
