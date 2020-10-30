using System;
using Exchanger.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace Exchanger.Web.Data
{
    public class ExchangerDbContext : DbContext
    {
        public ExchangerDbContext() : base()
        {
        }

        public ExchangerDbContext(DbContextOptions<ExchangerDbContext> options) : base(options)
        {
        }

        public DbSet<Exchange> ExchangesHistory { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Exchange>().HasKey(e => e.Id);
            builder.Entity<Exchange>().Property(e => e.ToAmount).HasColumnType("decimal(12,5)");
            builder.Entity<Exchange>().Property(e => e.FromAmount).HasColumnType("decimal(12,5)");
            builder.Entity<Exchange>().Property(e => e.FromCurrency).HasColumnType("varchar(3)");
            builder.Entity<Exchange>().Property(e => e.ToCurrency).HasColumnType("varchar(3)");
            builder.Entity<Exchange>().Property(e => e.ToCurrency).HasConversion(
                    v => v.ToString(),
                    v => (Currency)Enum.Parse(typeof(Currency), v));
            builder.Entity<Exchange>().Property(e => e.FromCurrency).HasConversion(
                    v => v.ToString(),
                    v => (Currency)Enum.Parse(typeof(Currency), v));
        }

    }
}
