param(
  [string]$WorldPath = "C:\Users\ASUS\AppData\Roaming\Minecraft Education Edition\games\com.mojang\minecraftWorlds\8JTSGjukwKk="
)

$repoRoot = Split-Path -Parent $PSScriptRoot
$bpSource = Join-Path $repoRoot "packs\source\SuperHeroAgent_BP"
$rpSource = Join-Path $repoRoot "packs\source\SuperHeroAgent_RP"
$bpTarget = Join-Path $WorldPath "behavior_packs\SuperHeroAgent_BP"
$rpTarget = Join-Path $WorldPath "resource_packs\SuperHeroAgent_RP"

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
