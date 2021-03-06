using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_SGEducativo.Context;
using API_SGEducativo.Models;

namespace API_SGEducativo.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> Getusuarios()
        {
            return  _context.usuarios.FromSqlRaw("select * from Usuario").ToList();
        }


        // GET: api/Usuarios/5
        [HttpGet("{cedula}", Name ="GetUsuario")]
        public ActionResult GetUsuario(int cedula)
        {
            try
            {
                var usuario = _context.usuarios.FirstOrDefault(e => e.cedula == cedula); //Busca el usuario
                return Ok(usuario);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
        {
            if (id != usuario.cedula)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Usuarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
            _context.usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuario", new { id = usuario.cedula }, usuario);
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
           
            var usuario = await _context.usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{cedula}/{clave}")]
        public ActionResult<List<Usuario>> GetIniciarSesion(string cedula,string clave)
        {
            int c = 0;
            try
            {
                c = (int)Int64.Parse(cedula);
            }
            catch(Exception e)
            {
                return NotFound();
            }
            
            var usuario = _context.usuarios.Where(usuario=>usuario.cedula.Equals(c) && 
            usuario.clave.Equals(clave)).ToList(); //Utilizamos LINQ para buscar el usuario
            
            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        private bool UsuarioExists(int id)
        {
            return _context.usuarios.Any(e => e.cedula == id);
        }
    }
}
