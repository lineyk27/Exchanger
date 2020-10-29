using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Exchanger.Web.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Exchanger.Web.Models;
using Exchanger.Web.Services;
using Exchanger.Web.Services.Contracts;

namespace Exchanger.Web
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration) => _configuration = configuration;
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(options =>
            {
                options.EnableEndpointRouting = false;
            });

            services.AddTransient<IExchangerRatesService, ExchangerRatesService>();
            services.AddTransient<IExchangesService, ExchangesService>();

            services.AddHttpClient();
            services.AddDbContext<ExchangerDbContext>(options =>
            {
                options.UseSqlServer(_configuration.GetConnectionString("MSSQLServer"));
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
