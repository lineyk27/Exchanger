namespace Exchanger.Web.Services.Contracts
{
    interface IExchangerRatesService
    {
        void GetExchangeRateForCurrency(string currency, float amount);
    }
}
