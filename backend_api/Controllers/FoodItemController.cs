// 
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend_api.Models;
using System;

namespace backend_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FoodItemController : ControllerBase
{
    private readonly MsaDBContext _context;

    public FoodItemController(MsaDBContext context)
    {
        _context = context;
    }

    // GET: api/FoodItem
    [HttpGet]
    public async Task<ActionResult<IEnumerable<FoodItem>>> GetFoodItems()
    {
        return await _context.FoodItems
        .Select(f => new FoodItem()
        {
            FoodItemId = f.FoodItemId,
            FoodItemName = f.FoodItemName,
            FoodMainImgName = f.FoodMainImgName,
            Price = f.Price,
            FoodMainImgSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, f.FoodMainImgName)
        })
        .ToListAsync();
    }
    // GET: api/FoodItem/id
    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<FoodItem>>> GetFoodItem(long id)
    {
        var item = await _context.FoodItems.FindAsync(id);

        if (item == null)
        {
            return NotFound();
        }

        return Ok(item);
    }
    // 
    [HttpPost]
    public async Task<ActionResult<FoodItem>> CreateFoodItem(FoodItem fooditem)
    {
        _context.FoodItems.Add(fooditem);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetFoodItems", new { id = fooditem.FoodItemId }, fooditem);
    }
    // 
    [HttpPut("{id}")]
    public async Task<ActionResult<FoodItem>> PutFoodItem(long id, FoodItem fooditem)
    {

        // 
        fooditem.FoodItemId = id;
        _context.Entry(fooditem).State = EntityState.Modified;
        // _context.Entry(fooditem).Property(x => x.FoodItemId).IsModified = false;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!FoodItemExits(id))
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
    // DELETE: api/Order/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<FoodItem>> DeleteFoodItem(long id)
    {
        var fooditem = await _context.FoodItems.FindAsync(id);
        Console.WriteLine($"Delete Item: {fooditem.FoodItemId}");
        if (fooditem == null)
        {
            return NotFound();
        }

        _context.FoodItems.Remove(fooditem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool FoodItemExits(long id)
    {
        return _context.FoodItems.Any(e => e.FoodItemId == id);
    }

}
