using API_SGEducativo.Context;
using API_SGEducativo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
//Controlador para la matriculas del estudiante CRUD
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



        [HttpGet("{numPeriodo}/{anno}/4")]
        public ActionResult GetEstudiantes(int numPeriodo, int anno)
        {
            return Ok(_context.CantidadEstuPeriodo.FromSqlRaw("select CantidadEstudiantes,codigoGrupo, anno, numPeriodo from Cantidad_Estudiantes_Pe(" + numPeriodo + "," + anno + ")"));
        }

        // GET api/<MatriculasController>/5
        [HttpGet("{idMatricula}",Name ="GetMatricula")] //Devuelve solo un registro
        public ActionResult Get(int idMatricula)
        {
            try
            {
                var matricula = _context.Matricula.FirstOrDefault(e => e.idMatricula==idMatricula); //LINQ
                return Ok(matricula);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
           
        }
        // GET api/<MatriculasController>/5
        [HttpGet("{cedula}/1")]
        public ActionResult<List<Matricula>> GetMatricula(int cedula)
        {
            try
            {

                var matricula = _context.Matricula.Where(matricula => matricula.cedulaEstudiante.Equals(cedula)).ToList();
                return matricula;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //GET api/<MatriculasController>/5
        [HttpGet("{codigoGrupo}/2")]
        public ActionResult<List<Matricula>> GetMatricula1(string codigoGrupo)
        {
            try
            {

                var matricula = _context.Matricula.Where(matricula => matricula.codigoGrupo.Equals(codigoGrupo)).ToList();
                return matricula;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{cedula}/3")] //Devuelve solo un registro
        public ActionResult GetUltimo()
        {
            try
            {
                var matricula = _context.Matricula.Max(e => e.idMatricula); //LINQ
                return Ok(matricula);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        // POST api/<MatriculasController>
        [HttpPost] //AGREGAR
        public ActionResult Post([FromBody] Matricula matricula)
        {
            
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
