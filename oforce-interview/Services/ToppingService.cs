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
    public class ToppingService:IToppingService
    {
        IConfiguration _connectionString;

        public ToppingService (IConfiguration configuration)
        {
            _connectionString = configuration;
        }

        public List<Toppings> Get()
        {
            using(var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Toppings_GetAll";
                cmd.CommandType = CommandType.StoredProcedure;

                using(var reader = cmd.ExecuteReader())
                {
                    List<Toppings> toppings = null;
                    while (reader.Read())
                    {
                        Toppings topping = new Toppings();
                        int index = 0;

                        topping.Id = reader.GetInt32(index++);
                        topping.Name = reader.GetString(index++);
                        topping.DateCreated = reader.GetDateTime(index++);
                        topping.DateModified = reader.GetDateTime(index++);

                        if(toppings == null)
                        {
                            toppings = new List<Toppings>();
                        }

                        toppings.Add(topping);

                    }
                    return toppings;
                }
            }
        }

        public Toppings Get(int id)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Toppings_GetById";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                using( var reader = cmd.ExecuteReader())
                {
                    Toppings topping = null;
                    while (reader.Read())
                    {
                        topping = new Toppings();
                        int index = 0;

                        topping.Id = reader.GetInt32(index++);
                        topping.Name = reader.GetString(index++);
                        topping.DateCreated = reader.GetDateTime(index++);
                        topping.DateModified = reader.GetDateTime(index++);
                    }
                    return topping;
                }

            }
        }

        public int Insert (ToppingInsertRequest req)
        {
            int id = 0;
            using(var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Toppings_Insert";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Name", req.Name);
                cmd.Parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                id = (int)cmd.Parameters["@Id"].Value;

                return id;
            }
        }

        public void Update(ToppingUpdateRequest req)
        {
            using (var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Toppings_Update";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", req.Id);
                cmd.Parameters.AddWithValue("@Name", req.Name);

                cmd.ExecuteNonQuery();

            }
        }

        public void Delete(int id)
        {
            using( var con = GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandText = "dbo.Toppings_Delete";
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
