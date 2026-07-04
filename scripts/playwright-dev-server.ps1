$env:DATABASE_URL = ""
$env:DIRECT_URL = ""
& "C:\Program Files\nodejs\npm.cmd" run dev -- --hostname 127.0.0.1 --port 3100
