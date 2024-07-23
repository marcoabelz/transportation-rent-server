[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15155158&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# RESTful endpoints

- `POST /transportation`
- `GET /transportation`
- `GET /transportation/:id`
- `PUT /transportation/:id`
- `DELETE /transportation/:id`
- `PATCH /transportation/:id`
- `POST /type`
- `GET /type`
- `PUT /type/:id`
- `DELETE /type/:id`
- `POST /add-user`
- `POST /login`

## List endpoints

Available for public

- `GET /pub/transportation`
- `GET /pub/transportation/:id`

## POST /transportation

Create new transportation

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Request Body:</i>

```json
{
  "name": "Taxi Online",
  "description": "Taxi berbasis online",
  "imgUrl": "https://lelogama.go-jek.com/post_featured_image/KV-Gocar-Prioritas_1456x818.jpg",
  "location": "Jakarta",
  "price": 10000,
  "typeId": 1,
  "authorId": 1
}
```

<i>Response (201 - Success Created)</i>

```json
{
  "message": "Transportation Taxi Online created",
  "transportation": {
    "id": 7,
    "name": "Taxi Online",
    "description": "Taxi berbasis online",
    "imgUrl": "https://lelogama.go-jek.com/post_featured_image/KV-Gocar-Prioritas_1456x818.jpg",
    "location": "Jakarta",
    "price": 10000,
    "typeId": 1,
    "authorId": 1,
    "updatedAt": "2024-05-27T17:17:51.992Z",
    "createdAt": "2024-05-27T17:17:51.992Z"
  }
}
```

<i>Response (400 - Validation error)</i>

```json
{
  "message": ["Name is required!"]
}
```

or

```json
{
  "message": ["Description is required!"]
}
```

or

```json
{
  "message": ["Minimum price is 1"]
}
```

## GET /transportations

Get all transportations

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Response (200):</i>

```json
{
  "transportations": [
    {
      "id": 4,
      "name": "Taxi Update",
      "description": "Murah Meriah Update",
      "imgUrl": "google",
      "location": "City",
      "price": 1000,
      "typeId": 1,
      "authorId": 1,
      "createdAt": "2024-05-27T16:19:17.368Z",
      "updatedAt": "2024-05-27T16:45:41.778Z"
    },
    {
      "id": 7,
      "name": "Taxi Online",
      "description": "Taxi berbasis online",
      "imgUrl": "https://lelogama.go-jek.com/post_featured_image/KV-Gocar-Prioritas_1456x818.jpg",
      "location": "Jakarta",
      "price": 10000,
      "typeId": 1,
      "authorId": 1,
      "createdAt": "2024-05-27T17:17:51.992Z",
      "updatedAt": "2024-05-27T17:17:51.992Z"
    }
  ]
}
```

## GET /transportation/:id

Get transportation detail by id

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Request Params:</i>

```json
{
  "id": 4
}
```

<i>Response (200):</i>

```json
{
  "transportation": {
    "id": 4,
    "name": "Taxi Update",
    "description": "Murah Meriah Update",
    "imgUrl": "google",
    "location": "City",
    "price": 1000,
    "typeId": 1,
    "authorId": 1,
    "createdAt": "2024-05-27T16:19:17.368Z",
    "updatedAt": "2024-05-27T16:45:41.778Z"
  }
}
```

<i>Response (404 - Error not found):</i>

```json
{
  "message": "Error not found!"
}
```

## PUT /transportation/:id

Update transportation detail by id

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Request Params:</i>

```json
{
  "id": 4
}
```

<i>Request Body:</i>

```json
{
  "name": "Taxi Online Gen 2",
  "description": "Gen 2 is coming",
  "imgUrl": "https://a-cdn.sindonews.net/dyn/620/content/2018/08/14/34/1330454/penggandaan-akun-gocar-kembali-rugikan-konsumen-wy3-thumb.jpg",
  "location": "DKI Jakarta",
  "price": 12000,
  "typeId": 1,
  "authorId": 1
}
```

<i>Response (200):</i>

```json
{
  "updatedData": {
    "id": 4,
    "name": "Taxi Online Gen 2",
    "description": "Gen 2 is coming",
    "imgUrl": "https://a-cdn.sindonews.net/dyn/620/content/2018/08/14/34/1330454/penggandaan-akun-gocar-kembali-rugikan-konsumen-wy3-thumb.jpg",
    "location": "DKI Jakarta",
    "price": 12000,
    "typeId": 1,
    "authorId": 1,
    "createdAt": "2024-05-27T16:19:17.368Z",
    "updatedAt": "2024-05-27T17:29:50.652Z"
  }
}
```

<i>Response (404 - Error not found):</i>

```json
{
  "message": "Error not found!"
}
```

<i>Response (400 - Validation error):</i>

```json
{
  "message": ["Name is required!"]
}
```
or
```json
{
  "message": ["Description is required!"]
}
```
or
```json
{
  "message": ["Minimum price is 1"]
}
```

## DELETE /transportation/:id

Delete transportation by id

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Request Params:</i>

```json
{
  "id": 4
}
```

<i>Response (200):</i>

```json
{
  "message": "Taxi Online Gen 2 success to delete"
}
```

<i>Response (404 - Error not found)</i>

```json
{
  "message": "Error not found"
}
```

## POST /type

create new type

<i>Request header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Request body:</i>

```json
{
  "name": "Angkutan Umum berbasis Online"
}
```

<i>Response (201 - Success Created):</i>

```json
{
  "id": 3,
  "name": "Angkutan Umum berbasis Online",
  "updatedAt": "2024-05-28T05:37:07.624Z",
  "createdAt": "2024-05-28T05:37:07.624Z"
}
```

<i>Response (400 - Validation error):</i>

```json
{
  "message": ["Name is required"]
}
```

## GET /type

Get all types

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Response (200):</i>

```json
[
  {
    "id": 1,
    "name": "Update",
    "createdAt": "2024-05-27T16:18:36.485Z",
    "updatedAt": "2024-05-28T01:15:27.556Z"
  },
  {
    "id": 3,
    "name": "Angkutan Umum berbasis Online",
    "createdAt": "2024-05-28T05:37:07.624Z",
    "updatedAt": "2024-05-28T05:37:07.624Z"
  }
]
```

## PUT /type/:id

Update type detail by id

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Request Params:</i>

```json
{
  "id": 1
}
```

<i>Request Body:</i>

```json
{
  "name": "Type Update"
}
```

<i>Response (200):</i>

```json
{
  "updatedData": {
    "id": 1,
    "name": "Type Update",
    "createdAt": "2024-05-27T16:18:36.485Z",
    "updatedAt": "2024-05-28T05:57:21.854Z"
  }
}
```

<i>Response (404 - Error not found)</i>

```json
{
  "message": "Error not found"
}
```

<i>Response (400 - Validation error):</i>

```json
{
  "message": ["Name is required"]
}
```

## DELETE /type/:id

Delete type by id

<i>Request Header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Request Params:</i>

```json
{
  "id": 3
}
```

<i>Response (200):</i>

```json
{
  "message": "Angkutan Umum berbasis Online success to delete"
}
```

<i>Response (404 - Error not found)</i>

```json
{
  "message": "Error not found"
}
```

## GET /pub/transportations

Get all transportations

<i>Request Header:</i>

```json
{
    not needed
}
```

<i>Response (200):</i>

```json
{
  "transportations": [
    {
      "id": 4,
      "name": "Taxi Update",
      "description": "Murah Meriah Update",
      "imgUrl": "google",
      "location": "City",
      "price": 1000,
      "typeId": 1,
      "authorId": 1,
      "createdAt": "2024-05-27T16:19:17.368Z",
      "updatedAt": "2024-05-27T16:45:41.778Z"
    },
    {
      "id": 7,
      "name": "Taxi Online",
      "description": "Taxi berbasis online",
      "imgUrl": "https://lelogama.go-jek.com/post_featured_image/KV-Gocar-Prioritas_1456x818.jpg",
      "location": "Jakarta",
      "price": 10000,
      "typeId": 1,
      "authorId": 1,
      "createdAt": "2024-05-27T17:17:51.992Z",
      "updatedAt": "2024-05-27T17:17:51.992Z"
    }
  ]
}
```

## POST /login
Login user

<i>Request header:</i>
```json
{
    not needed
}
```

<i>Request body</i>
```json
{
    "email": "user1@gmail.com",
    "password": "user1"
}
```

<i>Response (200)</i>
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE3MTE0NTI3fQ.GxyLdQMYQznoE8-2UiMnM_E0ojS_UF_EpN9w1u-1baE"
}
```

<i>Response (400)</i>
```json
{
    "message": "email / password is required"
}
```

## POST /add-user
Add new user

<i>Request header:</i>

```json
{
  "Authorization": "Bearer [access_token]"
}
```

<i>Request body: </i>
```json
{
    "username": "user5",
    "email": "user5@gmail.com",
    "password": "user5",
    "phoneNumber": "12345",
    "address": "User Address"
}
```

<i>Response (201)</i>
```json
{
    "message": "Data has been created",
    "createdData": {
        "username": "user6",
        "email": "user6@gmail.com"
    }
}
```

<i>Response (400)</i>
```json
{
    "message": ["email must be unique"]
}
```
or
```json
{
    "message": ["email is required"]
}
```
or
```json
{
    "message": ["password length minimal is 5"]
}
```

<i>Response (401)</i>
```json
{
    "message": "email / password is required"
}
```

## GET /pub/type

Get all types

<i>Request header:</i>
```json
{
    not needed
}
```

<i>Response (200):</i>

```json
[
  {
    "id": 1,
    "name": "Update",
    "createdAt": "2024-05-27T16:18:36.485Z",
    "updatedAt": "2024-05-28T01:15:27.556Z"
  },
  {
    "id": 3,
    "name": "Angkutan Umum berbasis Online",
    "createdAt": "2024-05-28T05:37:07.624Z",
    "updatedAt": "2024-05-28T05:37:07.624Z"
  }
]
```

## Global.error

<i>Response (401):</i>

```json
{
  "message": "Invalid login!"
}
```

<i>Response (500):</i>

```json
{
  "message": "Internal server error"
}
```