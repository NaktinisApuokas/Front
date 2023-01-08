using System.Threading.Tasks;
using FobumCinema.Auth.Model;
using FobumCinema.Data.Dtos.Auth;
using Microsoft.AspNetCore.Identity;

namespace FobumCinema
{
    public class DatabaseSeeder
    {
        private readonly UserManager<FobumCinemaUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public DatabaseSeeder(UserManager<FobumCinemaUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedAsync()
        {
            foreach (var role in UserRoles.All)
            {
                var roleExist = await _roleManager.RoleExistsAsync(role);
                if (!roleExist)
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            var newAdminUser = new FobumCinemaUser
            {
                UserName = "admin",
                Email = "admin@admin.com"
            };

            var existingAdminUser = await _userManager.FindByNameAsync(newAdminUser.UserName);
            if (existingAdminUser == null)
            {
                var createAdminUserResult = await _userManager.CreateAsync(newAdminUser, "VeryStrong1!");
                if (createAdminUserResult.Succeeded)
                {
                    await _userManager.AddToRolesAsync(newAdminUser, UserRoles.All);
                }
            }
        }
    }
}
