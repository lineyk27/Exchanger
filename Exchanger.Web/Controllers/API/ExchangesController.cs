using Exchanger.Web.Models;
using Exchanger.Web.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Exchanger.Web.Controllers.API
{
    [Route("/api/[controller]")]
    public class ExchangesController : Controller
    {
        private readonly IExchangesService _exchanges;
        public ExchangesController(IExchangesService exchanges)
        {
            _exchanges = exchanges;
        }

        [HttpGet("exchange")]
        public async Task<IActionResult> ExchangeMoney([FromQuery]ExchangeRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var resp = await _exchanges.ExchangeMoney(model);
            return Ok(resp);
        }

        [HttpGet("history")]
        public async Task<IActionResult> History([FromQuery]GetHistory model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var resp = await _exchanges.GetExchanges(model);
            return Ok(resp);
        }
    }
}