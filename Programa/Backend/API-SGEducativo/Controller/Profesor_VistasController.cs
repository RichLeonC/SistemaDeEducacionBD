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
    public class Profesor_VistasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Profesor_VistasController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<Profesor_VistasController>
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_context.Profesor_Vistas.FromSqlRaw("select cedula,nombreCompleto,sexo,FechaNacimiento,provincia," +
                "canton,distrito,localidad,salario from Profesor_Vista"));
        }

        // GET api/<Profesor_VistasController>/5
        [HttpGet("{cedula}")]
        public ActionResult Get(int cedula)
        {
            return Ok(_context.Profesor_Vistas.FromSqlRaw("select cedula,nombreCompleto,sexo,FechaNacimiento,provincia," +
                "canton,distrito,localidad,salario from Profesor_Vista where cedula="+cedula));
        }

        // POST api/<Profesor_VistasController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Profesor_VistasController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Profesor_VistasController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
