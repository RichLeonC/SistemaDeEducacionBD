using API_SGEducativo.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
//Controlador que se encarga de mostrar la vista Estudiante_Vista
namespace API_SGEducativo.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class Estudiante_VistasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Estudiante_VistasController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<Usuarios_CompletosVController>
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_context.Estudiante_Vista.FromSqlRaw("select cedula,nombreCompleto,sexo,FechaNacimiento,provincia," +
                "canton,distrito,localidad,grado from Estudiante_Vista"));
        }

        // GET api/<Usuarios_CompletosVController>/5
        [HttpGet("{cedula}")]
        public ActionResult Get(int cedula)
        {
             return Ok(_context.Estudiante_Vista.FromSqlRaw("select cedula,nombreCompleto,sexo,FechaNacimiento,provincia," +
                "canton,distrito,localidad,grado from Estudiante_Vista where cedula=" + cedula));
        }

        // POST api/<Usuarios_CompletosVController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Usuarios_CompletosVController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Usuarios_CompletosVController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
