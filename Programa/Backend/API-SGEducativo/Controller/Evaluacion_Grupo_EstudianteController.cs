using API_SGEducativo.Context;
using API_SGEducativo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API_SGEducativo.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class Evaluacion_Grupo_EstudianteController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Evaluacion_Grupo_EstudianteController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<Evaluacion_Grupo_EstudianteController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Evaluacion_Grupo_Estudiante.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{cedulaProfesor}/2")]
        public ActionResult GetPromedioNota(int cedulaProfesor)
        {
            return Ok(_context.Funcion_Promedio_Notas.FromSqlRaw("select codigoGrupo,numPeriodo,anno,PromedioNota from Promedio_Notas_P(" + cedulaProfesor + ")"));
        }

        // GET api/<Evaluacion_Grupo_EstudianteController>/5
        [HttpGet("{codigoGrupo}/{nombreMateria}/{numPeriodo}/{anno}/{cedulaEstudiante}", Name = "GetEvaluacion_Grupo_Estudiante")]
        public ActionResult Get( string codigoGrupo, string nombreMateria, int numPeriodo, int anno, int cedulaEstudiante)
        {
            try
            {
                var evaluacion = _context.Evaluacion_Grupo_Estudiante.FirstOrDefault(e =>
                 e.numPeriodo == numPeriodo && e.anno == anno && e.codigoGrupo == codigoGrupo && e.nombreMateria == nombreMateria&&
                 e.cedulaEstudiante == cedulaEstudiante ); //LINQ
                return Ok(evaluacion);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{cedulaEstudiante}/1")]
        public ActionResult<List<Evaluacion_Grupo_Estudiante>> GeEvaluacion(int cedulaEstudiante)
        {
            try
            {

                var evaluacion = _context.Evaluacion_Grupo_Estudiante.Where(evalu => evalu.cedulaEstudiante.Equals(cedulaEstudiante)).ToList();
                return evaluacion;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<Evaluacion_Grupo_EstudianteController>
        [HttpPost]
        public ActionResult Post([FromBody] Evaluacion_Grupo_Estudiante evaluacion)
        {

            try
            {
                _context.Evaluacion_Grupo_Estudiante.Add(evaluacion);
                _context.SaveChanges(); //Guarda los cambios
                return Ok(evaluacion);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<Evaluacion_Grupo_EstudianteController>/5
        [HttpPut("{cedulaEstudiante}/{codigoGrupo}/{nombreMateria}/{numPeriodo}/{anno}")]
        public ActionResult Put(int cedulaEstudiante, string codigoGrupo, string nombreMateria, int numPeriodo, int anno, [FromBody] Evaluacion_Grupo_Estudiante evaluacion)
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

        // DELETE api/<Evaluacion_Grupo_EstudianteController>/5
        [HttpDelete("{cedulaEstudiante}/{codigoGrupo}/{nombreMateria}/{numPeriodo}/{anno}")]
        public ActionResult Delete(int cedulaEstudiante, string codigoGrupo, string nombreMateria, int numPeriodo, int anno)
        {
            try
            {
                var evaluacion = _context.Evaluacion_Grupo_Estudiante.FirstOrDefault(e => e.cedulaEstudiante == cedulaEstudiante &&
                 e.numPeriodo == numPeriodo && e.anno == anno && e.codigoGrupo == codigoGrupo && e.nombreMateria == nombreMateria);
                if (evaluacion != null)
                {
                    _context.Evaluacion_Grupo_Estudiante.Remove(evaluacion);
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
