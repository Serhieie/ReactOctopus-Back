# Auth protocol

## Register

### request

**POST**

```json
{
  "name": "Alex",
  "email": "mail@gmail.com",
  "password": "qwerty123"
}
```

### response

```json
{
  "token": "string",
  "user": {
    "name": "Anton",
    "email": "mail@gmail.com"
  }
}
```

### DB structure

```json
{
  "_id": {
    "$oid": "663895705184d496ef6ef4ab"
  },
  "name": "Anton",
  "password": "$2a$10$xjc321ehH4n33sqHT36IluKfdcpC417CWQk4nl822JKYZmG6ZPGSe",
  "email": "mail@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mzg5NTcwNTE4NGQ0OTZlZjZlZjRhYiIsImlhdCI6MTcxNDk4NDMzNSwiZXhwIjoxNzE1MDY3MTM1fQ.bgV2f9MTgbHwxYrCAYaBh7tX3vBHXMIjbFU1bDdVnac",
  "avatarURL": "//www.gravatar.com/avatar/26ad22e7a24a12bfda4591678d2d8d92",
  "createdAt": {
    "$date": "2024-05-06T08:31:44.495Z"
  },
  "updatedAt": {
    "$date": "2024-05-06T08:32:15.574Z"
  }
}
```

## LogIn

### request

**POST**

```json
{
  "email": "mail@gmail.com",
  "password": "qwerty123"
}
```

### response

```json
{
  "token": "eyJhbGciOiJIUzI1NiI6IkpXVCJ9.eyJpZCI6Ij3MDCIIjoxNzE0ODkxNzY5fQ.K6wb9XR2cAyr70QW1LrvfMqrckUU9e8Q",
  "user": {
    "email": "mail@gmail.com"
  }
}
```

## LogOut

### request

**POST**

"Authorization: Bearer <token>"

### response

Status: 204, "No content"

## Current

### request

**GET**

"Authorization: Bearer <token>"

### response

```json
{
  "email": "mail@gmail.com"
}
```

## upploadAvatar

### request

#### Content-type: multipart/form-data

**PATCH**

```json
{
  "avatar": "img"
}
```

### response

```json
{
  "avatarURL": "https://res.cloudinary.com/dusgli7bh/image/upload/v1715005724/avatars/dxkxfwla8snf9ydw8j2a.png"
}
```
