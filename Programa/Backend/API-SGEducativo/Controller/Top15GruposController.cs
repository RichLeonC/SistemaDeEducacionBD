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
    public class Top15GruposController : ControllerBase
    {
        // GET: api/<Top15GruposController>
        private readonly AppDbContext _context;

        public Top15GruposController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<CantidadARController>

        [HttpGet]
        public ActionResult Get15Grupos()
        {
            return Ok(_context.Top15Grupos.FromSqlRaw("select codigoGrupo,numPeriodo, anno, porcentajeAprobado, ProfesorImparte, grado from top15Grupos"));
        }


        // GET api/<Top15GruposController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Top15GruposController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Top15GruposController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Top15GruposController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
