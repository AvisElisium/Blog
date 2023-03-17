using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure;

public static class RoleSeed
{
    public static async void SeedRoles(RoleManager<IdentityRole> roleManager)
    {
        if (!await roleManager.RoleExistsAsync("Member"))
        {
            await roleManager.CreateAsync(new IdentityRole("Member"));
        }
        
        if (!await roleManager.RoleExistsAsync("Author"))
        {
            await roleManager.CreateAsync(new IdentityRole("Author"));
        }

        if (!await roleManager.RoleExistsAsync("Admin"))
        {
            await roleManager.CreateAsync(new IdentityRole("Admin"));
        }
    }
}