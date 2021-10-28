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
    public class PadresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PadresController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<PadresController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PadresController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PadresController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PadresController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PadresController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
