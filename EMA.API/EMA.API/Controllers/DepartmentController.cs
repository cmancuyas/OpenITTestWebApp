using AutoMapper;
using EMA.DataAccess.Repository.IRepository;
using EMA.Models.Entities;
using EMA.Models.Utility;
using EMA.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using EMA.Models.Dto.Department;

namespace EMA.API.Controllers
{
    [Route("api/departments")]
    [ApiController]
    public class DepartmentController : Controller
    {
        private readonly IDepartmentRepository _dbDepartment;
        private readonly IMapper _mapper;
        protected APIResponse _response;

        public DepartmentController(IDepartmentRepository dbDepartment, IMapper mapper)
        {
            _dbDepartment = dbDepartment;
            _mapper = mapper;
            _response = new();
        }

        [HttpGet]
        //[ResponseCache(CacheProfileName = "Default30")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<APIResponse>> GetDepartments(
                                                        [FromQuery] string? search,
                                                         int pageSize = 0,
                                                         int pageNumber = 1
                                                                    )
        {
            try
            {
                IEnumerable<Department> DepartmentList;

                DepartmentList = await _dbDepartment.GetAllAsync(pageSize: pageSize, pageNumber: pageNumber);

                Pagination pagination = new()
                {
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                };

                Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(pagination));

                _response.Result = _mapper.Map<List<DepartmentDto>>(DepartmentList);
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;

        }
        [HttpGet("{id:int}", Name = "GetDepartment")]
        //[ResponseCache(Duration = 30, Location = ResponseCacheLocation.None, NoStore = true)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<APIResponse>> GetDepartment(int id)
        {
            try
            {
                if (id == 0)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest(_response);
                }
                var Department = await _dbDepartment.GetAsync(x => x.Id == id);
                if (Department == null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return NotFound(_response);
                }

                _response.Result = _mapper.Map<Department>(Department);
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPost]
        //[Authorize(Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> CreateDepartment([FromBody] DepartmentCreateDto createDto)
        {
            try
            {
                if (await _dbDepartment.GetAsync(x => x.Name.ToLower() == createDto.Name.ToLower()) != null
                    )
                {
                    ModelState.AddModelError("CustomError", "Department already exists");
                    return BadRequest(ModelState);
                }

                if (createDto == null)
                {
                    return BadRequest(createDto);
                }

                Department Department = _mapper.Map<Department>(createDto);

                await _dbDepartment.CreateAsync(Department);
                await _dbDepartment.SaveAsync();

                _response.Result = _mapper.Map<DepartmentDto>(Department);
                _response.StatusCode = HttpStatusCode.Created;
                //return CreatedAtRoute("GetDepartment", new { id = Department.Id }, _response);
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpDelete("{id:int}", Name = "DeleteDepartment")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize(Roles = "admin")]
        public async Task<ActionResult<APIResponse>> DeleteDepartment(int id)
        {
            try
            {
                if (id == 0)
                {
                    return BadRequest();
                }
                var Department = await _dbDepartment.GetAsync(x => x.Id == id);
                if (Department == null)
                {
                    return NotFound();
                }

                await _dbDepartment.RemoveAsync(Department);
                _response.StatusCode = HttpStatusCode.NoContent;
                _response.IsSuccess = true;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        //[Authorize(Roles = "admin")]
        [HttpPut("{id:int}", Name = "UpdateDepartment")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<APIResponse>> UpdateDepartment(int id, [FromBody] DepartmentUpdateDto updateDto)
        {
            try
            {
                if (updateDto == null || id != updateDto.Id)
                {
                    return BadRequest();
                }
                Department department = _mapper.Map<Department>(updateDto);

                await _dbDepartment.UpdateAsync(department);
                _response.StatusCode = HttpStatusCode.NoContent;
                _response.IsSuccess = true;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
}
