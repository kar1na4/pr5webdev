const http = require("http");

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/json-object") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const { name, age } = JSON.parse(body);

        if (typeof name !== "string" || typeof age !== "number") {
          res.writeHead(422, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "Invalid input: 'name' must be a string and 'age' must be a number" })
          );
          return;
        }

        const response = {
          greeting: `Hello ${name}`,
          isAdult: age >= 18,
        };

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(response));
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