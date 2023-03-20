using System.ComponentModel.DataAnnotations;

namespace backend_api.Models.DTOs.Request;

public class LoginRequest
{
    [Required]
    [EmailAddress]
    public string? Email { get; set; }
    [Required]
    public string? Password { get; set; }
}