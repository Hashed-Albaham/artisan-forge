#!/usr/bin/env bash
# ==============================================================================
# muapi-ui-design: generate-mockup.sh
# Production-grade CLI tool for high-fidelity UI/UX mockup generation via muapi.ai
# ==============================================================================
set -euo pipefail

VERSION="0.2.0"
PLATFORM="web"
THEME="dark"
PROMPT=""
ASPECT_RATIO=""
OUTPUT_FILE="mockup_preview.png"
TIMEOUT=120
DRY_RUN=0

usage() {
  cat <<EOF
muapi-ui-design CLI Generator v${VERSION}
Generates atomic-design high-fidelity mockups for web and mobile interfaces.

Usage:
  $0 --prompt "<description>" [options]

Required:
  -p, --prompt STRING       UI description (e.g. "Fintech crypto wallet dashboard")

Options:
      --platform STRING     Target platform: web, ios, android, tablet (default: web)
      --theme STRING        Theme palette: dark, light, emerald-slate, warm-editorial (default: dark)
  -o, --output FILE         Output image file path (default: mockup_preview.png)
      --dry-run             Validate prompt and output JSON spec without calling external API
  -t, --timeout SECONDS     cURL timeout in seconds (default: 120)
  -v, --version             Display version information
  -h, --help                Display this help message

Environment Variables:
  MUAPI_KEY                 Required API token for muapi.ai (or standard Gemini/Flux bearer)

Exit Codes:
  0: Success
  1: Argument validation error
  2: Network or cURL failure
  3: API rejected request or returned non-200 HTTP code
  4: Payload response missing image URL
EOF
  exit "${1:-0}"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    -p|--prompt)
      [[ -n "${2:-}" ]] || { echo "Error: Missing value for --prompt" >&2; exit 1; }
      PROMPT="$2"
      shift 2
      ;;
    --platform)
      [[ -n "${2:-}" ]] || { echo "Error: Missing value for --platform" >&2; exit 1; }
      PLATFORM="$2"
      shift 2
      ;;
    --theme)
      [[ -n "${2:-}" ]] || { echo "Error: Missing value for --theme" >&2; exit 1; }
      THEME="$2"
      shift 2
      ;;
    -o|--output)
      [[ -n "${2:-}" ]] || { echo "Error: Missing value for --output" >&2; exit 1; }
      OUTPUT_FILE="$2"
      shift 2
      ;;
    -t|--timeout)
      [[ -n "${2:-}" ]] || { echo "Error: Missing value for --timeout" >&2; exit 1; }
      TIMEOUT="$2"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=1
      shift 1
      ;;
    -v|--version)
      echo "muapi-ui-design generate-mockup.sh v${VERSION}"
      exit 0
      ;;
    -h|--help)
      usage 0
      ;;
    *)
      echo "Error: Unknown argument '$1'" >&2
      usage 1
      ;;
  esac
done

# Validate required arguments
[[ -n "$PROMPT" ]] || { echo "Error: --prompt is required" >&2; usage 1; }

# Derive strict aspect ratio and layout constraints based on platform
case "$PLATFORM" in
  ios|android|mobile)
    ASPECT_RATIO="9:16"
    LAYOUT_RULES="Mobile viewport, strict Apple HIG / Material 3 guidelines, 44px/48dp touch targets, status bar and home indicator accommodations, single-column bento flow."
    ;;
  tablet)
    ASPECT_RATIO="4:3"
    LAYOUT_RULES="Tablet landscape viewport, master-detail dual pane or adaptive 6-column grid layout."
    ;;
  web|desktop|saas)
    ASPECT_RATIO="16:9"
    LAYOUT_RULES="Desktop SaaS viewport (1440x900), 12-column responsive layout, 24px gutters, fixed structural navigation rail."
    ;;
  *)
    echo "Error: Unsupported platform '$PLATFORM'. Allowed: web, ios, android, tablet" >&2
    exit 1
    ;;
