using Esamsat.Db;
using Esamsat.Dto;
using Esamsat.Models;
using Esamsat.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Esamsat.Repositories.Implementations
{
    public class MasterjabttdRepository : IMasterjabttdRepository
    {
        private readonly DataContext _context;

        public MasterjabttdRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MasterjabttdDto>> GetAllAsync()
        {
            return await _context.Masterjabttds
                .Select(m => new MasterjabttdDto
                {
                    Idjabttd = m.Idjabttd,
                    Idpegawai = m.Idpegawai,
                    Kddok = m.Kddok,
                    Jabatan = m.Jabatan,
                    Ket = m.Ket,
                    Status = m.Status,
                    Createby = m.Createby,
                    Createdate = m.Createdate,
                    Updateby = m.Updateby,
                    Updatedate = m.Updatedate
                })
                .ToListAsync();
        }

        public async Task<MasterjabttdDto?> GetByIdAsync(long id)
        {
            return await _context.Masterjabttds
                .Where(m => m.Idjabttd == id)
                .Select(m => new MasterjabttdDto
                {
                    Idjabttd = m.Idjabttd,
                    Idpegawai = m.Idpegawai,
                    Kddok = m.Kddok,
                    Jabatan = m.Jabatan,
                    Ket = m.Ket,
                    Status = m.Status,
                    Createby = m.Createby,
                    Createdate = m.Createdate,
                    Updateby = m.Updateby,
                    Updatedate = m.Updatedate
                })
                .FirstOrDefaultAsync();
        }

        public async Task<Masterjabttd> CreateAsync(CreateMasterjabttdDto dto)
        {

            var entity = new Masterjabttd
            {
                Idpegawai = dto.Idpegawai,
                Kddok = dto.Kddok,
                Jabatan = dto.Jabatan,
                Ket = dto.Ket,
                Status = dto.Status,
                Createby = dto.Createby,
                Createdate = DateTime.UtcNow
            };

            _context.Masterjabttds.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Masterjabttd?> UpdateAsync(long id, UpdateMasterjabttdDto dto)
        {
            var entity = await _context.Masterjabttds.FindAsync(id);
            if (entity == null) return null;

            var libur = await _context.Masterjabttds
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Idpegawai == dto.Idpegawai);

            entity.Idpegawai = dto.Idpegawai;
            entity.Kddok = dto.Kddok;
            entity.Jabatan = dto.Jabatan;
            entity.Ket = dto.Ket;
            entity.Status = dto.Status;
            entity.Updateby = dto.Updateby;
            entity.Updatedate = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var entity = await _context.Masterjabttds.FindAsync(id);
            if (entity == null) return false;

            _context.Masterjabttds.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
