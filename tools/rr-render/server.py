import sys
import re
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit, parse_qs, unquote

TOOL = Path(__file__).parent.resolve()
MODEL = Path(sys.argv[1]).resolve()
OUT = Path(sys.argv[2]).resolve()
OUT.mkdir(parents=True, exist_ok=True)
import os
os.chdir(TOOL)
SAFE = re.compile(r"^[A-Za-z0-9_\-/]+\.(webp|png|json)$")


class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p = unquote(urlsplit(path).path)
        if p.startswith("/model/"):
            return str(MODEL / p[len("/model/"):])
        if p.startswith("/out/"):
            return str(OUT / p[len("/out/"):])
        return str(TOOL / p.lstrip("/"))

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "https://higgsfield.ai")
        self.send_header("Access-Control-Allow-Private-Network", "true")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_POST(self):
        q = parse_qs(urlsplit(self.path).query)
        name = q.get("name", [""])[0]
        if not SAFE.match(name) or ".." in name:
            self.send_error(400)
            return
        data = self.rfile.read(int(self.headers["Content-Length"]))
        target = OUT / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"ok")

    def log_message(self, *a):
        pass


print("render tool: http://localhost:4199", flush=True)
ThreadingHTTPServer(("127.0.0.1", 4199), Handler).serve_forever()
