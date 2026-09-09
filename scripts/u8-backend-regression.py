"""Run the frozen Users regression suites against the verified local DB only.

Existing suites own their test fixtures and cleanup. Each runs in a fresh process;
logs and a machine-readable summary go to ignored local QA output.
"""
import ast
import json
import os
from pathlib import Path
import re
import runpy
import subprocess
import sys
from urllib.parse import urlparse

FRONTEND = Path(__file__).resolve().parents[1]
BACKEND = FRONTEND.parent / 'Jyotishasha_Backend'
SUITES = [
    'test_saved_audience.py', 'test_admin_users_api.py',
    'test_admin_asknow_concern.py', 'test_admin_dasha_api.py',
    'test_admin_sade_sati.py', 'test_admin_transit.py', 'test_db_safety.py',
    'test_static_astrology_extractor.py', 'test_static_astrology_persistence.py',
    'test_static_astrology_backfill.py', 'test_static_astrology_bootstrap_and_deletion.py',
]

def local_guard():
    tree = ast.parse((BACKEND / 'test_saved_audience.py').read_text(encoding='utf-8'))
    url = next(ast.literal_eval(n.value) for n in ast.walk(tree)
               if isinstance(n, ast.Assign) and any(isinstance(t, ast.Name) and t.id == 'LOCAL_DB_URL' for t in n.targets))
    target = urlparse(url)
    assert target.hostname in ('localhost', '127.0.0.1') and target.path == '/jyotishasha_local'
    import psycopg2
    with psycopg2.connect(url) as connection:
        with connection.cursor() as cursor:
            cursor.execute('SELECT current_database()')
            name = cursor.fetchone()[0]
            assert name == 'jyotishasha_local', 'STOP: unexpected database'
            cursor.execute('SELECT version_num FROM alembic_version')
            versions = sorted(row[0] for row in cursor.fetchall())
            assert versions == ['9f2a5c7e1b83'], 'Unexpected local migration revision'
            cursor.execute("SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='saved_audiences' ORDER BY ordinal_position")
            columns = [row[0] for row in cursor.fetchall()]
            assert 'member_count' not in columns and 'member_ids' not in columns
    revisions, parents = set(), set()
    for path in (BACKEND / 'migrations' / 'versions').glob('*.py'):
        for node in ast.parse(path.read_text(encoding='utf-8-sig')).body:
            if isinstance(node, ast.Assign):
                for dest in node.targets:
                    if isinstance(dest, ast.Name) and dest.id in ('revision', 'down_revision'):
                        value = ast.literal_eval(node.value)
                        if dest.id == 'revision': revisions.add(value)
                        elif isinstance(value, tuple): parents.update(value)
                        elif value: parents.add(value)
    assert revisions - parents == {'9f2a5c7e1b83'}, 'Unexpected migration graph head'
    os.environ['DATABASE_URL'] = url
    os.environ['ACTIVITY_EVENTS_ENVIRONMENT'] = 'local'
    os.environ['PYTHONIOENCODING'] = 'utf-8'
    print(f'LOCAL VERIFIED: {name}; DB revision and graph head: {versions[0]}; audience columns: {columns}', flush=True)

def block_external(event, args):
    if event == 'socket.connect':
        assert args[1][0] in ('127.0.0.1', 'localhost', '::1'), 'U8 blocks external connections'
    if event == 'socket.getaddrinfo':
        assert args[0] in ('127.0.0.1', 'localhost', '::1', None), 'U8 blocks external DNS'

if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    local_guard()
    sys.addaudithook(block_external)
    if len(sys.argv) == 3 and sys.argv[1] == '--suite':
        assert sys.argv[2] in SUITES
        os.chdir(BACKEND)
        sys.path.insert(0, str(BACKEND))
        runpy.run_path(str(BACKEND / sys.argv[2]), run_name='__main__')
    elif '--startup-check' in sys.argv:
        os.chdir(BACKEND)
        sys.path.insert(0, str(BACKEND))
        from flask_sqlalchemy import SQLAlchemy
        from sqlalchemy import event
        from sqlalchemy.engine import Engine
        def forbid_create_all(*args, **kwargs):
            raise AssertionError('Normal startup attempted create_all')
        SQLAlchemy.create_all = forbid_create_all
        @event.listens_for(Engine, 'before_cursor_execute')
        def forbid_schema_change(connection, cursor, statement, parameters, context, executemany):
            assert not re.match(r'\s*(CREATE|ALTER|DROP|TRUNCATE)\b', statement, re.I), 'Normal startup attempted schema mutation'
        import app
        print('PASS: normal app import completes with create_all and schema mutation forbidden.', flush=True)
    elif '--verify-only' not in sys.argv:
        results = []
        for suite in SUITES:
            log = FRONTEND / f'.u6b-u8-{suite}.log'
            with log.open('w', encoding='utf-8') as output:
                result = subprocess.run([sys.executable, str(Path(__file__).resolve()), '--suite', suite], stdout=output, stderr=subprocess.STDOUT)
            content = log.read_text(encoding='utf-8')
            counts = re.findall(r'(\d+) passed, (\d+) failed', content)
            row = {'suite': suite, 'exit': result.returncode, 'passed': int(counts[-1][0]) if counts else None, 'failed': int(counts[-1][1]) if counts else None}
            results.append(row)
            print(json.dumps(row), flush=True)
            (FRONTEND / '.u6b-u8-backend-results.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
        sys.exit(1 if any(row['exit'] or row['failed'] or row['passed'] is None for row in results) else 0)
