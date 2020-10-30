using System;
using System.Collections.Generic;

namespace Exchanger.Web.Models
{
    public class GetHistory
    {
        public IEnumerable<Currency> FromCurrencies { get; set; }
        public decimal? FromAmountLowerBound { get; set; }
        public decimal? FromAmountUpperBound { get; set; }
        public IEnumerable<Currency> ToCurrencies{ get; set; }
        public decimal? ToAmountLowerBound { get; set; }
        public decimal? ToAmountUpperBound { get; set; }
        public DateTime? DateLowerBound { get; set; }
        public DateTime? DateUpperBound { get; set; }
        public int Page { get; set; }
    }
}
