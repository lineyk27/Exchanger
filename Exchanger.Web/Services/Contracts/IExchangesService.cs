using Exchanger.Web.Models;
using System.Threading.Tasks;

namespace Exchanger.Web.Services.Contracts
{
    public interface IExchangesService
    {
        Task<ExchangeResponse> ExchangeMoney(ExchangeRequest exchange);
    }
}
