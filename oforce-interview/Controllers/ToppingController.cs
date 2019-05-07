using Microsoft.AspNetCore.Mvc;
using oforce_interview.Domain.Model;
using oforce_interview.Domain.Request;
using oforce_interview.Responses;
using oforce_interview.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace oforce_interview.Controllers
{
    [Route("api/toppings")]
    [ApiController]
    public class ToppingController:ControllerBase
    {
        private IToppingService _toppingService;

        public ToppingController(IToppingService toppingService)
        {
            _toppingService = toppingService;
        }


        [HttpGet]
        public ActionResult<ItemsResponse<Toppings>> GetAll()
        {
            ItemsResponse<Toppings> response = null;
            ActionResult result = null;

            try
            {
                List<Toppings> toppings = _toppingService.Get();
                if(toppings == null)
                {
                    result = NotFound();
                }
                else
                {
                    response = new ItemsResponse<Toppings>();
                    response.Items = toppings;

                    result = Ok(response);
                }
            
            }
            catch (Exception ex)
            {
                result = StatusCode(500, new ErrorResponse(ex.Message));
            }
            return result;
        }


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Toppings>> GetById(int id)
        {
            ItemResponse<Toppings> response = null;
            ActionResult result = null;

            try
            {
                Toppings topping = _toppingService.Get(id);
                if (topping == null)
                {
                    result = NotFound();
                }
                else
                {
                    response = new ItemResponse<Toppings>();
                    response.Item = topping;
                    result = Ok(response);


                }
            }
            catch (Exception ex)
            {
                result = StatusCode(500, new ErrorResponse(ex.Message));
            }

            return result;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Insert(ToppingInsertRequest req)
        {
            ItemResponse<int> response = null;
            ActionResult result = null;

            try
            {
                int id = _toppingService.Insert(req);
                if (id > 0)
                {
                    response = new ItemResponse<int>();
                    response.Item = id;
                    result = Ok(response);
                }
                else
                {
                    result = NotFound();
                }
            }
            catch (Exception ex)
            {
                result = StatusCode(500, new ErrorResponse(ex.Message));
            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(ToppingUpdateRequest req)
        {
            SuccessResponse response = null;
            ActionResult result = null;

            try
            {
                _toppingService.Update(req);
                response = new SuccessResponse();
                result = Ok(response);

            }
            catch (Exception ex)
            {
                result = StatusCode(500, new ErrorResponse(ex.Message));
            }

            return result;
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            SuccessResponse response = null;
            ActionResult result = null;


            try
            {
                _toppingService.Delete(id);
                response = new SuccessResponse();
                result = Ok(response);

            }
            catch (Exception ex)
            {
                result = StatusCode(500, new ErrorResponse(ex.Message));
            }

            return result;
        }

    }
}
