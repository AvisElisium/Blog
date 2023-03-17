using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace UnitTests;

public class TestHelpers
{
    public static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
        var dbContext = new AppDbContext(options);

        return dbContext;
    }
}