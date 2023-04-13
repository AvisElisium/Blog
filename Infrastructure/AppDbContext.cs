
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class AppDbContext : IdentityDbContext<User>
{
    public DbSet<Article> Articles { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Image> Images { get; set; }
    public DbSet<ProfilePicture> ProfilePictures { get; set; }
    public DbSet<MediaImage> MediaImages { get; set; }
    public DbSet<Comment> Comments { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>()
            .HasMany(x => x.RefreshTokens)
            .WithOne(x => x.User)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Image>()
            .HasDiscriminator<string>("image_type")
            .HasValue<MediaImage>("media")
            .HasValue<ProfilePicture>("pfp");

    }
}