using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace oforce_interview.Domain.Model
{
    public class Toppings
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ToppingImage { get; set; }
        public bool isSauce { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
