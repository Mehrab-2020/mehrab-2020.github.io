$root = 'c:\Users\Meherab\Downloads\ElectromartBD_fixed_final'

# Get all HTML files
$htmlFiles = Get-ChildItem $root -Filter '*.html' -File | Where-Object {
    $_.FullName -notlike '*fixed_site*'
}

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    $modified = $false

    # Fix: Replace https://electromartbd.bd with https://www.electromartbd.bd
    # We use regex to ensure we don't double up if some are already www.
    # Look for https://electromartbd.bd not preceded by www.
    if ($content -match '(?<!www\.)https://electromartbd\.bd') {
        $content = $content -replace '(?<!www\.)https://electromartbd\.bd', 'https://www.electromartbd.bd'
        $modified = $true
        Write-Host "Fixed naked domain URLs in: $($file.Name)"
    }

    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
    }
}

Write-Host "`nAll URL fixes applied!"
