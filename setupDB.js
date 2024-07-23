`npx sequelize model:generate --name User --attributes username:string,email:string,password:string,role:string,phoneNumber:string,address:string

//UTAMA
npx sequelize model:generate --name Transportation --attributes name:string,description:string,imgUrl:string,location:string,price:integer,typeId:integer,authorId:integer

//SUPPORT
npx sequelize model:generate --name Type --attributes name:string`;

//support one to many utama
