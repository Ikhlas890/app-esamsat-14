using Esamsat.Db;
using Esamsat.Models;
using Esamsat.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Esamsat.Repositories.Implementations
{
    public class JnsdokRepository : IJnsdokRepository
    {
        private readonly DataContext _context;

        public JnsdokRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Jnsdok>> GetAllAsync()
        {
            return await _context.Jnsdoks.ToListAsync();
        }
    }
}
