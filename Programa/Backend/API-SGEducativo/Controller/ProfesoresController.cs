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
    public class ProfesoresController : ControllerBase
    {

        private readonly AppDbContext _context;

        public ProfesoresController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<ProfesoresController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Profesor.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // GET api/<ProfesoresController>/5
        [HttpGet("{cedula}", Name = "GetProfesor")] //Devuelve solo un registro
        public ActionResult Get(int cedula)
        {
            try
            {
                var profesor = _context.Profesor.FirstOrDefault(e => e.cedula == cedula);
                return Ok(profesor);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        // POST api/<ProfesoresController>
        [HttpPost] //AGREGAR
        public ActionResult Post([FromBody] Profesor profesor)
        {
            try
            {
                _context.Profesor.Add(profesor); //Agrega la matricula
                _context.SaveChanges(); //Guarda los cambios
                return CreatedAtRoute("GetProfesor", new { cedula = profesor.cedula }, profesor);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<ProfesoresController>/5
        [HttpPut("{cedula}")]
        public ActionResult Put(int cedula, [FromBody] Profesor profesor)
        {

            try
            {

                if (profesor.cedula == cedula)
                {

                    _context.Entry(profesor).State = EntityState.Modified; //Realiza los cambios
                    _context.SaveChanges(); //Guarda los cambios
                    return CreatedAtRoute("GetProfesor", new { cedula = profesor.cedula }, profesor);
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

        // DELETE api/<ProfesoresController>/5
        [HttpDelete("{cedula}")]
        public ActionResult Delete(int cedula)
        {

            try
            {
                var profesor = _context.Profesor.FirstOrDefault(e => e.cedula == cedula);
                if (profesor != null)
                {
                    _context.Profesor.Remove(profesor);
                    _context.SaveChanges();
                    return Ok(cedula);
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
