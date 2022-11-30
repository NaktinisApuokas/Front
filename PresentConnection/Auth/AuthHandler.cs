using System.Threading.Tasks;
using FobumCinema.Auth.Model;
using Microsoft.AspNetCore.Authorization;

namespace FobumCinema.Auth
{
    public class AuthHandler : AuthorizationHandler<SameUserRequirement, IUserOwnedresource>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, SameUserRequirement requirement, IUserOwnedresource resource)
        {
            if (context.User.IsInRole(UserRoles.Admin) || context.User.FindFirst(CustomClaims.UserId).Value == resource.UserId)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
    public record SameUserRequirement : IAuthorizationRequirement;
}
