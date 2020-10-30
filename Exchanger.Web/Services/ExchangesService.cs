using System;
using System.Linq;
using Exchanger.Web.Data;
using Exchanger.Web.Models;
using Exchanger.Web.Services.Contracts;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Exchanger.Web.Services
{
    public class ExchangesService : IExchangesService
    {
        private const int PageSize = 20;
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
                ToCurrencyRate = exchanged.ToCurrencyRate
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
            var resAmount = Math.Round(req.FromAmount * rate, 5);

            var resp = new ExchangeResponse()
            {
                FromAmount = req.FromAmount,
                FromCurrency = req.FromCurrency,
                ToCurrency = req.ToCurrency,
                ToCurrencyRate = Math.Round(rate, 5),
                ToAmount = resAmount
            };

            return resp;
        }

        public async Task<IEnumerable<Exchange>> GetExchanges(GetHistory query)
        {
            var all = _db.ExchangesHistory.AsQueryable();

            if (query.FromCurrencies != null)
                all = all.Where(x => ((IEnumerable<Currency>)query.FromCurrencies).Contains(x.FromCurrency));

            if (query.FromAmountLowerBound != null)
                all = all.Where(x => x.FromAmount >= query.FromAmountLowerBound);

            if (query.FromAmountUpperBound != null)
                all = all.Where(x => x.FromAmount <= query.FromAmountUpperBound);

            if (query.ToCurrencies != null)
                all = all.Where(x => ((IEnumerable<Currency>)query.ToCurrencies).Contains(x.ToCurrency));

            if (query.ToAmountLowerBound != null)
                all = all.Where(x => x.ToAmount >= query.ToAmountLowerBound);

            if (query.ToAmountUpperBound != null)
                all = all.Where(x => x.ToAmount <= query.ToAmountUpperBound);

            if (query.DateLowerBound != null)
                all = all.Where(x => x.Date >= query.DateLowerBound);

            if (query.DateUpperBound != null)
                all = all.Where(x => x.Date <= query.DateUpperBound);

            return await all
                .OrderByDescending(x => x.Date)
                .Skip((query.Page - 1) * PageSize)
                .Take(PageSize)
                .ToListAsync();
        }
    }
}
