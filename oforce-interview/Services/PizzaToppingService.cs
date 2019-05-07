using Microsoft.Extensions.Configuration;
using oforce_interview.Domain.Model;
using oforce_interview.Domain.Request;
using oforce_interview.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace oforce_interview.Services
{
    public class PizzaToppingService :IPizzaToppingService
    {
        public IConfiguration _connectionString;

        public PizzaToppingService(IConfiguration configuration)
        {
            _connectionString = configuration;
        }

        public List<PizzaToppings> Get(int pizzaId)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.PizzaToppings_GetToppingsByPizzaId";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PizzaId", pizzaId);
                using (var reader = cmd.ExecuteReader())
                {
                    List<PizzaToppings> pizzaToppings = null;
                    while (reader.Read())
                    {
                        PizzaToppings pizzaTopping = new PizzaToppings();
                        int index = 0;

                        pizzaTopping.PizzaId = reader.GetInt32(index++);
                        pizzaTopping.ToppingId = reader.GetInt32(index++);
                        pizzaTopping.PizzaName = reader.GetString(index++);
                        pizzaTopping.ToppingName = reader.GetString(index++);

                        if (pizzaToppings == null)
                        {
                            pizzaToppings = new List<PizzaToppings>();
                        }

                        pizzaToppings.Add(pizzaTopping);

                    }
                    return pizzaToppings;
                }
            }
        }

        public void Insert(PizzaToppingInsertRequest req)
        {
            
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.PizzaToppings_Insert";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PizzaId", req.PizzaId);
                cmd.Parameters.AddWithValue("@ToppingId", req.ToppingId);

                cmd.ExecuteNonQuery();

                

                
            }    
        }

        public void Delete(int id)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.PizzaToppings_Delete";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                cmd.ExecuteNonQuery();

            }
        }


        private SqlConnection GetConnection()
        {
            var con = new SqlConnection(_connectionString.GetSection("ConnectionStrings").GetSection("default").Value);

            con.Open();
            return con;
        }
    }
}
