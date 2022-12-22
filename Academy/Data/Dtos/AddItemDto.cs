using System.ComponentModel.DataAnnotations;

namespace Academy.Data.Dtos
{
    public record AddItemDto([Required] string Name, [Required] string Information);
}
