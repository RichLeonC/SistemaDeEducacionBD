using API_SGEducativo.Context;
using API_SGEducativo.Models;
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
    public class Asistencia_EstudiantesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Asistencia_EstudiantesController(AppDbContext context)
        {
            _context = context;

        }


        // GET: api/<Asistencia_EstudiantesController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Asistencia_Estudiante.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        // GET: api/<Asistencia_EstudiantesController>/5
        [HttpGet("{cedulaEstudiante}/{codigoGrupo}/{nombreMateria}/{numPeriodo}/{anno}/{fecha}", Name = "Asistencia_Estudiante")]
        public ActionResult GetAsistencia_Estudiante(int cedulaEstudiante, string codigoGrupo, string nombreMateria, int numPeriodo, int anno,DateTime fecha)
        {
            try
            {
                var asistencia_estudiante = _context.Asistencia_Estudiante.FirstOrDefault(e => e.cedulaEstudiante == cedulaEstudiante &&
                 e.numPeriodo == numPeriodo && e.anno == anno && e.codigoGrupo == codigoGrupo && e.nombreMateria == nombreMateria
                 &&e.fecha==fecha); //Busca el usuario
                return Ok(asistencia_estudiante);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet("{cedulaEstudiante}/1")]
        public ActionResult GetAsistencia(int cedulaEstudiante)
        {
            try
            {
                var asistencia_estudiante = _context.Asistencia_Estudiante.FirstOrDefault(e => e.cedulaEstudiante == cedulaEstudiante); //Busca el usuario
                return Ok(asistencia_estudiante);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        // POST api/<Asistencia_EstudiantesController>
        [HttpPost]
        public ActionResult Post([FromBody] Asistencia_Estudiante asistencia)
        {

            try
            {
                _context.Asistencia_Estudiante.Add(asistencia);
                _context.SaveChanges(); //Guarda los cambios
                return Ok(asistencia);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<Asistencia_EstudiantesController>/5
        [HttpPut("{cedulaEstudiante}/{codigoGrupo}/{nombreMateria}/{numPeriodo}/{anno}/{fecha}")]
        public ActionResult Put(int cedulaEstudiante, string codigoGrupo, string nombreMateria, int numPeriodo, int anno, DateTime fecha, [FromBody] Asistencia_Estudiante asistencia)
        {
            try
            {

                if (asistencia.cedulaEstudiante == cedulaEstudiante && asistencia.numPeriodo == numPeriodo && asistencia.anno == anno
                && asistencia.codigoGrupo == codigoGrupo && asistencia.nombreMateria == nombreMateria && asistencia.fecha == fecha)
                {

                    _context.Entry(asistencia).State = EntityState.Modified; //Realiza los cambios
                    _context.SaveChanges(); //Guarda los cambios
                    return Ok(cedulaEstudiante);
                }
                else
                {
                    return BadRequest("No entre");
                }
            }

            catch (Exception e)
            {
                return BadRequest("Catch");
            }
        }

        // DELETE api/<Asistencia_EstudiantesController>/5
        [HttpDelete("{cedulaEstudiante}/{codigoGrupo}/{nombreMateria}/{numPeriodo}/{anno}/{fecha}")]
        public ActionResult Delete(int cedulaEstudiante, string codigoGrupo, string nombreMateria, int numPeriodo, int anno,DateTime fecha)
        {
            try
            {
                var asistencia = _context.Asistencia_Estudiante.FirstOrDefault(e => e.cedulaEstudiante == cedulaEstudiante &&
                 e.numPeriodo == numPeriodo && e.anno == anno && e.codigoGrupo == codigoGrupo && e.nombreMateria == nombreMateria && e.fecha == fecha);
                if (asistencia != null)
                {
                    _context.Asistencia_Estudiante.Remove(asistencia);
                    _context.SaveChanges();
                    return Ok(cedulaEstudiante);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
