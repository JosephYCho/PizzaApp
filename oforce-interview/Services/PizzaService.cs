using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using oforce_interview.Domain.Model;
using oforce_interview.Domain.Request;
using oforce_interview.Services.Interfaces;

namespace oforce_interview.Services
{
    public class PizzaService:IPizzaService
    {
        public IConfiguration _connectionString;

        public PizzaService(IConfiguration configuration)
        {
            _connectionString = configuration;
        }

        /*
        public List<Pizzas> Get()
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Pizzas_GetAll";
                cmd.CommandType = CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    List<Pizzas> pizzas = null;
                    while (reader.Read())
                    {
                        Pizzas pizza = new Pizzas();
                        int index = 0;

                        pizza.Id = reader.GetInt32(index++);
                        pizza.Name = reader.GetString(index++);
                        pizza.DateCreated = reader.GetDateTime(index++);
                        pizza.DateModified = reader.GetDateTime(index++);

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

            */

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
                    }

                    return pizza;
                }
            }
        }

        

        public Pizzas GetPizzaAndToppingById(int id)
        {
            Pizzas pizza = null;
            List<string> toppings = null;

            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Pizzas_GetByIdWithToppings";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                using (var reader = cmd.ExecuteReader())
                {
                    //Pizzas pizza = null;
                    while (reader.Read())
                    {
                        pizza = new Pizzas();
                        int index = 0;

                        pizza.Id = reader.GetInt32(index++);
                        pizza.Name = reader.GetString(index++);
                        pizza.DateCreated = reader.GetDateTime(index++);
                        pizza.DateModified = reader.GetDateTime(index++);
                    }

                    reader.NextResult();
                    while (reader.Read())
                    {
                        int index = 0;
                        string topping = reader.GetString(index++);
                        if(toppings == null)
                        {
                            toppings = new List<string>();
                        }
                        toppings.Add(topping);
                    }


                    if(pizza != null)
                    {
                        pizza.Toppings = toppings;
                    }
                    return pizza;
                }
            }
        }

        //private static Dictionary<int, List<string>> ToppingDict = new Dictionary<int, List<string>>();

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

                      //  if (!ToppingDict.ContainsKey(pizza.Id))
                       // {
                         //   ToppingDict[pizza.Id] = new List<string>();
                       //     //toppings = GetToppingsById(pizza.Id);
                       // }
                        toppings = GetToppingsById(pizza.Id);

                        //ToppingDict[pizza.Id] = toppings;
                        pizza.Toppings = toppings;

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




        /*
        public Pizzas GetAllWithToppings()
        {
            Pizzas pizza = null;
            List<string> toppings = null;

            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Pizzas_GetByIdWithToppings";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                using (var reader = cmd.ExecuteReader())
                {
                    //Pizzas pizza = null;
                    while (reader.Read())
                    {
                        pizza = new Pizzas();
                        int index = 0;

                        pizza.Id = reader.GetInt32(index++);
                        pizza.Name = reader.GetString(index++);
                        pizza.DateCreated = reader.GetDateTime(index++);
                        pizza.DateModified = reader.GetDateTime(index++);

                        reader.NextResult();
                        while (reader.Read())
                        {
                            int newIndex = 0;
                            string topping = reader.GetString(newIndex++);
                            if (toppings == null)
                            {
                                toppings = new List<string>();
                            }
                            toppings.Add(topping);
                        }


                        if (pizza != null)
                        {
                            pizza.Toppings = toppings;
                        }
                    }

                    
                    return pizza;
                }
            }
        }
        */

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
                cmd.CommandText = "dbo.Pizzas_Update";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", req.Id);
                cmd.Parameters.AddWithValue("@Name", req.Name);

                cmd.ExecuteNonQuery();

            }
        }


        public void Delete(int id)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Pizzas_Delete";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                cmd.ExecuteNonQuery();

            }
        }

        public List<string> GetToppingsById(int id)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Pizzas_GetAllToppingByPizzaId";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PizzaId", id);

                using (var reader = cmd.ExecuteReader())
                {
                    List<string> toppings = null;
                    string topping = null;
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

                    return toppings;
                }
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
