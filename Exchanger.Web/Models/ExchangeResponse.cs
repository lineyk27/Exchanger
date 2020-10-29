namespace Exchanger.Web.Models
{
    public class ExchangeResponse
    {
        public string FromCurrency { get; set; }
        public decimal FromAmount { get; set; }
        public string ToCurrency { get; set; }
        public decimal ToAmount { get; set; }
        public decimal ToCurrencyRate { get; set; }
    }
}
