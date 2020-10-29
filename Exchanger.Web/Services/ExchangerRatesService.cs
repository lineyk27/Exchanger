using System;
using Exchanger.Web.Services.Contracts;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Diagnostics;

namespace Exchanger.Web.Services
{
    public class ExchangerRatesService : IExchangerRatesService
    {
        private const string ExchangerAPIBasePath = "https://api.exchangeratesapi.io/latest";

        private readonly IHttpClientFactory _httpFactory;
        public ExchangerRatesService(IHttpClientFactory httpFactory) => _httpFactory = httpFactory;
        public async Task<decimal> GetExchangeRateAsync(string fromCurrency, string toCurrency)
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

                var rate = doc.RootElement.GetProperty("rates").GetProperty(toCurrency).GetDecimal();

                return rate;
            }
        }

        bool CheckCurrencyIsNormal(string currency)
        {
            return "USD,GBP,EUR,UAH".Contains(currency);
        }
    }
}
