const request = require("supertest");
const app = require("../app");

const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

const user1 = {
  username: "user1",
  email: "user1@gmail.com",
  password: "user1",
};

const user2 = {
  username: "user2",
  email: "userNotRegistered@gmail.com",
  password: "user2a",
};

const type = {
  name: "Pesawat"
}

const transportation = {
  name: "Garuda Indonesia",
  description: "Pesawat terbang",
  imgUrl: 'www.google.com',
  location: 'Jakarta',
  price: 1000000,
  typeId: 1
}

// let users = require('../data/user.json').map(user => {
//   user.createdAt = user.updatedAt = new Date()
//   return user
// })

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        username: user1.username,
        email: user1.email,
        password: hashPassword(user1.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
});

describe("users", () => {
  describe("Login(Admin)", () => {
    describe("Success", () => {
      test("Login should be return access_token", async () => {
        let { body, status } = await request(app).post("/login").send(user1);

        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
      });
    });

    describe("Empty email", () => {
      test("return 'email / password is required' when email is empty", async () => {
        let { body, status } = await request(app)
          .post("/login")
          .send({
            email: "",
            password: hashPassword(user1.password),
          });
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "email / password is required");
      });
    });

    describe("Empty password", () => {
      test("return 'email / password is required' when password is empty", async () => {
        let { body, status } = await request(app).post("/login").send({
          email: user1.email,
          password: "",
        });
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "email / password is required");
      });
    });

    describe("Invalid email", () => {
      test("return 'error invalid username / password' when email is not registered", async () => {
        let { body, status } = await request(app).post("/login").send(user2);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "error invalid username / password");
      });
    });

    describe("Invalid password", () => {
      test("return 'error invalid username / password' when password is not registered", async () => {
        let { body, status } = await request(app).post("/login").send(user2);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "error invalid username / password");
      });
    });
  });

  // describe("Create", () => {
  //   describe("return 'Transportation Angkot By Admin created'");
  //   describe("return 'You must login!'");
  //   describe("return 'Invalid token'");
  //   describe("return 'SequelizeValidationError'");
  // });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true, //menghapus semua baris dalam tabel dan mereset auto increment
    cascade: true, //menghapus data dalam tabel yang memiliki hubungan dengan foriegn key
    restartIdentity: true, //mereset semua nilai auto increment (id) menjadi 0
  });
});
