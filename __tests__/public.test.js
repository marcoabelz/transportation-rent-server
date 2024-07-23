const request = require("supertest");
const app = require("../app");
const { hashPassword } = require("../helpers/bcrypt");

const { sequelize, Type, User } = require("../models");
const { queryInterface } = sequelize;

const adminDummy = {
  username: "admin",
  email: "admin@gmail.com",
  password: "admin",
  phoneNumber: "081294150023",
  address: "DKI Jakarta",
};

const id = 1;
const invalidId = 21

beforeAll(async () => {
  await User.create(adminDummy);
  let transportations = require("../data/transportations.json").map((el) => {
    el.createdAt = el.updatedAt = new Date();
    return el;
  });

  let types = require("../data/types.json").map((type) => {
    type.createdAt = type.updatedAt = new Date();
    return type;
  });

  //   console.log(transportations);
  //   let dataUser = await User.findAll()
  //   let dataType = await Type.findAll()
  //   console.log(dataUser);
  //   console.log(dataType);
  await queryInterface.bulkInsert("Types", types);
  await queryInterface.bulkInsert("Transportation", transportations);
});

describe("Get Transportations", () => {
  test("return transportations data", async () => {
    let { body, status } = await request(app).get("/pub/transportation");
    expect(status).toBe(200);
  });

  test("return transportations data sorted by price ASC", async () => {
    let { body, status } = await request(app).get("/pub/transportation?sort=price");
    expect(status).toBe(200);
  });

  test("return 5 transportations data", async () => {
    let { body, status } = await request(app).get("/pub/transportation?page[size]=5&page[number]=1");
    expect(status).toBe(200);
  });
});

describe("Get Transportations Detail", () => {
    test ("return data transportation according to params id", async () => {
        let {body, status} = await request(app).get(`/pub/transportation/${id}`)
        expect(status).toBe(200)
    })
    test ("return 'Error not found'", async () => {
        let {body, status} = await request(app).get(`/pub/transportation/${invalidId}`)
        expect(status).toBe(404)
    })
})

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
