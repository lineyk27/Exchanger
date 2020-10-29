using Exchanger.Web.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Exchanger.Web.Services;
using Exchanger.Web.Services.Contracts;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

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
                })
                .AddJsonOptions(configuration =>
                {
                    configuration.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });

            services.AddTransient<IExchangerRatesService, ExchangerRateService>();
            services.AddTransient<IExchangesService, ExchangesService>();

            services.AddHttpClient();
            services.AddDbContext<ExchangerDbContext>(options =>
            {
                options.UseSqlServer(_configuration.GetConnectionString("MSSQLServer"));
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "../WebClient/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "../WebClient";
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
