# Blog Api

#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js...
2. Invoke in start()...
3. Setup .env in the root...
4. Add MONGO_URI with correct value...

#### Routers

- Blog.js
- User.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose...
- Hash Password (with bcryptjs)...
- Save User...
- Generate Token....
- Send Response with Token....

#### Login User

- Validate - email, password - in controller...
- If email or password is missing, throw BadRequest error...
- Find User
- Compare Passwords
- If no user or password does not match, throw Unauthenticated error
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors..
- Duplicate (Email)..
- Cast Error..

#### Security

- helmet..
- cors..
- express-rate-limit...

#### Models

---

### User

| field           | data_type | constraints |
| --------------- | --------- | ----------- |
| id              | string    | required    |
| username        | string    | required    |
| mobile          | string    | required    |
| email           | string    | required    |
| password        | string    | required    |
| confirmPassword | string    | required    |

### Blog

| field        | data_type | constraints                                            |
| ------------ | --------- | ------------------------------------------------------ |
| id           | string    | required                                               |
| title        | string    | required                                               |
| description  | string    | optional                                               |
| body         | string    | required                                               |
| author       | string    | required                                               |
| read_count   | [string]  | default: []                                            |
| tags         | [string]  | optional                                               |
| reading_time | string    | default: 0                                             |
| timestamp    | boolean   | true                                                   |
| state        | string    | required, enum: ["draft", "published"], default: draft |

#### APIS

### Login User

- Route: /user/login
- Method: POST
- Body:
  {
  "email": "john123@gmail.com",
  "password": "john123"
  }

- Responses
- Response Status: 200 OK

Success

```
{
    "result": {
        "_id": "6360e0bb9b4f1d36e4ae80af",
        "email": "john123@gmail.com",
        "mobile": "+2348065782456",
        "password": "$2a$12$wq5oAkyKaZwuT2FlJ3OyaeJllIetX7rz6l9cIv5VAUHrvPWdPmLfe",
        "name": "john obinna",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4xMjNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTIkd3E1b0FreUthWnd1VDJGbEozT3lhZUpsbElldFg3cno2bDljSXY1VkFVSHJ2UFdkUG1MZmUiLCJpZCI6IjYzNjBlMGJiOWI0ZjFkMzZlNGFlODBhZiIsImlhdCI6MTY2NzgwMTIwMCwiZXhwIjoxNjY3ODA0ODAwfQ.V0OXyhv44uvfT-WNRfT4T8IQVzeeWnyr2jF4C0tWtko"
}

```

### Register User

- Route: /user/register
- Method: POST
- Body:
  {
  "email": "kemi123@gmail.com",
  "firstName": "kemi",
  "lastName": "akin",
  "phoneNumber": "+2348045742496",
  "password": "kemi123",
  "confirmPassword": "kemi123"
  }

- Responses
- Response Status: 200 OK

Success

```
{
    "result": {
        "_id": "6368a17350f6c80008a96454",
        "email": "kemi123@gmail.com",
        "mobile": "+2348045742496",
        "password": "$2a$12$TvYAiyRglAtoIvbBRFvE5Ok/AcP9J.Xn6XzxMNrn.PzkNJM7PKkJ6",
        "name": "kemi akin",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbWkxMjNAZ21haWwuY29tIiwiaWQiOiI2MzY4YTE3MzUwZjZjODAwMDhhOTY0NTQiLCJpYXQiOjE2Njc4MDE0NTksImV4cCI6MTY2NzgwNTA1OX0.bodnNLFERia8b_YINK6tmJZgJkuTeMqYXVOScFl5HCw"
}

```

### Create Blog

- Route: /blog/create
- Method: POST
- Body:
  {
  "title": "Is tesla the best car",
  "description": "Is this the best car?",
  "body": "Tesla, Inc. (/ˈtɛslə/ TESS-lə or /ˈtɛzlə/ TEZ-lə[b]) is an American automotive and clean energy company based in Austin, Texas. Tesla designs and manufactures electric vehicles (electric cars and trucks), battery energy storage from home to grid-scale, solar panels and solar roof tiles, and related products and services. Tesla is one of the world's most valuable companies and remains the world's most valuable automaker with a market capitalization of more than US $1 trillion. The company had the most worldwide sales of battery electric vehicles and plug-in electric vehicles, capturing 23% of the battery-electric (purely electric) market and 16% of the plug-in market (which includes plug-in hybrids) in 2020. Through its subsidiary Tesla Energy, the company develops and is a major installer of photovoltaic systems in the United States. Tesla Energy is also one of the largest global suppliers of battery energy storage systems, with 3.99 gigawatt-hours (GWh) installed in 2021.",
  "tags": ["Cars", "tesla"]
  }

- Responses
- Response Status: 200 OK