esac

# Construct enriched prompt adhering strictly to Atomic Design & Anti-Slop principles
ENHANCED_PROMPT="High-fidelity ${PLATFORM} digital UI/UX mockup of: ${PROMPT}. Aspect ratio ${ASPECT_RATIO}. Strict Atomic Design orchestration (distinct atoms, molecules, organisms). Theme palette: ${THEME}. Typography: clear sans-serif geometric display scale. Crisp high-contrast vector elements, subtle 1px container borders, WCAG AA compliant contrast. Zero external device hardware frames, no laptop bezels, no hands holding phones, pure raw software interface canvas."

echo "🎨 [muapi-ui-design] Preparing generation..."
echo "  • Platform:     ${PLATFORM} (${ASPECT_RATIO})"
echo "  • Theme:        ${THEME}"
echo "  • Output Path:  ${OUTPUT_FILE}"

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo ""
  echo "🔍 [DRY-RUN] Specification generated successfully:"
  if command -v jq >/dev/null 2>&1; then
    jq -n \
      --arg platform "$PLATFORM" \
      --arg theme "$THEME" \
      --arg ar "$ASPECT_RATIO" \
      --arg prompt "$ENHANCED_PROMPT" \
      --arg output "$OUTPUT_FILE" \
      '{status: "dry-run-valid", platform: $platform, theme: $theme, aspect_ratio: $ar, output_file: $output, prompt: $prompt}'
  else
    echo "Prompt: $ENHANCED_PROMPT"
  fi
  exit 0
fi

# Validate API credentials
if [[ -z "${MUAPI_KEY:-}" ]]; then
  echo "⚠️ MUAPI_KEY environment variable is not set." >&2
  echo "   Export your API key: export MUAPI_KEY='your_api_token'" >&2
  echo "   Or run with --dry-run to validate prompt and configuration locally." >&2
  exit 1
fi

command -v curl >/dev/null 2>&1 || { echo "Error: 'curl' is required but not installed." >&2; exit 1; }
command -v jq >/dev/null 2>&1 || { echo "Error: 'jq' is required for JSON processing." >&2; exit 1; }

RESPONSE_FILE="/tmp/muapi_response_$$.json"
trap 'rm -f "$RESPONSE_FILE"' EXIT

PAYLOAD=$(jq -n \
  --arg p "$ENHANCED_PROMPT" \
  --arg ar "$ASPECT_RATIO" \
  '{model: "flux-dev", prompt: $p, aspect_ratio: $ar, n: 1, quality: "hd"}')

echo "📡 Calling muapi.ai generation API..."

HTTP_CODE=$(curl -sS -w "%{http_code}" -o "$RESPONSE_FILE" \
  -X POST "https://api.muapi.ai/v1/images/generations" \
  -H "Authorization: Bearer ${MUAPI_KEY}" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  --retry 3 \
  --retry-delay 2 \
  --max-time "$TIMEOUT") || {
    echo "❌ Network failure: Failed to reach api.muapi.ai" >&2
    exit 2
  }

if [[ "$HTTP_CODE" -ne 200 ]]; then
  echo "❌ API Error (HTTP $HTTP_CODE):" >&2
  if [[ -f "$RESPONSE_FILE" ]]; then
    cat "$RESPONSE_FILE" >&2
  fi
  exit 3
fi

IMAGE_URL=$(jq -r '.data[0].url // empty' "$RESPONSE_FILE")
if [[ -z "$IMAGE_URL" ]]; then
  echo "❌ Error: API response did not contain an image URL." >&2
  cat "$RESPONSE_FILE" >&2
  exit 4
fi

echo "⬇️ Downloading high-fidelity mockup image..."
curl -sS -L "$IMAGE_URL" -o "$OUTPUT_FILE"

echo "✅ Mockup successfully generated and saved to: ${OUTPUT_FILE}"
