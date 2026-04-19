const http = require("http");

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/json-nested") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        const { user } = parsed;

        if (!user || typeof user !== "object" || Array.isArray(user)) {
          res.writeHead(422, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "'user' must be an object" }));
          return;
        }

        if (typeof user.name !== "string") {
          res.writeHead(422, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "'user.name' must be a string" }));
          return;
        }

        if (!Array.isArray(user.roles)) {
          res.writeHead(422, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "'user.roles' must be an array" }));
          return;
        }

        const name = user.name;
        const roleCount = user.roles.length;
        const isAdmin = user.roles.includes("admin");

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ name, roleCount, isAdmin }));
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