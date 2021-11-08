using API_SGEducativo.Context;
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
    public class Factura_VistasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Factura_VistasController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/<Factura_VistasController>
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_context.Factura_Vistas.FromSqlRaw("select consecutivo,idMatricula,cedulaEstudiante,nombreCompleto,codigoGrupo,nombreMateria,numPeriodo," +
                "anno,iva,totalPago,totalPagadoIva,fechaPago from Factura_Vista"));
        }

        // GET api/<Factura_VistasController>/5
        [HttpGet("{cedulaEstudiante}")]
        public ActionResult Get(int cedulaEstudiante)
        {
            return Ok(_context.Factura_Vistas.FromSqlRaw("select consecutivo,idMatricula,cedulaEstudiante,nombreCompleto,codigoGrupo,nombreMateria,numPeriodo," +
                "anno,iva,totalPago,totalPagadoIva,fechaPago from Factura_Vista where cedulaEstudiante="+cedulaEstudiante));
        }

        // POST api/<Factura_VistasController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Factura_VistasController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Factura_VistasController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
