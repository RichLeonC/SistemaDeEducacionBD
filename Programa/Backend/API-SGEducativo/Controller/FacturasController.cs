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
    public class FacturasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FacturasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<FacturasController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Factura.ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{numeroPeriodo}/{anno}")]
        public ActionResult GetIngresos(int numeroPeriodo,int anno)
        {
            try
            {
                return Ok(_context.Ingresos.FromSqlRaw("select grado,numeroPeriodo,anno,ingreso,matriculas from Ingresos("+numeroPeriodo+","+anno+")"));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        // POST api/<FacturasController>
        [HttpPost]
        public ActionResult Post([FromBody] Factura factura)
        {

            try
            {
                _context.Factura.Add(factura); //Agrega la matricula
                _context.SaveChanges(); //Guarda los cambios
                return Ok(factura);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<FacturasController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FacturasController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
