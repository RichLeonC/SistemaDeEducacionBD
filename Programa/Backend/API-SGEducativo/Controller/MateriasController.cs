using API_SGEducativo.Context;
using API_SGEducativo.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API_SGEducativo.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class MateriasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MateriasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<MateriasController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Materia.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<MateriasController>/5
        [HttpGet("{nombre}",Name="GetMateria")]
        public ActionResult Get(string nombre)
        {
            try
            {
                var materia = _context.Materia.FirstOrDefault(e => e.nombre == nombre);
                return Ok(materia);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<MateriasController>
        [HttpPost]
        public ActionResult Post([FromBody] Materia materia)
        {

            try
            {
                _context.Materia.Add(materia); //Agrega la matricula
                _context.SaveChanges(); //Guarda los cambios
                return Ok(materia.nombre);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<MateriasController>/5
        [HttpPut("{nombre}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<MateriasController>/5
        [HttpDelete("{nombre}/2")]
        public ActionResult Delete(string nombre)
        {
            try
            {
                var materia = _context.Materia.FirstOrDefault(e => e.nombre == nombre);
                if (materia != null)
                {
                    _context.Materia.Remove(materia);
                    _context.SaveChanges();
                    return Ok(nombre);
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
