using System;
namespace backend_api.Models.DTOs.Request;

public class  User
{
    public Guid ID { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }


}