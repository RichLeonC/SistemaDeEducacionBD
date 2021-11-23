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
    public class InfoAcademicaController : ControllerBase
    {

        private readonly AppDbContext _context;

        public InfoAcademicaController(AppDbContext context)
        {
            _context = context;
        }


        // GET: api/<InfoAcademicaController>
        [HttpGet("{cedula}/1")]
        public ActionResult GetAcademico(int cedula)
        {
            return Ok(_context.InfoAcademica.FromSqlRaw("select Ponderado, CantidadGrupos,CantidadAprobados, CantidadReprobados," +
                "PromedioAprobadas, PromedioReprobadas from infoAcademica(" + cedula +  ")"));
        }

        [HttpGet("{cedula}/2")]
        public ActionResult GetListado(int cedula)
        {
            return Ok(_context.ListadoGrupos.FromSqlRaw("select codigoGrupo, notaObtenida from listaintoGrupos(" + cedula + ")"));
        }




        // GET api/<InfoAcademicaController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<InfoAcademicaController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<InfoAcademicaController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<InfoAcademicaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
