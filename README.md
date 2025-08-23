
# SQL Bulletin API

A RESTful API for a bulletin board application, built with Node.js, Express, and PostgreSQL. The API handles users, channels, messages, and subscriptions

---

## 🌟 **Features**

- Create, read, update, and delete (CRUD) users, channels, and subscriptions.
- Logic to ensure only subscribers can post messages in a channel.
- **Gold Star:** A message can be posted in multiple channels simultaneously.
- **Gold Star:** Messages in a channel are automatically sorted by timestamp.
- The API is protected against SQL injection using parameterized queries.

---

## 🚀 **Installation & Setup**

### Requirements

- **Node.js** (v18+)
- **PostgreSQL** (v14+)

### Get Started

1. **Clone the repository:**

```bash
git clone [https://github.com/your-username/your-project-name.git](https://github.com/your-username/your-project-name.git)
cd your-project-name
```

1. **Install dependencies:**

```bash
npm install
```

1. **Configure environment variables:**

    Create a `.env` file in the root directory and add your database credentials:

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_DATABASE=sql_bulletin
DB_PORT=5432
```

1. **Set up the database:**
    - Open **pgAdmin** and create a new database named `sql_bulletin`.
    - Run the SQL script from `setup.sql` in the query tool to create all the necessary tables.

1. **Start the API server:**

```bash
npm start
=======
    npm star
```

The server will start on `http://localhost:3000`.

---

## 🗺️ **API Endpoints**

You can use a tool like **Insomnia** or **Postman** to interact with the API.

| Method | Endpoint                 | Description                                                            |
|:-------|:-------------------------|:-----------------------------------------------------------------------|
| `POST` | `/users`                 | Creates a new user.                                                    |
| `GET`  | `/users/:id/channels`    | Fetches all channels a specific user is subscribed to.                 |
| `POST` | `/channels`              | Creates a new channel.                                                 |
| `GET`  | `/channels/:id/messages` | Fetches all messages from a specific channel, sorted by creation date. |
| `POST` | `/subscriptions`         | Creates a new subscription between a user and a channel.               |
| `POST` | `/messages`              | Creates a new message in one or more channels.                         |
=======
| Method   | Endpoint                      | Description                                             | Access  |
| :------- | :---------------------------- | :------------------------------------------------------ | :------ |
| `POST`   | `/users`                      | Creates a new user..                                    | Private |
| `GET`    | `/users/:id/channels`         | Fetches all channels a specific user is subscribed to.  | Private |
| `POST`   | `/channels`                   | Creates a new channel.                                  | Private |
| `GET`    | `/channels/:id/messages`      | Fetches all messages from a specific channel, sorted by | Private |
|          |                               | creation date.                                          |         |
| `POST`   | `/subscriptions`              | Creates a new subscription between a user and a channel.| Private |
| `POST`   | `/messages`                   | Creates a new message in one or more channels.          | Private |

---

## ⚙️ **Technologies Used**

- **Node.js & Express:** The API framework.
- **PostgreSQL:** The relational database.
- **TypeScript:** The language used for static type-checking.
- **dotenv:** For managing environment variables.
- **pg:** The PostgreSQL client for Node.js.
- **Insomnia:** The tool for testing the API.
- **dbdiagram.io:** Used for creating the ER diagram.
