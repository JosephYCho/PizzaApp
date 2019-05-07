using oforce_interview.Domain.Model;
using oforce_interview.Domain.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace oforce_interview.Services.Interfaces
{
    public interface IToppingService
    {
        List<Toppings> Get();
        Toppings Get(int id);
        int Insert(ToppingInsertRequest req);
        void Update(ToppingUpdateRequest req);
        void Delete(int id);



    }
}
