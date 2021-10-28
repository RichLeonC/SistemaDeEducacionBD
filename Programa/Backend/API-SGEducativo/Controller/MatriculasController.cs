using API_SGEducativo.Context;
using API_SGEducativo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
//Controlador para la matriculas CRUD
namespace API_SGEducativo.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatriculasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MatriculasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<MatriculasController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Matricula.ToList());
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<MatriculasController>/5
        [HttpGet("{idMatricula}",Name ="GetMatricula")] //Devuelve solo un registro
        public ActionResult Get(int idMatricula)
        {
            try
            {
                var matricula = _context.Matricula.FirstOrDefault(e => e.idMatricula==idMatricula);
                return Ok(matricula);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
           
        }

        // POST api/<MatriculasController>
        [HttpPost] //AGREGAR
        public ActionResult Post([FromBody] Matricula matricula)
        {
            Console.WriteLine(matricula);
            Console.WriteLine("Holaaa");
            try
            {
                _context.Matricula.Add(matricula); //Agrega la matricula
                _context.SaveChanges(); //Guarda los cambios
                return CreatedAtRoute("GetMatricula", new { idMatricula = matricula.idMatricula }, matricula);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<MatriculasController>/5
        [HttpPut("{idMatricula}")]
        public ActionResult Put(int idMatricula, [FromBody]Matricula matricula)
        {
            
            try
            {
               
                if (matricula.idMatricula == idMatricula)
                {
                    
                    _context.Entry(matricula).State = EntityState.Modified; //Realiza los cambios
                    _context.SaveChanges(); //Guarda los cambios
                    return CreatedAtRoute("GetMatricula", new { idMatricula = matricula.idMatricula }, matricula);
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

        // DELETE api/<MatriculasController>/5
        [HttpDelete("{idMatricula}")]
        public ActionResult Delete(int idMatricula)
        {

            try
            {
                var matricula = _context.Matricula.FirstOrDefault(e => e.idMatricula == idMatricula);
                if (matricula != null)
                {
                    _context.Matricula.Remove(matricula);
                    _context.SaveChanges();
                    return Ok(idMatricula);
                }
                else
                {
                    return BadRequest();
                }
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
