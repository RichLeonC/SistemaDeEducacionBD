using API_SGEducativo.Context;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API_SGEducativo.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CobrosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CobrosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<CobrosController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<CobrosController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CobrosController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CobrosController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CobrosController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
