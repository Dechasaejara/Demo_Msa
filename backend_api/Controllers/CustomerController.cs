using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend_api.Models;

namespace backend_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CustomerController : ControllerBase
{
    private readonly MsaDBContext _context;
    // Dependency Injection
    public CustomerController(MsaDBContext context)
    {
        _context = context;
    }

    // GET: api/Customer
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
    {
        return await _context.Customers.ToListAsync();
    }

    // GET: api/Customer/id
    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Customer>>> GetCustomer(int id)
    {
        var customer = await _context.Customers.FindAsync(id);
        if (customer == null)
        {
            return NotFound();
        }
        return Ok(customer);
    }
    // Post:api/customer
    [HttpPost]
    public async Task<ActionResult<Customer>> CreateCustomer(Customer customer)
    {
        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetCustomers", new { id = customer.CustomerID }, customer);
    }
    // Put: api/customer/id
    [HttpPut("{id}")]
    public async Task<ActionResult<Customer>> UpdateCustomer(int id, Customer customer)
    {
        customer.CustomerID = id;
        _context.Entry(customer).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CustomerExits(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return NoContent();
    }

    // Delete: api/customer/id
    [HttpDelete("{id}")]
    public async Task<ActionResult<Customer>> DeleteCustomer(int id)
    {
        var customer = await _context.Customers.FindAsync(id);
        if (customer == null)
        {
            return NotFound();
        }
        _context.Customers.Remove(customer);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // 
    private bool CustomerExits(int id)
    {
        return _context.Customers.Any(e => e.CustomerID == id);
    }

}
