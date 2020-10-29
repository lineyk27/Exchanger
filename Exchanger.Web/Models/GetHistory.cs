using System;

namespace Exchanger.Web.Models
{
    public class GetHistory
    {
        public Currency? FromCurrency { get; set; }
        public decimal? FromAmount { get; set; }
        public Currency? ToCurrency { get; set; }
        public decimal? ToAmount { get; set; }
        public DateTime? Date { get; set; }
        public int Page { get; set; }
    }
}
