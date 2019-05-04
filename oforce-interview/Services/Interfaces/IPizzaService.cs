using oforce_interview.Domain.Model;
using oforce_interview.Domain.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace oforce_interview.Services.Interfaces
{
    interface IPizzaService
    {
        List<Pizzas> Get();
        Pizzas Get(int id);
        int Insert(PizzaInsertRequest req);
        void Update(PizzaUpdateRequest req);
        void Delete(int id);
    }
}
