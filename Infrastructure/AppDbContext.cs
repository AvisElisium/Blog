
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
    public DbSet<ArticleImage> ArticleImages { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Tag> Tags { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>().HasKey(x => x.Id);
        builder.Entity<User>()
            .HasMany(x => x.RefreshTokens)
            .WithOne(x => x.User)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Image>().UseTpcMappingStrategy();

        builder.Entity<User>()
            .HasOne(x => x.ProfilePicture)
            .WithOne(x => x.User)
            .HasForeignKey<ProfilePicture>(x => x.UserId);

        builder.Entity<Article>()
            .HasOne(x => x.ArticleImage)
            .WithOne(x => x.Article)
            .HasForeignKey<ArticleImage>(x => x.ArticleId);
    }
}