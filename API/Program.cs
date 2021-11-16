using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
           var host= CreateHostBuilder(args).Build();

           //Creating Scopt 
           using var scope=host.Services.CreateScope();

           //Create Service Provider 
           var service=scope.ServiceProvider;
           try
           {
               //Geting DataContext Service
               var context=service.GetRequiredService<DataContext>();

               //Create Data if database not exist
               await context.Database.MigrateAsync();

               //Seeding Data 
               await Seed.SeedData(context);

           }catch(Exception ex)
           {
               //Geting Logger Service and Show Error 
               var logger=service.GetRequiredService<ILogger<Program>>();
               logger.LogError(ex,"An Error Occure While runing Migration");
           }

         //Run the Host 
          await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
