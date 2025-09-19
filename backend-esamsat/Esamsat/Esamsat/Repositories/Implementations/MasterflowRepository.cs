using Esamsat.Db;
using Esamsat.Dto;
using Esamsat.Models;
using Esamsat.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Esamsat.Repositories.Implementations
{
    public class MasterflowRepository : IMasterflowRepository
    {
        private readonly DataContext _context;

        public MasterflowRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MasterflowDto>> GetAllAsync()
        {
            return await _context.Masterflows
                .Select(m => new MasterflowDto
                {
                    Kdflow = m.Kdflow,
                    Nmflow = m.Nmflow,
                    Pkb = m.Pkb,
                    Bbn1 = m.Bbn1,
                    Bbn2 = m.Bbn2,
                    Swd = m.Swd,
                    AtbKend = m.AtbKend,
                    FlowJr = m.FlowJr,
                    Stnkbaru = m.Stnkbaru,
                    Tnkb = m.Tnkb,
                    Sahstnk = m.Sahstnk,
                    Perpanjangstnk = m.Perpanjangstnk,
                    Potongan = m.Potongan,
                    Bataslayanan = m.Bataslayanan,
                    Satuan = m.Satuan,
                    Status = m.Status,
                    Createby = m.Createby,
                    Createdate = m.Createdate,
                    Updateby = m.Updateby,
                    Updatedate = m.Updatedate
                })
                .ToListAsync();
        }

        public async Task<MasterflowDto?> GetByIdAsync(string id)
        {
            return await _context.Masterflows
                .Where(m => m.Kdflow == id)
                .Select(m => new MasterflowDto
                {
                    Kdflow = m.Kdflow,
                    Nmflow = m.Nmflow,
                    Pkb = m.Pkb,
                    Bbn1 = m.Bbn1,
                    Bbn2 = m.Bbn2,
                    Swd = m.Swd,
                    AtbKend = m.AtbKend,
                    FlowJr = m.FlowJr,
                    Stnkbaru = m.Stnkbaru,
                    Tnkb = m.Tnkb,
                    Sahstnk = m.Sahstnk,
                    Perpanjangstnk = m.Perpanjangstnk,
                    Potongan = m.Potongan,
                    Bataslayanan = m.Bataslayanan,
                    Satuan = m.Satuan,
                    Status = m.Status,
                    Createby = m.Createby,
                    Createdate = m.Createdate,
                    Updateby = m.Updateby,
                    Updatedate = m.Updatedate
                })
                .FirstOrDefaultAsync();
        }

        public async Task<Masterflow> CreateAsync(CreateMasterflowDto dto)
        {

            var entity = new Masterflow
            {
                Kdflow = dto.Kdflow,
                Nmflow = dto.Nmflow,
                Pkb = dto.Pkb,
                Bbn1 = dto.Bbn1,
                Bbn2 = dto.Bbn2,
                Swd = dto.Swd,
                AtbKend = dto.AtbKend,
                FlowJr = dto.FlowJr,
                Stnkbaru = dto.Stnkbaru,
                Tnkb = dto.Tnkb,
                Sahstnk = dto.Sahstnk,
                Perpanjangstnk = dto.Perpanjangstnk,
                Potongan = dto.Potongan,
                Bataslayanan = dto.Bataslayanan,
                Satuan = dto.Satuan,
                Status = dto.Status,
                Createby = dto.Createby,
                Createdate = DateTime.UtcNow
            };

            _context.Masterflows.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Masterflow?> UpdateAsync(string id, UpdateMasterflowDto dto)
        {
            var entity = await _context.Masterflows.FindAsync(id);
            if (entity == null) return null;

            var libur = await _context.Masterflows
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Nmflow == dto.Nmflow);
            entity.Nmflow = dto.Nmflow;
            entity.Pkb = dto.Pkb;
            entity.Bbn1 = dto.Bbn1;
            entity.Bbn2 = dto.Bbn2;
            entity.Swd = dto.Swd;
            entity.AtbKend = dto.AtbKend;
            entity.FlowJr = dto.FlowJr;
            entity.Stnkbaru = dto.Stnkbaru;
            entity.Tnkb = dto.Tnkb;
            entity.Sahstnk = dto.Sahstnk;
            entity.Perpanjangstnk = dto.Perpanjangstnk;
            entity.Potongan = dto.Potongan;
            entity.Bataslayanan = dto.Bataslayanan;
            entity.Satuan = dto.Satuan;
            entity.Status = dto.Status;
            entity.Updateby = dto.Updateby;
            entity.Updatedate = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var entity = await _context.Masterflows.FindAsync(id);
            if (entity == null) return false;

            _context.Masterflows.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
