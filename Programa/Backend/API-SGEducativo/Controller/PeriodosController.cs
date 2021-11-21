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
    public class PeriodosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PeriodosController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<PeriodosController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Periodo.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<PeriodosController>/5
        [HttpGet("{numPeriodo}/{anno}")]
        public ActionResult GetGeneros(int numPeriodo,int anno)
        {
            return Ok(_context.Generos.FromSqlRaw("select femenino,masculino,periodo from Generos("+numPeriodo+","+anno+")"));
        }

        // POST api/<PeriodosController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PeriodosController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PeriodosController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
