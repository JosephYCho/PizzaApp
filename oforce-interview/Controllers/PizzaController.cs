using Microsoft.AspNetCore.Mvc;
using oforce_interview.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace oforce_interview.Controllers
{
    [Route("api/pizzas")]
    [ApiController]
    public class PizzaController:ControllerBase
    {
        private IPizzaService _pizzaService;

        public PizzaController(IPizzaService pizzaService)
        {
            _pizzaService = pizzaService;
        }

    }
}
