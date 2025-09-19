using Esamsat.Dto;
using Esamsat.Models;

namespace Esamsat.Repositories.Interfaces
{
    public interface IMasterflowRepository
    {
        Task<IEnumerable<MasterflowDto>> GetAllAsync();
        Task<MasterflowDto?> GetByIdAsync(string id);
        Task<Masterflow> CreateAsync(CreateMasterflowDto dto);
        Task<Masterflow?> UpdateAsync(string id, UpdateMasterflowDto dto);
        Task<bool> DeleteAsync(string id);
    }
}
