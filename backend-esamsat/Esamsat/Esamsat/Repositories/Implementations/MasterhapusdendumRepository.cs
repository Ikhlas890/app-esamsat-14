using Esamsat.Db;
using Esamsat.Dto;
using Esamsat.Models;
using Esamsat.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Esamsat.Repositories.Implementations
{
    public class MasterhapusdendumRepository : IMasterhapusdendumRepository
    {
        private readonly DataContext _context;

        public MasterhapusdendumRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MasterhapusdendumDto>> GetAllAsync()
        {
            return await _context.Masterhapusdenda
                .Select(m => new MasterhapusdendumDto
                {
                    Idhapusdenda = m.Idhapusdenda,
                    Jenis = m.Jenis,
                    Uraian = m.Uraian,
                    Awal = m.Awal,
                    Akhir = m.Akhir,
                    Nilai = m.Nilai,
                    Satuan = m.Satuan,
                    Ket = m.Ket,
                    Status = m.Status,
                    Createby = m.Createby,
                    Createdate = m.Createdate,
                    Updateby = m.Updateby,
                    Updatedate = m.Updatedate
                })
                .ToListAsync();
        }

        public async Task<MasterhapusdendumDto?> GetByIdAsync(int id)
        {
            return await _context.Masterhapusdenda
                .Where(m => m.Idhapusdenda == id)
                .Select(m => new MasterhapusdendumDto
                {
                    Idhapusdenda = m.Idhapusdenda,
                    Jenis = m.Jenis,
                    Uraian = m.Uraian,
                    Awal = m.Awal,
                    Akhir = m.Akhir,
                    Nilai = m.Nilai,
                    Satuan = m.Satuan,
                    Ket = m.Ket,
                    Status = m.Status,
                    Createby = m.Createby,
                    Createdate = m.Createdate,
                    Updateby = m.Updateby,
                    Updatedate = m.Updatedate
                })
                .FirstOrDefaultAsync();
        }

        public async Task<Masterhapusdendum> CreateAsync(CreateMasterhapusdendumDto dto)
        {

            var entity = new Masterhapusdendum
            {
                Jenis = dto.Jenis,
                Uraian = dto.Uraian,
                Awal = dto.Awal,
                Akhir = dto.Akhir,
                Nilai = dto.Nilai,
                Satuan = dto.Satuan,
                Ket = dto.Ket,
                Status = dto.Status,
                Createby = dto.Createby,
                Createdate = DateTime.UtcNow
            };

            _context.Masterhapusdenda.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Masterhapusdendum?> UpdateAsync(int id, UpdateMasterhapusdendumDto dto)
        {
            var entity = await _context.Masterhapusdenda.FindAsync(id);
            if (entity == null) return null;

            var hapusdenda = await _context.Masterhapusdenda
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Jenis == dto.Jenis);

            entity.Jenis = dto.Jenis;
            entity.Uraian = dto.Uraian;
            entity.Awal = dto.Awal;
            entity.Akhir = dto.Akhir;
            entity.Nilai = dto.Nilai;
            entity.Satuan = dto.Satuan;
            entity.Ket = dto.Ket;
            entity.Status = dto.Status;
            entity.Updateby = dto.Updateby;
            entity.Updatedate = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Masterhapusdenda.FindAsync(id);
            if (entity == null) return false;

            _context.Masterhapusdenda.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
