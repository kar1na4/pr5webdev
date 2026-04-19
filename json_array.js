const http = require("http");

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/json-array") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        const { numbers } = parsed;

        if (!Array.isArray(numbers)) {
          res.writeHead(422, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "'numbers' must be an array" }));
          return;
        }

        const allNumbers = numbers.every((n) => typeof n === "number");
        if (!allNumbers) {
          res.writeHead(422, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "All elements in 'numbers' must be numbers" }));
          return;
        }

        if (numbers.length === 0) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ count: 0, sum: 0, average: 0 }));
          return;
        }

        const count = numbers.length;
        const sum = numbers.reduce((acc, n) => acc + n, 0);
        const average = sum / count;

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ count, sum, average }));
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