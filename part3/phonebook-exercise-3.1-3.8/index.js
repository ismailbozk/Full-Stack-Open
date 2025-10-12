const express = require("express");
const crypto = require("crypto");

const app = express();
const morgan = require("morgan");

app.use(express.json());

function morganLogger(request, response, next) {
  morgan.token("body", function (req, res) {
    return JSON.stringify(req.body);
  });
  const logger = morgan(
    ":method :url :status :res[content-length] - :response-time ms :body"
  );
  logger(request, response, next);
}
app.use(morganLogger);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  response.send(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Phonebook info</title>
  </head>
  <body>
    <h1>Phonebook</h1>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  </body>
</html>`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  return getRandomInt(10000000000).toString();
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const nameExists = persons.find((person) => person.name === body.name);
  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
