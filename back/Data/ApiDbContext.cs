using Microsoft.EntityFrameworkCore;
using Back.Models;

namespace Back.Data
{
    public class ApiDbContext : ApiDbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {
        }

        public DbSet<Driver> Drivers { get; set; }
    }
}
