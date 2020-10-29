namespace Exchanger.Web.Models
{
    public class ExchangeRequest
    {
        public string FromCurrency { get; set; }
        public decimal FromAmount { get; set; }
        public string ToCurrency { get; set; }
    }
}
