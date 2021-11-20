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
    public class CantidadGruposController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CantidadGruposController(AppDbContext context)
        {
            _context = context;
        }


        // GET: api/<CantidadGruposController>
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_context.CantidadGrupoPeriodo.FromSqlRaw("select * from Cantidad_Grupos_Periodo"));
        }

        // GET api/<CantidadGruposController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CantidadGruposController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CantidadGruposController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CantidadGruposController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
