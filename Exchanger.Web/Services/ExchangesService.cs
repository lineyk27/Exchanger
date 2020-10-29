using System;
using Exchanger.Web.Data;
using Exchanger.Web.Models;
using Exchanger.Web.Services.Contracts;
using System.Threading.Tasks;

namespace Exchanger.Web.Services
{
    public class ExchangesService : IExchangesService
    {
        private readonly ExchangerDbContext _db;
        private readonly IExchangerRatesService _ratesService;

        public ExchangesService(ExchangerDbContext db, IExchangerRatesService ratesService)
        {
            _db = db;
            _ratesService = ratesService;
        }
        public async Task<ExchangeResponse> ExchangeMoney(ExchangeRequest exchangeReq)
        {

            var rate = await _ratesService.
                GetExchangeRateAsync(exchangeReq.FromCurrency, exchangeReq.ToCurrency);

            var exchanged = CalculateExchangeAmount(exchangeReq, rate);

            var exchange = new Exchange()
            {
                Id = Guid.NewGuid(),
                FromCurrency = exchanged.FromCurrency,
                ToCurrency = exchanged.ToCurrency,
                FromAmount = exchanged.FromAmount,
                ToAmount = exchanged.ToAmount,
                Date = DateTime.Now
            };

            Save(exchange);

            var resp = new ExchangeResponse()
            {
                FromCurrency = exchanged.FromCurrency,
                ToCurrency = exchanged.ToCurrency,
                FromAmount = exchanged.FromAmount,
                ToAmount = exchanged.ToAmount,
                ToCurrencyRate = rate
            };


            return resp;
        }

        private void Save(Exchange exchange)
        {
            _db.Add(exchange);
            _db.SaveChanges();
        }

        private ExchangeResponse CalculateExchangeAmount(ExchangeRequest req, decimal rate)
        {
            var resAmount = req.FromAmount * rate;

            var resp = new ExchangeResponse()
            {
                FromAmount = req.FromAmount,
                FromCurrency = req.FromCurrency,
                ToCurrency = req.ToCurrency,
                ToCurrencyRate = rate,
                ToAmount = resAmount
            };

            return resp;
        }
    }
}
