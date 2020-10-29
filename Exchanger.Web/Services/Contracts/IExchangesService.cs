using Exchanger.Web.Data;
using Exchanger.Web.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exchanger.Web.Services.Contracts
{
    public interface IExchangesService
    {
        Task<ExchangeResponse> ExchangeMoney(ExchangeRequest exchange);
        Task<IEnumerable<Exchange>> GetExchanges(GetHistory query);
    }
}
