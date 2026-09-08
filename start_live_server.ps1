# Live Server with auto-reload for Dedhida-1.0.0
$port = 5501
$root = Join-Path $PSScriptRoot "Dedhida-1.0.0"

$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".htm"   = "text/html; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".gif"   = "image/gif"
    ".svg"   = "image/svg+xml"
    ".ico"   = "image/x-icon"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
    ".ttf"   = "font/ttf"
    ".eot"   = "application/vnd.ms-fontobject"
    ".otf"   = "font/otf"
    ".map"   = "application/json"
    ".webp"  = "image/webp"
}

$liveReloadScript = @"
<script id="__live_reload_script">
(() => {
    let lastStamp = null;
    setInterval(async () => {
        try {
            const res = await fetch('/__live_check?t=' + Date.now());
            const text = await res.text();
            if (lastStamp !== null && lastStamp !== text) {
                console.log('[Live Server] File change detected, reloading...');
                location.reload();
            }
            lastStamp = text;
        } catch(e) {}
    }, 1000);
})();
</script>
"@

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
    Write-Output "Live server running at http://localhost:$port/"
} catch {
    Write-Output "Listener error: $_"
    exit 1
}

# Open browser to calculators.html with SWP calculator active
Start-Process "http://localhost:$port/calculators.html?calc=sip-swp"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawPath = $request.Url.AbsolutePath

        if ($rawPath -eq "/__live_check") {
            try {
                $maxTick = (Get-ChildItem -Path $root -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property LastWriteTimeUtc -Maximum).Maximum.Ticks
                $body = [System.Text.Encoding]::UTF8.GetBytes("$maxTick")
            } catch {
                $body = [System.Text.Encoding]::UTF8.GetBytes("0")
            }
            $response.ContentType = "text/plain"
            $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.ContentLength64 = $body.Length
            $response.OutputStream.Write($body, 0, $body.Length)
            $response.Close()
            continue
        }

        $localPath = [System.Uri]::UnescapeDataString($rawPath.TrimStart('/'))
        if ([string]::IsNullOrWhiteSpace($localPath)) {
            $localPath = "index.html"
        }

        $fullPath = Join-Path $root $localPath
        if (Test-Path -Path $fullPath -PathType Container) {
            $fullPath = Join-Path $fullPath "index.html"
        }

        if (Test-Path -Path $fullPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $mime = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) {
                $mime = $mimeTypes[$ext]
            }

            $response.ContentType = $mime
            $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
            $response.Headers.Add("Access-Control-Allow-Origin", "*")

            if ($ext -in @(".html", ".htm")) {
                $content = [System.IO.File]::ReadAllText($fullPath, [System.Text.Encoding]::UTF8)
                if ($content.Contains("</body>")) {
                    $content = $content.Replace("</body>", "$liveReloadScript`n</body>")
                } else {
                    $content += "`n$liveReloadScript"
                }
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($content)
            } else {
                $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            }

            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("<!DOCTYPE html><html><body><h1>404 Not Found</h1><p>The file '$localPath' was not found.</p></body></html>")
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
}
