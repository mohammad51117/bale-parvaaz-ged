#!/usr/bin/env bash
set -euo pipefail
PDF='/home/ubuntu/upload/1001-GED-Practice-Questions-For-Dummies-by-Stuart-Donnelly.pdf'
OUT='/home/ubuntu/webdev-static-assets/ged-visual-folios'
mkdir -p "$OUT"
for page in 12 17 24 26 32 33 36 38 40 41 50 52 53 54 56 58 60 64 66 73 80 85 86 95 98 101 102 104 110 114 117 124 126 128 130 145 159 161 164 172 174 177 183 187 188 191 195 199 201 202 209 216 217 219 220 223 225 227 236 237 251 255 257 259 267 270 274 279 280 282 283 288 290 292; do
  pdftoppm -f "$page" -l "$page" -jpeg -r 125 -singlefile "$PDF" "$OUT/folio-$page" >/dev/null
done
printf 'rendered %s visual folios\n' "$(find "$OUT" -name '*.jpg' | wc -l)"
