using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace oforce_interview.Domain.Model
{
    public class Pizzas
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated {get;set;}
        public DateTime DateModified {get;set;}
    }
}
