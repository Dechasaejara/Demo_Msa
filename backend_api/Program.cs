using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Net.NetworkInformation;
using backend_api.Common.Config;
using backend_api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Identity;

// Add dependencies
var builder = WebApplication.CreateBuilder(args);
{
    // Add services to the container.
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();

    // Swagger Config
    builder.Services.AddSwaggerGen();

    // Jwt config
    builder.Services.Configure<JwtConfig>(builder.Configuration.GetSection("JwtConfig"));

    // Database Dependency Injection
    // builder.Services.AddDbContext<MsaDBContext>(options => options.UseInMemoryDatabase(databaseName: "MsaDB"));
    // TODO: Sqlite  Db ConnectionString
    builder.Services.AddDbContext<MsaDBContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("AppSqliteDBContext")));

    // Jwt should be after DB Di
    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(jwt =>
    {
        var key = Encoding.ASCII.GetBytes(builder.Configuration["JwtConfig:Secret"]);
        jwt.SaveToken = true;
        jwt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            RequireExpirationTime = false
        };
    });
    // 
    builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<MsaDBContext>();

}
// Add and Configure how dependencies behave. 
var app = builder.Build();
{
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    // Allow to Serve static files
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(Path.Combine(Environment.CurrentDirectory, "Images")),
        RequestPath = "/Images"
    });
    // Allow CORS to Accept Request from  localhost
    app.UseCors(options =>
               options.WithOrigins("http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader());

    app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();
    app.Run();
}
