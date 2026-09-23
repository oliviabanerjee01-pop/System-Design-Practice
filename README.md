# URL Shortener - System Design Day 1

A simple URL Shortener built with **Node.js, Express, and MongoDB** as the Day 1 practical project for learning System Design fundamentals.

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* Nodemon

## Project Structure

```text
SYSTEMDESIGN/
│
├── config/
│   └── db.js
│
├── models/
│   └── Url.js
│
├── node_modules/
├── .env
├── package.json
└── server.js
```

## How It Works

The application converts a long URL into a short URL.

### 1. Create a Short URL

Send:

```http
POST /shorten
```

Request body:

```json
{
  "originalUrl": "https://www.google.com"
}
```

The server generates a unique short code such as:

```text
c6upa7
```

The URL is then stored in MongoDB.

### 2. Access the Short URL

Open:

```text
http://localhost:5000/c6upa7
```

The server searches MongoDB for the short code and redirects the user to the original URL.

## API Endpoints

| Method | Endpoint      | Purpose                            |
| ------ | ------------- | ---------------------------------- |
| GET    | `/`           | Check whether the API is running   |
| POST   | `/shorten`    | Create a shortened URL             |
| GET    | `/:shortCode` | Find the original URL and redirect |

## Basic Architecture

```text
             ┌─────────────┐
             │    User     │
             └──────┬──────┘
                    │
                    ▼
             ┌─────────────┐
             │   Express   │
             │   Server    │
             └──────┬──────┘
                    │
                    ▼
             ┌─────────────┐
             │   MongoDB   │
             └─────────────┘
```

## System Design Concepts Practiced

### Functional Requirements

The system must:

* Accept a long URL.
* Generate a short code.
* Store the URL.
* Return the shortened URL.
* Redirect the short URL to the original URL.

### Non-Functional Requirements

Important considerations for a larger version include:

* Low latency
* High availability
* Scalability
* Reliability
* Efficient database usage

### Scalability

**Vertical scaling** means increasing the power of one server.

Example:

```text
2 CPU → 8 CPU
8 GB RAM → 32 GB RAM
```

**Horizontal scaling** means adding more servers.

```text
             Load Balancer
             /     |     \
            /      |      \
       Server 1 Server 2 Server 3
```

Horizontal scaling is useful when one server cannot handle the traffic.

### Latency

Latency is the time taken for a request to receive a response.

Example:

```text
User → Server → Database → Server → User
```

If this takes 100 ms, the request latency is approximately 100 ms.

### Throughput

Throughput is how many requests a system can process in a given amount of time.

Example:

```text
10,000 requests/second
```

### Bottleneck

A bottleneck is the component that limits the performance of the entire system.

For this application, possible bottlenecks at large scale include:

* Express server
* MongoDB
* Network
* Database connections

## Read vs Write

### Write

When a new shortened URL is created:

```text
POST /shorten
       ↓
Generate shortCode
       ↓
Write to MongoDB
```

### Read

When someone opens a shortened URL:

```text
GET /c6upa7
       ↓
Search MongoDB
       ↓
Find originalUrl
       ↓
Redirect
```

A URL shortener is generally **read-heavy** because many users may access existing short URLs while comparatively fewer new URLs are created.

## Future Scaling Ideas

These technologies are intentionally **not implemented in Day 1**.

They will be studied separately:

* Load Balancer
* Redis
* NGINX
* Docker
* Message Queues
* Kafka
* WebSockets
* Microservices
* Kubernetes
* Monitoring and Observability

The goal of Day 1 is to understand the fundamentals before adding advanced infrastructure.

## Run Locally

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

The server runs on:

```text
http://localhost:5000
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Day 1 Learning Outcome

After completing this project, I should be able to explain:

* What system design is
* Functional vs non-functional requirements
* Scalability
* Vertical vs horizontal scaling
* Load balancing
* Latency
* Throughput
* Availability
* Reliability
* Stateful vs stateless systems
* Monolith vs microservices
* Read-heavy vs write-heavy systems
* Database bottlenecks
* Basic system architecture

## Status

**Day 1: Completed**

Built a working URL Shortener using:

```text
Node.js + Express + MongoDB
```

Next step: analyze how this architecture behaves when traffic grows from a small number of users to millions of users.
