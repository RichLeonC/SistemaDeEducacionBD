using API_SGEducativo.Context;
using API_SGEducativo.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API_SGEducativo.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class Grupo_HorariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Grupo_HorariosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<Grupo_HorariosController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Grupo_Horario.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<Grupo_HorariosController>/5
        [HttpGet("{codigoGrupo}/{nombreMateria}/{numPeriodo}/{anno}", Name = "GetGrupoHorario")] //Devuelve solo un registro
        public ActionResult Get(string codigoGrupo, string nombreMateria, int numPeriodo, int anno )
        {
            try
            {
                var grupo = _context.Grupo_Horario.FirstOrDefault(e => e.numPeriodo == numPeriodo && e.anno == anno
                && e.codigoGrupo == codigoGrupo && e.nombreMateria == nombreMateria);
                return Ok(grupo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        // POST api/<Grupo_HorariosController>
        [HttpPost]
        public ActionResult Post([FromBody] Grupo_Horario horario)
        {
            try
            {
                _context.Grupo_Horario.Add(horario); //Agrega la matricula
                _context.SaveChanges(); //Guarda los cambios
                return Ok(horario);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<Grupo_HorariosController>/5
        [HttpPut("{codigoGrupo}/{nombreMateria}/{numPeriodo}/{anno}")]
        public ActionResult Put(string codigoGrupo, string nombreMateria, int numPeriodo, int anno,[FromBody] Grupo_Horario horario)
        {

            try
            {

                if (horario.numPeriodo == numPeriodo && horario.anno == anno
                && horario.codigoGrupo == codigoGrupo && horario.nombreMateria == nombreMateria)
                {

                    _context.Entry(horario).State = EntityState.Modified; //Realiza los cambios
                    _context.SaveChanges(); //Guarda los cambios
                    return Ok(horario);
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

        // DELETE api/<Grupo_HorariosController>/5
        [HttpDelete("{codigoGrupo}/ {nombreMateria}/{numeroPeriodo}/{anno}")]
        public ActionResult Delete(string codigoGrupo, string nombreMateria, int numPeriodo, int anno)
        {

            try
            {
                var horario = _context.Grupo_Horario.FirstOrDefault(e => e.numPeriodo == numPeriodo && e.anno == anno
              && e.codigoGrupo == codigoGrupo && e.nombreMateria == nombreMateria);
                if (horario != null)
                {
                    _context.Grupo_Horario.Remove(horario);
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
