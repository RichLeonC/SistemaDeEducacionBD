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
    public class CantidadGruposEstudianteController : ControllerBase
    {

            private readonly AppDbContext _context;

            public CantidadGruposEstudianteController(AppDbContext context)
            {
                _context = context;
            }

        // GET: api/<CantidadGruposEstudianteController>
        [HttpGet("{numPeriodo}/{anno}")]
        public ActionResult Getres(int numPeriodo, int anno)
        {
            return Ok(_context.CantidadGruposEstudiante.FromSqlRaw("select grado, nombreCompleto, numPeriodo, anno, CantidadGrupos  from Cantidad_Grupos_Estudiante(" + numPeriodo + "," + anno + ")"));
        }

        // GET api/<CantidadGruposEstudianteController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CantidadGruposEstudianteController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CantidadGruposEstudianteController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CantidadGruposEstudianteController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
