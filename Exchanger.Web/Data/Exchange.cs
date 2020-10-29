using Exchanger.Web.Models;
using System;

namespace Exchanger.Web.Data
{
    public class Exchange
    {
        public Guid Id { get; set; }
        public Currency FromCurrency{ get; set; }
        public decimal FromAmount { get; set; }
        public Currency ToCurrency { get; set; }
        public decimal ToAmount { get; set; }
        public DateTime Date { get; set; }
    }
}
