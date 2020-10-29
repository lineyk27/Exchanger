using System;
using Exchanger.Web.Services.Contracts;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Diagnostics;
using Exchanger.Web.Models;

namespace Exchanger.Web.Services
{
    public class ExchangerRateService : IExchangerRatesService
    {
        private const string ExchangerAPIBasePath = "https://api.exchangeratesapi.io/latest";

        private readonly IHttpClientFactory _httpFactory;
        public ExchangerRateService(IHttpClientFactory httpFactory) => _httpFactory = httpFactory;
        public async Task<decimal> GetExchangeRateAsync(Currency fromCurrency, Currency toCurrency)
        {
            CheckCurrencyIsNormal(fromCurrency);
            CheckCurrencyIsNormal(toCurrency);

            using (var client = _httpFactory.CreateClient())
            {
                var url = $"{ExchangerAPIBasePath}?base={fromCurrency}&symbols={toCurrency}";

                Debug.WriteLine(url);

                var response = await client.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                    throw new Exception($"Something went wrong, status code: {response.StatusCode}");

                Debug.WriteLine(await response.Content.ReadAsStringAsync());

                var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());

                var rate = doc.RootElement.GetProperty("rates").GetProperty(toCurrency.ToString()).GetDecimal();

                return rate;
            }
        }

        bool CheckCurrencyIsNormal(Currency currency)
        {
            return "USD,GBP,EUR,CHF".Contains(currency.ToString());
        }
    }
}
