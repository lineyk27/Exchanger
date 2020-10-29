namespace Exchanger.Web.Models
{
    public class ExchangeRequest
    {
        public Currency FromCurrency { get; set; }
        public decimal FromAmount { get; set; }
        public Currency ToCurrency { get; set; }
    }
}
