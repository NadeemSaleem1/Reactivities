using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;


namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        
        public static IServiceCollection AddApplicationService(this IServiceCollection services,
        IConfiguration config)
        {

                 //Adding Swaggergen
                  services.AddSwaggerGen(c =>
                  {
                        c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
                  });

                  //Adding Db Context 
                  services.AddDbContext<DataContext>(opt=>{
                    opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
                  });

                  //adding Cors Policy
                  services.AddCors(opt=>{
                        opt.AddPolicy("CorsPolicy",policy=>{
                              policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                        });
                  });

                  //Adding Mediator Pattren Service
                  services.AddMediatR(typeof(List.Handler).Assembly);

                  //Adding Auto Mapper 
                  services.AddAutoMapper(typeof(MappingProfile).Assembly);

                  return services;
        }
    }
}