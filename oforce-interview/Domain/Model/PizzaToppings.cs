using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace oforce_interview.Domain.Model
{
    public class PizzaToppings
    {
        public int PizzaId { get; set; }
        public int ToppingId { get; set; }
        public string PizzaName { get; set; }
        public string ToppingName { get; set; }
    }
}
