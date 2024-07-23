const request = require("supertest");
const app = require("../app");

const { sequelize, User, Transportation } = require("../models");
// const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");

const transportationDummy = {
  name: "Garuda Indonesia",
  description: "Pesawat terbang terbaik indonesia",
  price: 1000000,
  typeId: 1,
};

const invalidTransportationDummy = {
  name: "",
  description: "Pesawat terbang terbaik indonesia",
  price: 1000000,
  typeId: 1,
};

const idTransport = 19;
const idTransport2 = 20;
const invalidIdTransport = 0;

let access_token;
let access_token_staff;
let invalid_access_token = "abcedgghjijklmnopqrstuvexyz";

beforeAll(async () => {
  let users = require("../data/users.json").map((user) => {
    user.password = hashPassword(user.password);
    user.createdAt = user.updatedAt = new Date();
    return user;
  });

  let types = require("../data/types.json").map((type) => {
    type.createdAt = type.updatedAt = new Date();
    return type;
  });

  let transportations = require("../data/transportations.json").map(
    (transportation) => {
      transportation.createdAt = transportation.updatedAt = new Date();
      return transportation;
    }
  );
  // console.log(transportations);
  await queryInterface.bulkInsert("Users", users);
  await queryInterface.bulkInsert("Types", types);
  await queryInterface.bulkInsert("Transportation", transportations);

  let user = await User.findOne({ where: { email: "admin@gmail.com" } });
  let staff = await User.findOne({ where: { email: "user1@example.com" } });
  access_token_staff = signToken({ id: staff.id });
  access_token = signToken({ id: user.id });
  // console.log(error);
});

describe("Transport", () => {
  describe("Add Transport", () => {
    test("return 'transportation data' when user already logged in", async () => {
      let { body, status } = await request(app)
        .post("/transportations")
        .set("Authorization", "Bearer " + access_token)
        .send(transportationDummy);

      expect(status).toBe(201);
      expect(body.transportation).toHaveProperty("id", expect.any(Number));
      expect(body.transportation).toHaveProperty(
        "name",
        body.transportation.name
      );
      expect(body.transportation).toHaveProperty(
        "description",
        body.transportation.description
      );
      expect(body.transportation).toHaveProperty(
        "imgUrl",
        body.transportation.imgUrl
      );
      expect(body.transportation).toHaveProperty(
        "location",
        body.transportation.location
      );
      expect(body.transportation).toHaveProperty(
        "price",
        body.transportation.price
      );
      expect(body.transportation).toHaveProperty(
        "typeId",
        body.transportation.typeId
      );
      expect(body.transportation).toHaveProperty(
        "authorId",
        body.transportation.authorId
      );
    });
    test("return 'Invalid login' when user not logged in", async () => {
      let { body, status } = await request(app)
        .post("/transportations")
        .send(transportationDummy);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid login!");
    });
    test("return 'Invalid token' when user not logged in", async () => {
      let { body, status } = await request(app)
        .post("/transportations")
        .set("Authorization", "Bearer " + invalid_access_token)
        .send(transportationDummy);

      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid token");
    });
    test("return 'Name is required!' when user already logged in", async () => {
      let { body, status } = await request(app)
        .post("/transportations")
        .set("Authorization", "Bearer " + access_token)
        .send(invalidTransportationDummy);

      // console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", ["Name is required!"]);
    });
  });

  describe("Put Transport", () => {
    test("return 'updatedData' when user authorized", async () => {
      let { body, status } = await request(app)
        .put(`/transportations/${idTransport}`)
        .set("Authorization", "Bearer " + access_token)
        .send(transportationDummy);
      expect(status).toBe(200);
    });
    test("return 'Invalid login!' when user not logged in", async () => {
      let { body, status } = await request(app)
        .put(`/transportations/${idTransport}`)
        .set("Authorization", "Bearer " + invalid_access_token)
        .send(transportationDummy);
      // console.log(access_token);
      expect(status).toBe(401);
    });
    test("return 'Forbidden access!' when user not logged in", async () => {
      let { body, status } = await request(app)
        .put(`/transportations/${idTransport}`)
        .set("Authorization", "Bearer " + invalid_access_token)
        .send(transportationDummy);
      // console.log(access_token);
      expect(status).toBe(401);
    });
    test("return 'Not Found!' when entity doesn't exist", async () => {
      let { body, status } = await request(app)
        .delete(`/transportations/${invalidIdTransport}`)
        .set("Authorization", "Bearer " + access_token)
        .send(transportationDummy);
      // console.log(access_token);
      expect(status).toBe(404);
    });
    test("return 'Forbidden access' when user doesn't have authorize", async () => {
      let { body, status } = await request(app)
        .put(`/transportations/${idTransport}`)
        .set("Authorization", "Bearer " + access_token_staff)
        .send(transportationDummy);
      // console.log(access_token);
      expect(status).toBe(403);
    });
    test("return 'updatedData' when user authorized", async () => {
      let { body, status } = await request(app)
        .put(`/transportations/${idTransport}`)
        .set("Authorization", "Bearer " + access_token)
        .send(invalidTransportationDummy);
      expect(status).toBe(400);
    });
  });

  describe("Delete Transport", () => {
    test("return '<transportation name> success to delete', when user already logged in", async () => {
      let { body, status } = await request(app)
        .delete(`/transportations/${idTransport}`)
        .set("Authorization", "Bearer " + access_token);
      expect(status).toBe(200);
    });

    test("return 'Invalid login!', when user not logged in", async () => {
      let { body, status } = await request(app).delete(
        `/transportations/${idTransport}`
      );
      expect(status).toBe(401);
    });

    test("return 'Invalid token', when user already logged in", async () => {
      let { body, status } = await request(app)
        .delete(`/transportations/${idTransport}`)
        .set("Authorization", "Bearer " + invalid_access_token);
      expect(status).toBe(401);
    });

    test("return 'Error not found', when user already logged in", async () => {
      let { body, status } = await request(app)
        .delete(`/transportations/${invalidIdTransport}`)
        .set("Authorization", "Bearer " + access_token);
      expect(status).toBe(404);
    });

    test("return 'Forbidden access', when user doesn't have authorize", async () => {
      let { body, status } = await request(app)
        .delete(`/transportations/${idTransport2}`)
        .set("Authorization", "Bearer " + access_token_staff);
      expect(status).toBe(403);
    });
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Transportation", null, {
    truncate: true, //menghapus semua baris dalam tabel dan mereset auto increment
    cascade: true, //menghapus data dalam tabel yang memiliki hubungan dengan foriegn key
    restartIdentity: true, //mereset semua nilai auto increment (id) menjadi 0
  });
  await queryInterface.bulkDelete("Types", null, {
    truncate: true, //menghapus semua baris dalam tabel dan mereset auto increment
    cascade: true, //menghapus data dalam tabel yang memiliki hubungan dengan foriegn key
    restartIdentity: true, //mereset semua nilai auto increment (id) menjadi 0
  });
  await queryInterface.bulkDelete("Users", null, {
    truncate: true, //menghapus semua baris dalam tabel dan mereset auto increment
    cascade: true, //menghapus data dalam tabel yang memiliki hubungan dengan foriegn key
    restartIdentity: true, //mereset semua nilai auto increment (id) menjadi 0
  });
});
