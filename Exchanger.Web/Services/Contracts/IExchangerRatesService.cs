using Exchanger.Web.Models;
using System.Threading.Tasks;

namespace Exchanger.Web.Services.Contracts
{
    public interface IExchangerRatesService
    {
        Task<decimal> GetExchangeRateAsync(string fromCurrency, string toCurrency);
    }
}
