﻿using System;
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
    }
}
