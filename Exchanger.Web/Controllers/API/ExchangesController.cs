using Exchanger.Web.Models;
using Exchanger.Web.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> ExchangeMoney([FromBody]ExchangeRequest model)
        {
            var resp = await _exchanges.ExchangeMoney(model);
            return Ok(resp);
        }
    }
}