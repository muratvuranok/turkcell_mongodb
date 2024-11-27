using Microsoft.AspNetCore.Mvc;
using TurkcellApi.Models;
using TurkcellApi.Repositories;

namespace TurkcellApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;
    public CategoriesController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return Ok(categories);
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);

        if (category == null)
        {
            return NotFound();
        }

        return Ok(category);
    }


    [HttpPost]
    public async Task<IActionResult> Create(Category category)
    {
        await _categoryRepository.CreateAsync(category);

        // pk int -> 


        // return Ok(category);

        return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Category category)
    {
        var existingCategory = await _categoryRepository.GetByIdAsync(id);

        if (existingCategory == null)
        {
            return NotFound();
        }


        // model içerisinde id değeri göndermek zorunda değiliz. ek olarak url üzerinden gelen id değeri ile model içerisinden gelen id değerlerini karşılaştırıp hata kontrolü sağlayabiliriniz.


        //category.Id = existingCategory.Id;

        await _categoryRepository.UpdateAsync(id, category);

        return NoContent();
    }



    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existingCategory = await _categoryRepository.GetByIdAsync(id);
        if (existingCategory == null)
        {
            return NotFound();
        }

        await _categoryRepository.DeleteAsync(id);

        return NoContent();
    }
}
