using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace oforce_interview.Responses.Interfaces
{
    public interface IItemResponse
    {
        bool IsSuccessful { get; set; }
        string TransactionId { get; set; }
        object Item { get; }



    }
}
