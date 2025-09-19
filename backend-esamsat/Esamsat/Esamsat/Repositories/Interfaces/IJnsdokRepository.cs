using Esamsat.Models;

namespace Esamsat.Repositories.Interfaces
{
    public interface IJnsdokRepository
    {
        Task<IEnumerable<Jnsdok>> GetAllAsync();
    }
}
