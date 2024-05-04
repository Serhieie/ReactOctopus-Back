#Auth protocol

##register

###request
**\*POST**

```json
{
  "email": "mail@gmail.com",
  "password": "exa54543534"
}
```

###response

```json
{
  "user": {
    "email": "mail@gmail.com"
  }
}
```

###DB structure

```json
{
  "_id": {
    "$oid": "6635f294baf30fecf080c2c6"
  },
  "password": "$2a$10$UGPGpzzo/sZH3uMlBehIvuTbPIo/l7ZV2NQM894I4TgZeWbeOzraa",
  "email": "mail@gmail.com",
  "token": null,
  "avatarURL": "//www.gravatar.com/avatar/26ad22e7a24a12bfda4591678d2d8d92",
  "verify": false,
  "verificationToken": "cc2a448e-01dc-4d1e-bb8e-ada36eca6496",
  "createdAt": {
    "$date": "2024-05-04T08:32:20.238Z"
  },
  "updatedAt": {
    "$date": "2024-05-04T08:32:20.238Z"
  }
}
```

##Verify
**\*GET**

###response

```json
{
  "message": "Verification successful"
}
```

##LogIn

###request
**\*POST**

```json
{
  "email": "mail@gmail.com",
  "password": "qwerty123"
}
```

###response

```json
{
  "token": "eyJhbGciOiJIUzI1NiI6IkpXVCJ9.eyJpZCI6Ij3MDCIIjoxNzE0ODkxNzY5fQ.K6wb9XR2cAyr70QW1LrvfMqrckUU9e8Q",
  "user": {
    "email": "mail@gmail.com"
  }
}
```

##LogOut

###request
**\*POST**

"Authorization: Bearer <token>"

###response

\*\*\*Status: 205, "No content"

##Current

###request
**\*GET**

"Authorization: Bearer <token>"

###response

```json
{
  "email": "mail@gmail.com"
}
```

##repeatVerify

###request
**\*POST**

```json
{
  "email": "mail@gmail.com"
}
```

###response

```json
{
  "message": "Verification email sent"
}
```
