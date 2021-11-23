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
                "canton,distrito,localidad,grado,cedulaPadre from Estudiante_Vista"));
        }

        // GET api/<Usuarios_CompletosVController>/5
        [HttpGet("{cedula}")]
        public ActionResult Get(int cedula)
        {
             return Ok(_context.Estudiante_Vista.FromSqlRaw("select cedula,nombreCompleto,sexo,FechaNacimiento,provincia," +
                "canton,distrito,localidad,grado,cedulaPadre,nombrePadre from Estudiante_Vista where cedula=" + cedula));
        }

        [HttpGet("{cedulaPadre}/1")]
        public ActionResult GetHijos(int cedulaPadre)
        {
            return Ok(_context.Estudiante_Vista.FromSqlRaw("select cedula,nombreCompleto,sexo,FechaNacimiento,provincia," +
               "canton,distrito,localidad,grado,cedulaPadre,nombrePadre from Estudiante_Vista where cedulaPadre=" + cedulaPadre));
        }

        [HttpGet("{fecha1}/{fecha2}/{num}")]
        public ActionResult GetPorcentajeR(string fecha1, string fecha2,int num)
        {
            try
            {
                if(num==2)
                 return Ok(_context.PorcentajeReprobrados.FromSqlRaw("select codigoGrupo,numPeriodo,anno,porcentajeReprobado,ProfesorImparte,grado from PorcentajeReprobados('" + fecha1 + "','" + fecha2 + "') order by porcentajeReprobado desc"));
               else
                    return Ok(_context.PorcentajeReprobrados.FromSqlRaw("select codigoGrupo,numPeriodo,anno,porcentajeReprobado,ProfesorImparte,grado from PorcentajeReprobados('" + fecha1 + "','" + fecha2 + "') order by porcentajeReprobado asc"));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
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
