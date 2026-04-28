$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $root 'public'
if (-not (Test-Path $publicDir)) {
  New-Item -ItemType Directory -Path $publicDir | Out-Null
}

foreach ($s in @(192, 512)) {
  $bmp = New-Object Drawing.Bitmap($s, $s)
  $g = [Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $rect = [Drawing.Rectangle]::new(0, 0, $s, $s)
  $brush = New-Object Drawing.Drawing2D.LinearGradientBrush(
    $rect,
    [Drawing.Color]::FromArgb(255, 79, 70, 229),
    [Drawing.Color]::FromArgb(255, 167, 139, 250),
    [Drawing.Drawing2D.LinearGradientMode]::Vertical
  )
  $g.FillRectangle($brush, $rect)

  $fontSize = [Math]::Max([int]($s / 6), 14)
  $font = New-Object Drawing.Font('Segoe UI', $fontSize, [Drawing.FontStyle]::Bold, [Drawing.GraphicsUnit]::Pixel)
  $sf = New-Object Drawing.StringFormat
  $sf.Alignment = [Drawing.StringAlignment]::Center
  $sf.LineAlignment = [Drawing.StringAlignment]::Center
  $rectF = New-Object Drawing.RectangleF([float]$rect.Left, [float]$rect.Top, [float]$rect.Width, [float]$rect.Height)
  $g.DrawString('A', $font, [Drawing.Brushes]::White, $rectF, $sf)

  $path = Join-Path $publicDir "pwa-$s.png"
  $bmp.Save($path, [Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
  Write-Host "Wrote $path"
}
