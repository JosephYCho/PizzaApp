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
    [Route("api/pizzas")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private IPizzaService _pizzaService;

        public PizzaController(IPizzaService pizzaService)
        {
            _pizzaService = pizzaService;
        }

      

        [HttpGet]
        public ActionResult<ItemsResponse<Pizzas>> GetAll()
        {
            ItemsResponse<Pizzas> response = null;
            ActionResult result = null;

            try
            {
                List<Pizzas> pizzas = _pizzaService.GetAllWithToppings();
                if (pizzas == null)
                {
                    result = NotFound();
                }
                else
                {
                    response = new ItemsResponse<Pizzas>();
                    response.Items = pizzas;

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
        public ActionResult<ItemResponse<Pizzas>> GetById(int id)
        {
            ItemResponse<Pizzas> response = null;
            ActionResult result = null;

            try
            {
                Pizzas pizza = _pizzaService.Get(id);
                if(pizza == null)
                {
                    result = NotFound();
                }
                else
                {
                    response = new ItemResponse<Pizzas>();
                    response.Item = pizza;
                    result = Ok(response);


                }
             }
            catch(Exception ex)
            {
                result = StatusCode(500, new ErrorResponse(ex.Message));
            }

            return result;
        }

        
        [HttpGet("toppings")]
        public ActionResult<ItemsResponse<Pizzas>> GetPizzaAndToppingById()
        {
            ItemsResponse<Pizzas> response = null;
            ActionResult result = null;

            try
            {
                List<Pizzas> pizzas = _pizzaService.GetPizzaAndToppingById();
                if (pizzas == null)
                {
                    result = NotFound();
                }
                else
                {
                    response = new ItemsResponse<Pizzas>();
                    response.Items = pizzas;
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
        public ActionResult<ItemResponse<int>> Insert(PizzaInsertRequest req)
        {
            ItemResponse<int> response = null;
            ActionResult result = null;

            try
            {
                int id = _pizzaService.Insert(req);
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
        public ActionResult<SuccessResponse> Update(PizzaUpdateRequest req)
        {
            SuccessResponse response = null;
            ActionResult result = null;

            try
            {
                _pizzaService.Update(req);
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
                _pizzaService.Delete(id);
                response = new SuccessResponse();
                result= Ok(response);

            }
            catch(Exception ex)
            {
                result = StatusCode(500, new ErrorResponse(ex.Message));
            }

            return result;
        }


    } 
}
