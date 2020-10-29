using System;

namespace Exchanger.Web.Data
{
    public class Exchange
    {
        public Guid Id { get; set; }
        public string FromCurrency{ get; set; }
        public decimal FromAmount { get; set; }
        public string ToCurrency { get; set; }
        public decimal ToAmount { get; set; }
        public DateTime Date { get; set; }
    }
}