Success

```
{
  {
    "newBlog": {
        "state": "draft",
        "read_count": [],
        "reading_time": "1 min",
        "tags": [
            "Cars",
            "tesla"
        ],
        "_id": "6368a34f50f6c80008a9645b",
        "title": "Is tesla the best car",
        "description": "Is this the best car?",
        "body": "Tesla, Inc. (/ˈtɛslə/ TESS-lə or /ˈtɛzlə/ TEZ-lə[b]) is an American automotive and clean energy company based in Austin, Texas. Tesla designs and manufactures electric vehicles (electric cars and trucks), battery energy storage from home to grid-scale, solar panels and solar roof tiles, and related products and services. Tesla is one of the world's most valuable companies and remains the world's most valuable automaker with a market capitalization of more than US $1 trillion. The company had the most worldwide sales of battery electric vehicles and plug-in electric vehicles, capturing 23% of the battery-electric (purely electric) market and 16% of the plug-in market (which includes plug-in hybrids) in 2020. Through its subsidiary Tesla Energy, the company develops and is a major installer of photovoltaic systems in the United States. Tesla Energy is also one of the largest global suppliers of battery energy storage systems, with 3.99 gigawatt-hours (GWh) installed in 2021.",
        "author": "6368a17350f6c80008a96454",
        "createdAt": "2022-11-07T06:18:55.149Z",
        "updatedAt": "2022-11-07T06:18:55.149Z",
        "__v": 0
    }
}
}

```

### Get All Paginated Published blogs

- Route: /blog/published?page=1
- Method: GET

- Responses
- Response Status: 200 OK

Success

```

{
    "data": [
        {
            "state": "published",
            "read_count": [
                "1"
            ],
            "reading_time": "0",
            "tags": [
                "Soccer"
            ],
            "_id": "6360e7e4c23c624b58637780",
            "title": "Ronaldo",
            "description": "Who Is Better Messi Or Ronaldo All Time?",
            "body": "Who has scored the most goals between Messi and Ronaldo? Ronaldo has scored 804 goals in 1106 games while Messi has scored 759 goals in 957 games. Ronaldo has played 149 games more than Messi in his entire career",
            "author": "6360e0bb9b4f1d36e4ae80af",
            "createdAt": "2022-11-01T09:33:24.440Z",
            "updatedAt": "2022-11-03T02:17:42.851Z",
            "__v": 0
        },
    ],
    "currentPage": 1,
    "NumberOfPages": 1
}

```

### Update draft blog to published blog

- Route: /blog/draft_to_publish/update/:id
- Method: PATCH

- Body:
  {"state":"published"}

- Responses
- Response Status: 200 OK

Success

```

{
    "state": "published",
    "read_count": [
        "6360e864c23c624b58637783",
        "6360e0bb9b4f1d36e4ae80af"
    ],
    "reading_time": "1 min",
    "tags": [
        "Vacation"
    ],
    "_id": "636214a53c361b34e8046762",
    "title": "Vacation",
    "description": "Island Vacation",
    "body": "I am taking my family to the island to have fun and spend some quality time with them and also make time for my wife and kids",
    "author": "6360e864c23c624b58637783",
    "createdAt": "2022-11-02T06:56:37.034Z",
    "updatedAt": "2022-11-07T06:20:44.950Z",
    "__v": 0
}

```

### Edit Published Blog

- Route: /blog/edit/published/:id
- Method: PATCH

- Body:
  {
  "title": "Ronaldo",
  "description": "Who Is Better Messi Or Ronaldo All Time?",
  "body": "Who has scored the most goals between Messi and Ronaldo? Ronaldo has scored 804 goals in 1106 games while Messi has scored 759 goals in 957 games. Ronaldo has played 149 games more than Messi in his entire career",
  "tags": "Soccer"
  }

- Responses
- Response Status: 200 OK

Success

```

{
    "state": "published",
    "read_count": [
        "1"
    ],
    "reading_time": "0",
    "tags": [
        "Soccer"
    ],
    "_id": "6360e7e4c23c624b58637780",
    "title": "Ronaldo",
    "description": "Who Is Better Messi Or Ronaldo All Time?",
    "body": "Who has scored the most goals between Messi and Ronaldo? Ronaldo has scored 804 goals in 1106 games while Messi has scored 759 goals in 957 games. Ronaldo has played 149 games more than Messi in his entire career",
    "author": "6360e0bb9b4f1d36e4ae80af",
    "createdAt": "2022-11-01T09:33:24.440Z",
    "updatedAt": "2022-11-07T06:23:57.158Z",
    "__v": 0
}

```

### Edit Draft Blog

- Route: /blog/edit/draft/:id
- Method: PATCH

