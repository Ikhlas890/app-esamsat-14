using Esamsat.Dto;
using Esamsat.Models;

namespace Esamsat.Repositories.Interfaces
{
    public interface IMasterliburRepository
    {
        Task<IEnumerable<MasterliburDto>> GetAllAsync();
        Task<MasterliburDto?> GetByIdAsync(int id);
        Task<Masterlibur> CreateAsync(CreateMasterliburDto dto);
        Task<Masterlibur?> UpdateAsync(int id, UpdateMasterliburDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
