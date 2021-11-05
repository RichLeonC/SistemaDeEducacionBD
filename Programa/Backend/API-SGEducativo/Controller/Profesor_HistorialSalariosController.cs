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
    public class Profesor_HistorialSalariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Profesor_HistorialSalariosController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<Profesor_HistorialSalariosController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Profesor_HistorialSalario.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // GET: api/<Profesor_HistorialSalariosController>
        [HttpGet("{cedula}")]
        public ActionResult<List<Profesor_HistorialSalario>> GetHistorial(int cedula)
        {
            try
            {

                var profesor_HistorialSalario = _context.Profesor_HistorialSalario.Where(historial => historial.cedula.Equals(cedula)).ToList();
                return profesor_HistorialSalario;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // GET api/<Profesor_HistorialSalariosController>/5
        [HttpGet("{cedula}/{inicio}/{fin}", Name = "GetProfesorSalario")] //Devuelve solo un registro
        public ActionResult Get(int cedula, DateTime inicio, DateTime fin)
        {
            try
            {
                var profesor_HistorialSalario = _context.Profesor_HistorialSalario.FirstOrDefault(e => e.cedula == cedula && e.fin== fin && e.inicio==inicio);
                return Ok(profesor_HistorialSalario);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        // POST api/<Profesor_HistorialSalariosController>
        [HttpPost] //AGREGAR
        public ActionResult Post([FromBody] Profesor_HistorialSalario profesor_HistorialSalario)
        {
            try
            {
                _context.Profesor_HistorialSalario.Add(profesor_HistorialSalario); //Agrega la matricula
                _context.SaveChanges(); //Guarda los cambios
                return CreatedAtRoute("GetProfesorSalario", new { cedula = profesor_HistorialSalario.cedula }, profesor_HistorialSalario);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<Profesor_HistorialSalariosController>/5
        [HttpPut("{cedula}/{inicio}/{fin}")]
        public ActionResult Put(int cedula, DateTime inicio, DateTime fin, [FromBody] Profesor_HistorialSalario profesor_HistorialSalario)
        {

            try
            {

                if (profesor_HistorialSalario.cedula == cedula && profesor_HistorialSalario.inicio == inicio
                    && profesor_HistorialSalario.fin == inicio)
                {

                    _context.Entry(profesor_HistorialSalario).State = EntityState.Modified; //Realiza los cambios
                    _context.SaveChanges(); //Guarda los cambios
                    return CreatedAtRoute("GetProfesorSalario", new { cedula = profesor_HistorialSalario.inicio, inicio= profesor_HistorialSalario.inicio, fin =
                    profesor_HistorialSalario.fin}, profesor_HistorialSalario);
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

        // DELETE api/<Profesor_HistorialSalariosController>/5
        [HttpDelete("{cedula}/{inicio}/{fin}")]
        public ActionResult Delete(int cedula, DateTime inicio, DateTime fin)
        {

            try
            {
                var profesor_HistorialSalario = _context.Profesor_HistorialSalario.FirstOrDefault(e => e.cedula == cedula && e.fin == fin && e.inicio == inicio);
                if (profesor_HistorialSalario != null)
                {
                    _context.Profesor_HistorialSalario.Remove(profesor_HistorialSalario);
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
