using System;
using System.Collections.Generic;

namespace Exchanger.Web.Models
{
    public class ExchangeRate
    {
        public string ToCurrency { get; set; }
        public string ToRate { get; set; }
        public string Base { get; set; }
        public DateTime Date { get; set; }
    }
}
