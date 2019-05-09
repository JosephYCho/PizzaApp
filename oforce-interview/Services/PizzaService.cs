using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using oforce_interview.Domain.Model;
using oforce_interview.Domain.Request;
using oforce_interview.Services.Interfaces;

namespace oforce_interview.Services
{
    public class PizzaService : IPizzaService
    {
        private IConfiguration _connectionString;
        private ICacheService _cacheService;
        private static Dictionary<int, List<string>> dict = new Dictionary<int, List<string>>();
        private static readonly MemoryCache cache = new MemoryCache(new MemoryCacheOptions());
        private static readonly string key = "Pizza_CacheData_";

        public PizzaService(IConfiguration configuration, ICacheService cacheService)
        {
            _connectionString = configuration;
            _cacheService = cacheService;
        }


        public Pizzas Get(int id)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Pizzas_GetById";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                using (var reader = cmd.ExecuteReader())
                {
                    Pizzas pizza = null;
                    while (reader.Read())
                    {
                        pizza = new Pizzas();
                        int index = 0;

                        pizza.Id = reader.GetInt32(index++);
                        pizza.Name = reader.GetString(index++);
                        pizza.DateCreated = reader.GetDateTime(index++);
                        pizza.DateModified = reader.GetDateTime(index++);

                        pizza.Toppings = GetToppingsById(pizza.Id);
                    }

                    return pizza;
                }
            }
        }



        public List<Pizzas> GetPizzaAndToppingById()
        {
            List<Pizzas> pizzas = null;
            Pizzas pizza = null;
            List<string> toppings = null;

            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Pizzas_GetAllWithToppings";
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    
                    while (reader.Read())
                    {
                        pizza = new Pizzas();
                        int index = 0;

                        pizza.Id = reader.GetInt32(index++);
                        pizza.Name = reader.GetString(index++);
                        pizza.DateCreated = reader.GetDateTime(index++);
                        pizza.DateModified = reader.GetDateTime(index++);

                        if(pizzas == null)
                        {
                            pizzas = new List<Pizzas>();
                        }
                        pizzas.Add(pizza);
                    }   

                    reader.NextResult();

                    while (reader.Read())
                        {
                            int index = 0;
                            int pizzaId = reader.GetInt32(index++);
                            string topping = reader.GetString(index++);
                            if (toppings == null)
                            {
                                dict[pizzaId] = new List<string>();
                            }

                            if(topping != null)
                            {
                                dict[pizzaId].Add(topping);
                            }       
                        }
                   if(dict != null)
                    {
                        foreach (Pizzas onePizza in pizzas)
                        {
                            if (dict.ContainsKey(onePizza.Id))
                            {
                                onePizza.Toppings = dict[onePizza.Id];
                            }
                        }
                    }
                   
                    return pizzas;
                }
            }
        }


        public List<Pizzas> GetAllWithToppings()
        {
            Pizzas pizza = null;
            List<string> toppings = null;
            List<Pizzas> pizzas = null;

            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Pizzas_GetAll";
                cmd.CommandType = CommandType.StoredProcedure;


                using (var reader = cmd.ExecuteReader())
                {

                    while (reader.Read())
                    {
                        pizza = new Pizzas();
                        int index = 0;

                        pizza.Id = reader.GetInt32(index++);
                        pizza.Name = reader.GetString(index++);
                        pizza.DateCreated = reader.GetDateTime(index++);
                        pizza.DateModified = reader.GetDateTime(index++);

                         if (!dict.ContainsKey(pizza.Id))
                         {
                             dict[pizza.Id] = new List<string>();
                            toppings = GetToppingsById(pizza.Id);

                            dict[pizza.Id] = toppings;
                         }
                            pizza.Toppings = dict[pizza.Id];

                        if (pizzas == null)
                        {
                            pizzas = new List<Pizzas>();
                        }

                        pizzas.Add(pizza);

                    }
                    return pizzas;
                }
            }
        }





        public int Insert(PizzaInsertRequest req)
        {
            int id = 0;
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Pizzas_Insert";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Name", req.Name);
                cmd.Parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                id = (int)cmd.Parameters["@Id"].Value;

                return id;
            }
        }


        public void Update(PizzaUpdateRequest req)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Pizzas_Update_V2";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", req.Id);
                cmd.Parameters.AddWithValue("@Name", req.Name);

                cmd.ExecuteNonQuery();

            }
            string cachedKey = key + req.Id.ToString();
            _cacheService.Remove(cachedKey);

        }


        public void Delete(int id)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Pizzas_Delete_V2";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                cmd.ExecuteNonQuery();

            }

            string cachedKey = key + id.ToString();
            _cacheService.Remove(cachedKey);
        }

        public List<string> GetToppingsById(int id)
        {
            List<string> toppings = null;
            string topping = null;
            string cachedKey = key + id.ToString();
            var cachedPizza = _cacheService.Get <List<string>>(cachedKey);

            if (cachedPizza == null)
            {

                using (var con = GetConnection())
                {
                    var cmd = con.CreateCommand();
                    cmd.CommandText = "dbo.Pizzas_GetAllToppingByPizzaId";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@PizzaId", id);

                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            int index = 0;

                            topping = reader.GetString(index++);
                            if (toppings == null)
                            {
                                toppings = new List<string>();
                            }
                            toppings.Add(topping);
                        }
                        DateTimeOffset expiration = DateTimeOffset.Now.AddDays(1);
                        _cacheService.Add(cachedKey, toppings, expiration);
                     
                    }
                }
            }
            else
            {
                toppings = cachedPizza;
            }

            return toppings;
        }
   


        private SqlConnection GetConnection()
        {
            var con = new SqlConnection(_connectionString.GetSection("ConnectionStrings").GetSection("default").Value);

            con.Open();
            return con;
        }
    }
}

