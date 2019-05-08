using oforce_interview.Domain.Model;
using oforce_interview.Domain.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace oforce_interview.Services.Interfaces
{
    public interface IPizzaService
    {
        List<Pizzas> GetAllWithToppings();
        Pizzas Get(int id);
        List<Pizzas> GetPizzaAndToppingById();
        int Insert(PizzaInsertRequest req);
        void Update(PizzaUpdateRequest req);
        void Delete(int id);
    }
}