- Body:
  {
  "title": "Vacation Island",
  "description": "Island Vacation Holiday",
  "body": "I am taking my family to the island to have fun and spend some quality time with them and also make time for my wife and kids",
  "tags": ["Vacation"],
  }

- Responses

Success

```

{
    "state": "draft",
    "read_count": [],
    "reading_time": "1min",
    "tags": [
        "Vacation"
    ],
    "_id": "636214f5f2c0cc213cd42359",
    "title": "Vacation Island",
    "description": "Island Vacation Holiday",
    "body": "I am taking my family to the island to have fun and spend some quality time with them and also make time for my wife and kids",
    "author": "6360e864c23c624b58637783",
    "createdAt": "2022-11-02T06:57:57.935Z",
    "updatedAt": "2022-11-07T06:28:01.697Z",
    "__v": 0
}

```

### Get All Paginated and Filtered User blog made by a single user

- Route: /blog/all_user_blogs?page=1&state=draft
- Method: GET

- Responses
- Response Status: 200 OK

Success

```

{
    "data": [
        {
            "state": "draft",
            "read_count": [],
            "reading_time": "1 min",
            "tags": [
                "Cars",
                "tesla"
            ],
            "_id": "6368a34f50f6c80008a9645b",
            "title": "Is tesla the best car",
            "description": "Is this the best car?",
            "body": "Tesla, Inc. (/ˈtɛslə/ TESS-lə or /ˈtɛzlə/ TEZ-lə[b]) is an American automotive and clean energy company based in Austin, Texas. Tesla designs and manufactures electric vehicles (electric cars and trucks), battery energy storage from home to grid-scale, solar panels and solar roof tiles, and related products and services. Tesla is one of the world's most valuable companies and remains the world's most valuable automaker with a market capitalization of more than US $1 trillion. The company had the most worldwide sales of battery electric vehicles and plug-in electric vehicles, capturing 23% of the battery-electric (purely electric) market and 16% of the plug-in market (which includes plug-in hybrids) in 2020. Through its subsidiary Tesla Energy, the company develops and is a major installer of photovoltaic systems in the United States. Tesla Energy is also one of the largest global suppliers of battery energy storage systems, with 3.99 gigawatt-hours (GWh) installed in 2021.",
            "author": "6368a17350f6c80008a96454",
            "createdAt": "2022-11-07T06:18:55.149Z",
            "updatedAt": "2022-11-07T06:18:55.149Z",
            "__v": 0
        }
    ],
    "currentPage": 1,
    "NumberOfPages": 1
}

```

### Get single published blog

- Route: /blog/published/:id
- Method: GET

- Responses
- Response Status: 200 OK

Success

```

{
    "blog": {
        "state": "published",
        "read_count": [
            "1"
        ],
        "reading_time": "0",
        "tags": [
            "Soccer"
        ],
        "_id": "6360e7e4c23c624b58637780",
        "title": "Ronaldo",
        "description": "Who Is Better Messi Or Ronaldo All Time?",
        "body": "Who has scored the most goals between Messi and Ronaldo? Ronaldo has scored 804 goals in 1106 games while Messi has scored 759 goals in 957 games. Ronaldo has played 149 games more than Messi in his entire career",
        "author": "6360e0bb9b4f1d36e4ae80af",
        "createdAt": "2022-11-01T09:33:24.440Z",
        "updatedAt": "2022-11-07T06:23:57.158Z",
        "__v": 0
    }
}

```

### Delete published blog

- Route: /blog/delete/published/:id
- Method: DELETE

- Responses
- Response Status: 200 OK

Success

```

published blog has been deleted successfully

```

### Delete draft blog

- Route: /blog/delete/draft/:id
- Method: DELETE

- Responses
- Response Status: 200 OK

Success

```

draft blog has been deleted successfully

```

### Get all searchable published blog that can be accessed by both logged in and logged out users

- Route: /blog/search?searchQuery=Software&tags=none&user=none
- Method: GET

- Responses
- Response Status: 200 OK

Success

```

{
    "data": [
        {
            "state": "published",
            "read_count": [],
            "reading_time": "0",
            "tags": [
                "Developer"
            ],
            "_id": "63610b1ed84bea399473e02b",
            "title": "Software",
            "description": "Software developers design, program, build, deploy and maintain software using many different skills and tools",
            "body": "Software developers design specific computer systems and application software. Software engineers work on a larger scale to design, develop, and test entire computer systems and application software for a company or organization—software development is a subset of software engineering",
            "author": "6360e0bb9b4f1d36e4ae80af",
            "createdAt": "2022-11-01T12:03:42.721Z",
            "updatedAt": "2022-11-01T12:05:24.628Z",
            "__v": 0
        }
    ],
    "currentPage": null,
    "NumberOfPages": 1
}

```
