// customer
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend_api.Models;
public class Customer
{
    [Key]
    public int CustomerID { get; set; }

    [Column(TypeName = "nvarchar(100)")]
    public string? CustomerName { get; set; }
    public string? CustomerAvator { get; set; }
    [NotMapped]
    public string? AvatorImgSrc { get; set; }
}