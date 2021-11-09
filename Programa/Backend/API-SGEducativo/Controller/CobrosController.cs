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
    public class CobrosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CobrosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<CobrosController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Cobros.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<CobrosController>/5
        [HttpGet("{consecutivo}", Name="GetCobro")]
        public ActionResult Get(int consecutivo)
        {
            try
            {
                var cobro = _context.Cobros.FirstOrDefault(e => e.consecutivo == consecutivo); //LINQ
                return Ok(cobro);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<CobrosController>
        [HttpPost]
        public ActionResult Post([FromBody] Cobros cobro)
        {

            try
            {
                _context.Cobros.Add(cobro); //Agrega la matricula
                _context.SaveChanges(); //Guarda los cambios
                return CreatedAtRoute("GetCobro", new { consecutivo = cobro.consecutivo }, cobro);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<CobrosController>/5
        [HttpPut("{consecutivo}")]
        public ActionResult Put(int consecutivo, [FromBody] Cobros cobro)
        {

            try
            {

                if (cobro.consecutivo == consecutivo)
                {

                    _context.Entry(cobro).State = EntityState.Modified; //Realiza los cambios
                    _context.SaveChanges(); //Guarda los cambios
                    return CreatedAtRoute("GetCobro", new { consecutivo= cobro.consecutivo }, cobro);
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

        // DELETE api/<CobrosController>/5
        [HttpDelete("{idMatricula}")]
        public ActionResult Delete(int idMatricula)
        {
            try
            {
                var cobro = _context.Cobros.FirstOrDefault(e => e.idMatricula == idMatricula);
                if (cobro != null)
                {
                    _context.Cobros.Remove(cobro);
                    _context.SaveChanges();
                    return Ok(idMatricula);
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
