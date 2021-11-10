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
    public class GruposController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GruposController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<GruposController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Grupo.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // GET: api/<GruposController>
        [HttpGet("{cedula}")]
        public ActionResult<List<Grupo>> GetGrupo(int cedula)
        {
            try
            {
               
                var grupo = _context.Grupo.Where(grupo => grupo.cedulaProfesor.Equals(cedula)).ToList();
                return grupo;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<GruposController>/5
        [HttpGet("{codigoNombre}/{nombreMateria}/{numeroPeriodo}/{anno}", Name = "GetGrupo")] //Devuelve solo un registro
        public ActionResult Get(string codigoNombre, string nombreMateria, int numeroPeriodo, int anno)
        {
            try
            {
                var grupo = _context.Grupo.FirstOrDefault(e => e.numeroPeriodo == numeroPeriodo && e.anno == anno 
                && e.codigoNombre== codigoNombre && e.nombreMateria== nombreMateria);
                return Ok(grupo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        // POST api/<GruposController>
        [HttpPost] //AGREGAR
        public ActionResult Post([FromBody] Grupo grupo)
        {
            try
            {
                _context.Grupo.Add(grupo); //Agrega la matricula
                _context.SaveChanges(); //Guarda los cambios
                return CreatedAtRoute("GetGrupo", new { numeroPeriodo = grupo.numeroPeriodo , anno = grupo.anno ,
                    codigoNombre = grupo.codigoNombre,nombreMateria = grupo.nombreMateria}, grupo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<GruposController>/5
        [HttpPut("{codigoNombre}/{nombreMateria}/{numeroPeriodo}/{anno}")]
        public ActionResult Put(string codigoNombre, string nombreMateria, int numeroPeriodo, int anno, [FromBody] Grupo grupo)
        {

            try
            {

                if (grupo.numeroPeriodo == numeroPeriodo && grupo.anno == anno
                && grupo.codigoNombre == codigoNombre && grupo.nombreMateria == nombreMateria)
                {

                    _context.Entry(grupo).State = EntityState.Modified; //Realiza los cambios
                    _context.SaveChanges(); //Guarda los cambios
                    return Ok(grupo);
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

        // DELETE api/<GruposController>/5
        [HttpDelete("{codigoNombre}/ {nombreMateria}/{numeroPeriodo}/{anno}")]
        public ActionResult Delete(string codigoNombre, string nombreMateria, int numeroPeriodo, int anno)
        {

            try
            {
                var grupo = _context.Grupo.FirstOrDefault(e => e.numeroPeriodo == numeroPeriodo && e.anno == anno
              && e.codigoNombre == codigoNombre && e.nombreMateria == nombreMateria);
                if (grupo != null)
                {
                    _context.Grupo.Remove(grupo);
                    _context.SaveChanges();
                    return Ok(
                              codigoNombre
                             );
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
