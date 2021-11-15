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
    public class EvaluacionesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EvaluacionesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<EvaluacionesController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Evaluacion.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // GET: api/<EvaluacionesController>
        [HttpGet("{codigoNombre}/1")]
        public ActionResult<List<Evaluacion>> GetEvalucion(String codigoNombre)
        {
            try
            {

                var evalucion = _context.Evaluacion.Where(eva => eva.codigoGrupo.Equals(codigoNombre)).ToList();
                return evalucion;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }




        // GET api/<EvaluacionesController>/5
        [HttpGet("{rubro}/{codigoGrupo}/{nombreMateria}/{numPeriodo}/{anno}", Name = "GetGrupoEvaluacion")] //Devuelve solo un registro
        public ActionResult Get(string codigoGrupo, string nombreMateria, int numPeriodo, int anno, string rubro)
        {
            try
            {
                var evaluacion = _context.Evaluacion.FirstOrDefault(e => e.numPeriodo == numPeriodo && e.anno == anno
                && e.codigoGrupo == codigoGrupo && e.nombreMateria == nombreMateria && e.rubro == rubro);
                return Ok(evaluacion);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        // POST api/<EvaluacionesController>
        [HttpPost]
        public ActionResult Post([FromBody] Evaluacion evaluacion)
        {
            try
            {
                _context.Evaluacion.Add(evaluacion); //Agrega la matricula
                _context.SaveChanges(); //Guarda los cambios
                return Ok(evaluacion);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<EvaluacionesController>/5
        [HttpPut("{rubro}/{codigoGrupo}/{nombreMateria}/{numPeriodo}/{anno}")]
        public ActionResult Put( string codigoGrupo, string nombreMateria, int numPeriodo, int anno, string rubro, [FromBody] Evaluacion evaluacion)
        {
            try
            {

                if (evaluacion.numPeriodo == numPeriodo && evaluacion.anno == anno
                && evaluacion.codigoGrupo == codigoGrupo && evaluacion.nombreMateria == nombreMateria && evaluacion.rubro == rubro)
                {

                    _context.Entry(evaluacion).State = EntityState.Modified; //Realiza los cambios
                    _context.SaveChanges(); //Guarda los cambios
                    return Ok(codigoGrupo);
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

        // DELETE api/<EvaluacionesController>/5
        [HttpDelete("{rubro}/{codigoGrupo}/{nombreMateria}/{numeroPeriodo}/{anno}")]
        public ActionResult Delete(string codigoGrupo, string nombreMateria, int numPeriodo, int anno, string rubro)
        {

            try
            {
                var evaluacion = _context.Evaluacion.FirstOrDefault(e => e.numPeriodo == numPeriodo && e.anno == anno
              && e.codigoGrupo == codigoGrupo && e.nombreMateria == nombreMateria && e.rubro == rubro);
                if (evaluacion != null)
                {
                    _context.Evaluacion.Remove(evaluacion);
                    _context.SaveChanges();
                    return Ok(codigoGrupo);
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
