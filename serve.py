from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
os.chdir(Path(__file__).parent / "dist")
class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, ".m4a": "audio/mp4", ".webp": "image/webp"}
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()
    def do_GET(self):
        from urllib.parse import urlsplit
        path = urlsplit(self.path).path
        candidate = Path("." + path) / "index.html"
        if not path.endswith("/") and candidate.is_file():
            self.path = path + "/index.html"
        return super().do_GET()
print("Local: http://localhost:4173", flush=True)
ThreadingHTTPServer(("127.0.0.1", 4173), Handler).serve_forever()
