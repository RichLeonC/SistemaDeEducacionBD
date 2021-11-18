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
    public class Padres_DeudasVistasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Padres_DeudasVistasController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<Padres_DeudasVistasController>
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_context.Padre_DeudasVistas.FromSqlRaw("select * from Padre_DeudasVista"));
        }

        // GET api/<Padres_DeudasVistasController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Padres_DeudasVistasController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Padres_DeudasVistasController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Padres_DeudasVistasController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
