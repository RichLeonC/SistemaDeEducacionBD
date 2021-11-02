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
    public class EstudiantesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EstudiantesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<EstudiantesController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Estudiante.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<EstudiantesController>/5
        [HttpGet("{cedula}")]
        public ActionResult Get(int cedula)
        {
            try
            {
                var estudiante = _context.Estudiante.FirstOrDefault(e => e.cedula == cedula);
                return Ok(estudiante);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<EstudiantesController>
        [HttpPost]
        public ActionResult Post([FromBody] Estudiante estudiante)
        {

            try
            {
                _context.Estudiante.Add(estudiante); //Agrega la matricula
                _context.SaveChanges(); //Guarda los cambios
                return Ok(estudiante.cedula);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<EstudiantesController>/5
        [HttpPut("{cedula}")]
        public ActionResult Put(int cedula, [FromBody] Estudiante estudiante)
        {
            try
            {

                if (estudiante.cedula == cedula)
                {

                    _context.Entry(estudiante).State = EntityState.Modified; //Realiza los cambios
                    _context.SaveChanges(); //Guarda los cambios
                    return Ok(cedula);
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

        // DELETE api/<EstudiantesController>/5
        [HttpDelete("{cedula}")]
        public ActionResult Delete(int cedula)
        {

            try
            {
                var estudiante = _context.Estudiante.FirstOrDefault(e => e.cedula == cedula);
                if (estudiante != null)
                {
                    _context.Estudiante.Remove(estudiante);
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
