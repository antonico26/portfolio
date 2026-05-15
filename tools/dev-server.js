const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const preferredPort = Number(process.env.PORT || process.argv[2] || 5173);
const host = process.env.HOST || "127.0.0.1";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function resolveRequestPath(url) {
  const requestPath = decodeURIComponent(new URL(url, `http://${host}`).pathname);
  const cleanPath = requestPath === "/" ? "/index.html" : requestPath;
  const filePath = path.resolve(root, `.${cleanPath}`);

  if (!filePath.startsWith(root)) {
    return null;
  }

  return filePath;
}

function sendFile(res, filePath) {
  const extension = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (error, content) => {
    if (error) {
      fs.readFile(path.join(root, "index.html"), (fallbackError, fallbackContent) => {
        if (fallbackError) {
          res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("Archivo no encontrado");
          return;
        }

        res.writeHead(200, {
          "Cache-Control": "no-store",
          "Content-Type": "text/html; charset=utf-8",
        });
        res.end(fallbackContent);
      });
      return;
    }

    res.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
    });
    res.end(content);
  });
}

function createServer() {
  return http.createServer((req, res) => {
    if (!req.url || req.method !== "GET") {
      res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Metodo no permitido");
      return;
    }

    const filePath = resolveRequestPath(req.url);

    if (!filePath) {
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Ruta no permitida");
      return;
    }

    sendFile(res, filePath);
  });
}

function listen(port, attemptsLeft = 10) {
  const server = createServer();

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && attemptsLeft > 0) {
      listen(port + 1, attemptsLeft - 1);
      return;
    }

    console.error(error.message);
    process.exit(1);
  });

  server.listen(port, host, () => {
    const url = `http://${host}:${port}`;
    console.log("");
    console.log(`Portfolio listo en ${url}`);
    console.log("Pulsa Ctrl+C para detener el servidor.");
    console.log("");
  });
}

listen(preferredPort);
