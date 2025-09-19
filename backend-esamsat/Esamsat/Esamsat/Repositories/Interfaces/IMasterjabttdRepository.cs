using Esamsat.Dto;
using Esamsat.Models;

namespace Esamsat.Repositories.Interfaces
{
    public interface IMasterjabttdRepository
    {
        Task<IEnumerable<MasterjabttdDto>> GetAllAsync();
        Task<MasterjabttdDto?> GetByIdAsync(long id);
        Task<Masterjabttd> CreateAsync(CreateMasterjabttdDto dto);
        Task<Masterjabttd?> UpdateAsync(long id, UpdateMasterjabttdDto dto);
        Task<bool> DeleteAsync(long id);
    }
}
