using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace oforce_interview.Domain.Request
{
    public class ToppingInsertRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]

        public string ToppingImage { get; set; }
        [Required]

        public bool isSauce { get; set; }
    }
}
