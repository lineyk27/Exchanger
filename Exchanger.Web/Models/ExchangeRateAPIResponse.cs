using System;
using System.Collections.Generic;

namespace Exchanger.Web.Models
{
    public class ExchangeRateAPIResponse
    {
        public Dictionary<string,float> Rates { get; set; }
        public string Base { get; set; }
        public DateTime Date { get; set; }
    }
}
