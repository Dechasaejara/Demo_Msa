using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend_api.Common.Config;
using backend_api.Models.DTOs.Request;
using backend_api.Models.DTOs.Response;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace backend_api.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthManagementController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly JwtConfig _jwtConfig;
    public AuthManagementController(UserManager<IdentityUser> userManager, IOptionsMonitor<JwtConfig> jwtConfig)
    {
        _userManager = userManager;
        _jwtConfig = jwtConfig.CurrentValue;
    }

    // Create user => api/authmanagment/register
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> UserRegister([FromBody] UserRegistrationRequest user)
    {
        if (ModelState.IsValid)
        {
            var existingUser = await _userManager.FindByEmailAsync(user.Email);
            if (existingUser != null)
            {
                return BadRequest(new UserRegistrationResponse()
                {
                    Errors = new List<string>() { "Email Already Exists" },
                    Success = false
                });
            }
            var newUser = new IdentityUser() { Email = user.Email, UserName = user.UserName };
            var isCreated = await _userManager.CreateAsync(newUser, user.Password);
            if (isCreated.Succeeded)
            {
                var jwtToken = GenerateJwtToken(newUser);
                return Ok(new UserRegistrationResponse()
                {
                    Success = true,
                    Token = jwtToken
                });
            }
            else
            {
                return BadRequest(new UserRegistrationResponse()
                {
                    Errors = isCreated.Errors.Select(x => x.Description).ToList(),
                    Success = false
                });
            }
        }
        return BadRequest(new UserRegistrationResponse()
        {
            Errors = new List<string>() { "Invalid payload, Unable to Create user" },
            Success = false
        });
    }

    // Login => api/authmanagment/login
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> login([FromBody] LoginRequest user)
    {
        if (ModelState.IsValid)
        {
            var existingUser = await _userManager.FindByEmailAsync(user.Email);
            if (existingUser == null)
            {
                return BadRequest(new UserRegistrationResponse()
                {
                    Errors = new List<string>() { "Invalid Email" },
                    Success = false
                });
            }
            var isValidPassword = await _userManager.CheckPasswordAsync(existingUser, user.Password);
            if (!isValidPassword)
            {
                return BadRequest(new UserRegistrationResponse()
                {
                    Errors = new List<string>() { "Invalid Password" },
                    Success = false
                });
            }
            var jwtToken = GenerateJwtToken(existingUser);
            return Ok(new UserRegistrationResponse()
            {
                Success = true,
                Token = jwtToken
            });
        }
        return BadRequest(new UserRegistrationResponse()
        {
            Errors = new List<string>() { "Invalid Credentials" },
            Success = false
        });
    }
    // Token Generator from user
    private string GenerateJwtToken(IdentityUser user)
    {
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id",user.Id),
                    new Claim(JwtRegisteredClaimNames.Email,user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub,user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    }),
            Expires = DateTime.UtcNow.AddHours(20),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        return jwtTokenHandler.WriteToken(token);
    }
}