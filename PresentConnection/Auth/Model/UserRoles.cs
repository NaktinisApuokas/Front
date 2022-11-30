using System.Collections.Generic;

namespace FobumCinema.Auth.Model
{
    public class UserRoles
    {
        public const string Admin = nameof(Admin);
        public const string SimpleUser = nameof(SimpleUser);

        public static readonly IReadOnlyCollection<string> All = new[] { Admin, SimpleUser };
    }
}
