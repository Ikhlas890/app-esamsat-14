using Esamsat.Dto;
using Esamsat.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Esamsat.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MasterflowController : ControllerBase
    {
        private readonly IMasterflowRepository _repository;

        public MasterflowController(IMasterflowRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _repository.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var result = await _repository.GetByIdAsync(id);
            if (result == null)
                return NotFound(new { message = "Data tidak ditemukan" });
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMasterflowDto dto)
        {
            var created = await _repository.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Kdflow }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] UpdateMasterflowDto dto)
        {
            var updated = await _repository.UpdateAsync(id, dto);
            if (updated == null)
                return NotFound(new { message = "Data tidak ditemukan" });
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var deleted = await _repository.DeleteAsync(id);
            if (!deleted)
                return NotFound(new { message = "Data tidak ditemukan" });
            return NoContent();
        }
    }
}
