using Esamsat.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Esamsat.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JnsdokController : ControllerBase
    {
        private readonly IJnsdokRepository _repository;

        public JnsdokController(IJnsdokRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _repository.GetAllAsync();
            return Ok(result);
        }
    }
}
