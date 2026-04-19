const http = require("http");

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/json-calc") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const { a, b, operation } = JSON.parse(body);

        // Валідація: всі поля мають бути присутні та правильного типу
        if (typeof a !== "number" || typeof b !== "number" || typeof operation !== "string") {
          res.writeHead(422, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "'a' and 'b' must be numbers, 'operation' must be a string" }));
          return;
        }

        // Ділення на нуль
        if (operation === "divide" && b === 0) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Division by zero is not allowed" }));
          return;
        }

        let result;

        switch (operation) {
          case "add":
            result = a + b;
            break;
          case "subtract":
            result = a - b;
            break;
          case "multiply":
            result = a * b;
            break;
          case "divide":
            result = a / b;
            break;
          default:
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: `Unknown operation: '${operation}'. Use: add, subtract, multiply, divide` }));
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ result }));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});