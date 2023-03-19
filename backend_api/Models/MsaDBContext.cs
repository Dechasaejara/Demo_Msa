// 
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend_api.Models;
public class MsaDBContext : IdentityDbContext
{
    public MsaDBContext(DbContextOptions<MsaDBContext> options) : base(options)
    {
        //  Parameter values pass when instance of Db context created through DI
    }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<FoodItem> FoodItems { get; set; }
    public DbSet<OrderMaster> OrderMasters { get; set; }
    public DbSet<OrderDetail> OrderDetails { get; set; }
}
