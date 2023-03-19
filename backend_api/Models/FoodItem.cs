using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
// Food Item
namespace backend_api.Models;
public class FoodItem
{
    [Key]
    public long FoodItemId { get; set; }

    [Column(TypeName = "nvarchar(100)")]
    public string? FoodItemName { get; set; }
    public string? FoodMainImgName { get; set; }
    [NotMapped]
    public string? FoodMainImgSrc { get; set; }
    public decimal Price { get; set; }
}