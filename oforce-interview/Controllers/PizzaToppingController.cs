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
    [Route("api/pizzatoppings")]
    [ApiController]
    public class PizzaToppingController : ControllerBase
    {

        private IPizzaToppingService _pizzaToppingService;

        public PizzaToppingController(IPizzaToppingService pizzaToppingService)
        {
            _pizzaToppingService = pizzaToppingService;
        }


        [HttpGet]
        public ActionResult<ItemsResponse<PizzaToppings>> GetByPizzaId(int pizzaId)
        {
            ItemsResponse<PizzaToppings> response = null;
            ActionResult result = null;

            try
            {
                List<PizzaToppings> pizzaToppings = _pizzaToppingService.Get(pizzaId);
                if (pizzaToppings == null)
                {
                    result = NotFound();
                }
                else
                {
                    response = new ItemsResponse<PizzaToppings>();
                    response.Items = pizzaToppings;

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
        public ActionResult<SuccessResponse> Insert (PizzaToppingInsertRequest req)
        {
            SuccessResponse response = null;
            ActionResult result = null;


            try
            {
                _pizzaToppingService.Insert(req);
                response = new SuccessResponse();
                result = Ok(response);
            }
            catch (Exception ex)
            {
                result = StatusCode(500, new ErrorResponse(ex.Message));
            }
            return result;
        }

        [HttpDelete]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            SuccessResponse response = null;
            ActionResult result = null;


            try
            {
                _pizzaToppingService.Delete(id);
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
