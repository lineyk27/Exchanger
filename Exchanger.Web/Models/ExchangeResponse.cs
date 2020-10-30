namespace Exchanger.Web.Models
{
    public class ExchangeResponse
    {
        public Currency FromCurrency { get; set; }
        public decimal FromAmount { get; set; }
        public Currency ToCurrency { get; set; }
        public decimal ToAmount { get; set; }
        public decimal ToCurrencyRate { get; set; }
    }
}
