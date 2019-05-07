using oforce_interview.Domain.Model;
using oforce_interview.Domain.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace oforce_interview.Services.Interfaces
{
    public interface IPizzaToppingService
    {
        List<PizzaToppings> Get(int pizzaId);
        void Insert(PizzaToppingInsertRequest req);
        void Delete(int id);


    }
}
