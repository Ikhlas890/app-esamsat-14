using Esamsat.Db;
using Esamsat.Dto;
using Esamsat.Models;
using Esamsat.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Esamsat.Repositories.Implementations
{
    public class MasterliburRepository : IMasterliburRepository
    {
        private readonly DataContext _context;

        public MasterliburRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MasterliburDto>> GetAllAsync()
        {
            return await _context.Masterliburs
                .Select(m => new MasterliburDto
                {
                    Idlibur = m.Idlibur,
                    Idkabkota = m.Idkabkota,
                    Level = m.Level,
                    Tanggal = m.Tanggal,
                    Namalibur = m.Namalibur,
                    Ket = m.Ket,
                    Createby = m.Createby,
                    Createdate = m.Createdate,
                    Updateby = m.Updateby,
                    Updatedate = m.Updatedate
                })
                .ToListAsync();
        }

        public async Task<MasterliburDto?> GetByIdAsync(int id)
        {
            return await _context.Masterliburs
                .Where(m => m.Idlibur == id)
                .Select(m => new MasterliburDto
                {
                    Idlibur = m.Idlibur,
                    Idkabkota = m.Idkabkota,
                    Level = m.Level,
                    Tanggal = m.Tanggal,
                    Namalibur = m.Namalibur,
                    Ket = m.Ket,
                    Createby = m.Createby,
                    Createdate = m.Createdate,
                    Updateby = m.Updateby,
                    Updatedate = m.Updatedate
                })
                .FirstOrDefaultAsync();
        }

        public async Task<Masterlibur> CreateAsync(CreateMasterliburDto dto)
        {

            var entity = new Masterlibur
            {
                Idkabkota = dto.Idkabkota,
                Level = dto.Level,
                Tanggal = dto.Tanggal,
                Namalibur = dto.Namalibur,
                Ket = dto.Ket,
                Createby = dto.Createby,
                Createdate = DateTime.UtcNow
            };

            _context.Masterliburs.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Masterlibur?> UpdateAsync(int id, UpdateMasterliburDto dto)
        {
            var entity = await _context.Masterliburs.FindAsync(id);
            if (entity == null) return null;

            var libur = await _context.Masterliburs
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Idkabkota == dto.Idkabkota);

            entity.Idkabkota = dto.Idkabkota;
            entity.Level = dto.Level;
            entity.Tanggal = dto.Tanggal;
            entity.Namalibur = dto.Namalibur;
            entity.Ket = dto.Ket;
            entity.Updateby = dto.Updateby;
            entity.Updatedate = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Masterliburs.FindAsync(id);
            if (entity == null) return false;

            _context.Masterliburs.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
