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
