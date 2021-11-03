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
    public class Evaluacion_EstudiantesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Evaluacion_EstudiantesController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<Evaluacion_EstudiantesController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Evaluacion_Estudiante.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<Evaluacion_EstudiantesController>/5
        [HttpGet("{cedulaEstudiante}/{codigoGrupo}/{nombreMateria}/{numPeriodo}/{anno}", Name ="GetEvaluacion_Estudiante")]
        public ActionResult Get(int cedulaEstudiante,string codigoGrupo, string nombreMateria, int numPeriodo, int anno)
        {
            try
            {
                var evaluacion = _context.Evaluacion_Estudiante.FirstOrDefault(e => e.cedulaEstudiante == cedulaEstudiante &&
                 e.numPeriodo == numPeriodo && e.anno == anno && e.codigoGrupo == codigoGrupo && e.nombreMateria == nombreMateria); //LINQ
                return Ok(evaluacion);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<Evaluacion_EstudiantesController>
        [HttpPost]
        public ActionResult Post([FromBody] Evaluacion_Estudiante evaluacion)
        {

            try
            {
                _context.Evaluacion_Estudiante.Add(evaluacion);
                _context.SaveChanges(); //Guarda los cambios
                return Ok(evaluacion);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<Evaluacion_EstudiantesController>/5
        [HttpPut("{cedulaEstudiante}/{codigoGrupo}/{nombreMateria}/{numPeriodo}/{anno}")]
        public ActionResult Put(int cedulaEstudiante, string codigoGrupo, string nombreMateria, int numPeriodo, int anno,[FromBody] Evaluacion_Estudiante evaluacion)
        {
            try
            {

                if (evaluacion.cedulaEstudiante == cedulaEstudiante && evaluacion.numPeriodo == numPeriodo && evaluacion.anno == anno
                && evaluacion.codigoGrupo == codigoGrupo && evaluacion.nombreMateria == nombreMateria)
                {

                    _context.Entry(evaluacion).State = EntityState.Modified; //Realiza los cambios
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

        // DELETE api/<Evaluacion_EstudiantesController>/5
        [HttpDelete("{cedulaEstudiante}/{codigoGrupo}/{nombreMateria}/{numPeriodo}/{anno}")]
        public ActionResult Delete(int cedulaEstudiante, string codigoGrupo, string nombreMateria, int numPeriodo, int anno)
        {
            try
            {
                var evaluacion = _context.Evaluacion_Estudiante.FirstOrDefault(e => e.cedulaEstudiante == cedulaEstudiante &&
                 e.numPeriodo == numPeriodo && e.anno == anno && e.codigoGrupo == codigoGrupo && e.nombreMateria == nombreMateria);
                if (evaluacion != null)
                {
                    _context.Evaluacion_Estudiante.Remove(evaluacion);
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
