"""Local U6B QA launcher. No environment files are changed; no secrets are printed."""
import ast
import os
from pathlib import Path
import socket
import sys

backend = Path(__file__).resolve().parents[2] / "Jyotishasha_Backend"
os.chdir(backend)
sys.path.insert(0, str(backend))
from dotenv import dotenv_values
from urllib.parse import urlparse
import psycopg2

tree = ast.parse((backend / "test_saved_audience.py").read_text(encoding="utf-8"))
url = next(ast.literal_eval(n.value) for n in ast.walk(tree) if isinstance(n, ast.Assign) and any(isinstance(t, ast.Name) and t.id == "LOCAL_DB_URL" for t in n.targets))
target = urlparse(url)
assert target.hostname in ("localhost", "127.0.0.1") and target.path == "/jyotishasha_local"
with psycopg2.connect(url) as connection:
    with connection.cursor() as cursor:
        cursor.execute("SELECT current_database()")
        assert cursor.fetchone()[0] == "jyotishasha_local"
print("Verified local database: jyotishasha_local", flush=True)
os.environ["DATABASE_URL"] = url
os.environ["ACTIVITY_EVENTS_ENVIRONMENT"] = "local"
values = dotenv_values(backend.parent / "jyotishasha-frontend" / ".env.local")
assert values.get("ADMIN_BRIDGE_SECRET")
os.environ["ADMIN_BRIDGE_SECRET"] = values["ADMIN_BRIDGE_SECRET"]

def audit(event, args):
    if event == "socket.connect":
        assert args[1][0] in ("127.0.0.1", "localhost", "::1"), "QA blocks external connections"
    if event == "socket.getaddrinfo":
        assert args[0] in ("127.0.0.1", "localhost", "::1", None), "QA blocks external DNS"
sys.addaudithook(audit)
from app import app
app.run(host="127.0.0.1", port=5000, debug=False, use_reloader=False)
