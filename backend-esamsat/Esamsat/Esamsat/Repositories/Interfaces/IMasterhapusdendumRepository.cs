using Esamsat.Dto;
using Esamsat.Models;

namespace Esamsat.Repositories.Interfaces
{
    public interface IMasterhapusdendumRepository
    {
        Task<IEnumerable<MasterhapusdendumDto>> GetAllAsync();
        Task<MasterhapusdendumDto?> GetByIdAsync(int id);
        Task<Masterhapusdendum> CreateAsync(CreateMasterhapusdendumDto dto);
        Task<Masterhapusdendum?> UpdateAsync(int id, UpdateMasterhapusdendumDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
