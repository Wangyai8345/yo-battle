$indexPath = ".\build\web-desktop\index.html"

if (-not (Test-Path $indexPath)) {
    Write-Host "ERROR: $indexPath not found. Build first in Cocos Creator." -ForegroundColor Red
    exit 1
}

$content = Get-Content $indexPath -Raw -Encoding UTF8

if ($content -match "fix-build-applied") {
    Write-Host "Already patched, skipping." -ForegroundColor Yellow
    exit 0
}

$inject = @'
  <!-- fix-build-applied -->
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; background: #000; overflow: hidden; }
    h1.header, p.footer { display: none !important; }
    #GameDiv {
      width: 100vw !important; height: 100vh !important;
      margin: 0 !important; border: none !important;
      border-radius: 0 !important; box-shadow: none !important;
      position: fixed; top: 0; left: 0;
    }
    #GameCanvas { width: 100% !important; height: 100% !important; }
  </style>
  <script>
    window.addEventListener('click', function requestFS() {
      var el = document.documentElement;
      if (!document.fullscreenElement) {
        (el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen).call(el);
      }
    }, { once: true });
  </script>
'@

$content = $content.Replace("</head>", $inject + "`n</head>")
$content = $content -replace "<title>[^<]*</title>", "<title>Yo! Battle!</title>"

[System.IO.File]::WriteAllText((Resolve-Path $indexPath), $content, [System.Text.Encoding]::UTF8)

Write-Host "Done! Patched to fullscreen." -ForegroundColor Green
