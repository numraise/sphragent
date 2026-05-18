param(
  [string]$WorldPath = "C:\Users\ASUS\AppData\Roaming\Minecraft Education Edition\games\com.mojang\minecraftWorlds\8JTSGjukwKk="
)

$repoRoot = Split-Path -Parent $PSScriptRoot
$bpSource = Join-Path $repoRoot "packs\source\SuperHeroAgent_BP"
$rpSource = Join-Path $repoRoot "packs\source\SuperHeroAgent_RP"
$bpTarget = Join-Path $WorldPath "behavior_packs\SuperHeroAgent_BP"
$rpTarget = Join-Path $WorldPath "resource_packs\SuperHeroAgent_RP"
$bpManifest = Get-Content -Raw (Join-Path $bpSource "manifest.json") | ConvertFrom-Json
$rpManifest = Get-Content -Raw (Join-Path $rpSource "manifest.json") | ConvertFrom-Json

foreach ($pair in @(
  @{ Source = $bpSource; Target = $bpTarget },
  @{ Source = $rpSource; Target = $rpTarget }
)) {
  if (-not (Test-Path -LiteralPath $pair.Source)) {
    throw "Source pack not found: $($pair.Source)"
  }

  $targetParent = Split-Path -Parent $pair.Target
  if (-not (Test-Path -LiteralPath $targetParent)) {
    New-Item -ItemType Directory -Path $targetParent -Force | Out-Null
  }

  if (Test-Path -LiteralPath $pair.Target) {
    Remove-Item -LiteralPath $pair.Target -Recurse -Force
  }

  Copy-Item -LiteralPath $pair.Source -Destination $pair.Target -Recurse -Force
}

Write-Host "Synced SuperHeroAgent packs into world:"
Write-Host "  $bpTarget"
Write-Host "  $rpTarget"

function Update-WorldPackReference {
  param(
    [string]$JsonPath,
    [string]$PackId,
    [object[]]$Version
  )

  $entries = @()
  if (Test-Path -LiteralPath $JsonPath) {
    $raw = Get-Content -Raw -LiteralPath $JsonPath
    if ($raw.Trim()) {
      $entries = @($raw | ConvertFrom-Json)
    }
  }

  $updated = $false
  foreach ($entry in $entries) {
    if ($entry.pack_id -eq $PackId) {
      $entry.version = $Version
      $updated = $true
    }
  }

  if (-not $updated) {
    $entries += [pscustomobject]@{
      pack_id = $PackId
      version = $Version
    }
  }

  $entries | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $JsonPath -Encoding UTF8
}

Update-WorldPackReference `
  -JsonPath (Join-Path $WorldPath "world_behavior_packs.json") `
  -PackId $bpManifest.header.uuid `
  -Version @($bpManifest.header.version)

Update-WorldPackReference `
  -JsonPath (Join-Path $WorldPath "world_resource_packs.json") `
  -PackId $rpManifest.header.uuid `
  -Version @($rpManifest.header.version)

Write-Host "Updated world pack references to:"
Write-Host "  BP $($bpManifest.header.uuid) => $($bpManifest.header.version -join '.')"
Write-Host "  RP $($rpManifest.header.uuid) => $($rpManifest.header.version -join '.')"
