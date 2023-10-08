using AutoMapper;
using EMA.DataAccess.Repository.IRepository;
using EMA.Models;
using EMA.Models.Dto.Customer;
using EMA.Models.Entities;
using EMA.Models.Utility;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace EMA.API.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeRepository _dbEmployee;
        private readonly IDepartmentRepository _dbDepartment;
        private readonly IMapper _mapper;
        protected APIResponse _response;

        public EmployeeController(IEmployeeRepository dbEmployee, IDepartmentRepository dbDepartment, IMapper mapper)
        {
            _dbEmployee = dbEmployee;
            _dbDepartment = dbDepartment;
            _mapper = mapper;
            _response = new();
        }

        [HttpGet]
        //[ResponseCache(CacheProfileName = "Default30")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<APIResponse>> GetEmployees(
                                                        [FromQuery] string? search,
                                                         int pageSize = 0,
                                                         int pageNumber = 1
                                                                    )
        {
            try
            {
                IEnumerable<Employee> employeeList;

                employeeList = await _dbEmployee.GetAllAsync(pageSize: pageSize, pageNumber: pageNumber, includeProperties:"Department");
                
                Pagination pagination = new()
                {
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                };

                Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(pagination));

                _response.Result = _mapper.Map<List<EmployeeDto>>(employeeList);
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
        [HttpGet("{id:int}", Name = "GetEmployee")]
        //[ResponseCache(Duration = 30, Location = ResponseCacheLocation.None, NoStore = true)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<APIResponse>> GetEmployee(int id)
        {
            try
            {
                if (id == 0)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest(_response);
                }
                var employee = await _dbEmployee.GetAsync(x => x.Id == id);
                if (employee == null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return NotFound(_response);
                }

                _response.Result = _mapper.Map<Employee>(employee);
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
        public async Task<ActionResult<APIResponse>> CreateEmployee([FromBody] EmployeeCreateDto createDto)
        {
            try
            {
                if (await _dbEmployee.GetAsync(x => x.FirstName.ToLower() == createDto.FirstName.ToLower()) != null
                       && _dbEmployee.GetAsync(x => x.LastName.ToLower() == createDto.LastName.ToLower()) != null
                    )
                {
                    ModelState.AddModelError("CustomError", "Employee already exists");
                    return BadRequest(ModelState);
                }

                if (await _dbEmployee.GetAsync(x => x.EmailAddress.ToLower() == createDto.EmailAddress.ToLower()) != null)
                {
                    ModelState.AddModelError("CustomError", "Email Address already exists");
                    return BadRequest(ModelState);
                }

                if(await _dbDepartment.GetAsync(x => x.Id == createDto.DeptId) == null)
                {
                    ModelState.AddModelError("CustomError", "Department does not exists");
                    return BadRequest(ModelState);
                }

                if (createDto == null)
                {
                    return BadRequest(createDto);
                }

                Employee employee = _mapper.Map<Employee>(createDto);

                // Get Department
                Department department = await _dbDepartment.GetAsync(x => x.Id == createDto.DeptId);
                employee.Department = department;

                await _dbEmployee.CreateAsync(employee);
                await _dbEmployee.SaveAsync();

                _response.Result = _mapper.Map<EmployeeDto>(employee);
                _response.StatusCode = HttpStatusCode.Created;
                //return CreatedAtRoute("GetEmployee", new { id = employee.Id }, _response);
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpDelete("{id:int}", Name = "DeleteEmployee")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize(Roles = "admin")]
        public async Task<ActionResult<APIResponse>> DeleteEmployee(int id)
        {
            try
            {
                if (id == 0)
                {
                    return BadRequest();
                }
                var employee = await _dbEmployee.GetAsync(x => x.Id == id);
                if (employee == null)
                {
                    return NotFound();
                }

                await _dbEmployee.RemoveAsync(employee);
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
        [HttpPut("{id:int}", Name = "UpdateEmployee")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<APIResponse>> UpdateEmployee(int id, [FromBody] EmployeeUpdateDto updateDto)
        {
            try
            {
                if (updateDto == null || id != updateDto.Id)
                {
                    return BadRequest();
                }
                Employee employee = _mapper.Map<Employee>(updateDto);

                await _dbEmployee.UpdateAsync(employee);
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
