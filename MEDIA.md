# Original project media

These assets describe **WiFi Ambient Synth**, not a proposed redesign of the application. The app captures are its actual terminal output in Demo mode. DemoSource emits synthetic networks, so no real neighbouring SSIDs or device identities are used in these images.

## Files

| Asset | Use |
| --- | --- |
| `logo.svg`, `wordmark.svg` | Scalable identity, transparent background; designed for a dark field |
| `cover.png` | 1600 × 900 project cover |
| `social-card.png` | 1280 × 640 social image / candidate GitHub social preview |
| `overview.png` | Map overview, actual DemoSource output |
| `focus.png` | Single-object focus, actual DemoSource output |
| `mix-lab.png` | Nine-channel mixer, actual DemoSource output |
| `help.png` | Contextual controls, actual DemoSource output |
| `demo-excerpt.ogg` | Original 30-second stereo synth excerpt |
| `captures/*.ans` | Raw ANSI pane captures, unchanged |
| `captures/manifest.json` | Commit, binary hash, source mode, capture times and raw hashes |
| `render-manifest.json` | PNG hashes and their original ANSI inputs |
| `audio-manifest.json` | Excerpt, encoding, gain and audio measurements |

The [press PDF](../../output/pdf/wifi-ambient-press-kit.pdf) is four pages. Source text is in [PRESS_KIT.md](../PRESS_KIT.md).

## What a capture means here

`tmux capture-pane` records the screen cells from a real app session. `pyte` decodes those original ANSI cells; Pillow renders them in a readable monospaced terminal presentation and adds an explicitly separate title frame. No network labels, meters, colors or app state are replaced. The terminal's default background is the brand's dark field. Braille meters use a DejaVu Sans fallback because DejaVu Sans Mono lacks those glyphs.

These are faithful renderings of terminal captures, not OS desktop photographs. The cover and social card are designed layouts containing the original capture. The mark and orbit are identity artwork, not screenshots of a new UI.

## Audio

The app recorded its own post-limiter stereo synth bus during the same Demo session. The excerpt takes seconds 8–38, with a constant **+12 dB presentation gain**, then encodes Ogg Vorbis at quality 5. There is no dynamic compression, pitch change, reference track or third-party recording. The original WAV is kept locally in ignored `out/showcase/`; its hash is in the capture manifest. The preview file is 48 kHz stereo, 30 seconds, with finite samples and a decoded peak below full scale.

The WSL output device reported ALSA underruns during the capture. This asset comes from the synth's internal recorder, not an audio-device loopback; it demonstrates generated audio and does not establish flawless hardware playback. Audio generation and UI timing are not promised to reproduce sample for sample.

## Recreate the package

Build this checkout on Linux/WSL and record the actual app:

```bash
CARGO_TARGET_DIR=out/presentation-build cargo build --locked --release
python3 tools/capture_showcase.py --binary out/presentation-build/release/wifi-ambient
```

Use a virtual environment for presentation dependencies, separate from the runtime:

```bash
python3 -m venv out/presentation-venv
out/presentation-venv/bin/python -m pip install -r tools/requirements-presentation.txt
out/presentation-venv/bin/python tools/build_press_kit.py --font-dir /usr/share/fonts/truetype/dejavu
ffmpeg -ss 8 -t 30 -i out/showcase/demo-original.wav -af volume=12dB -c:a libvorbis -q:a 5 docs/media/demo-excerpt.ogg
```

The renderer verifies raw capture hashes before generating the PNGs. On Windows, use the virtual environment's `Scripts/python.exe` and pass a directory containing the four DejaVu font TTFs. The fonts are not vendored; their rendered use does not replace their own license.

These project assets are distributed under the repository's GNU GPL version 3 license, without warranty. Dependencies and typefaces retain their own licenses. Credit Ettore / WiFi Ambient Synth when identifying the instrument. See the GPL text for the actual redistribution terms.

## Website playback variant

`demo-excerpt.mp3` is a compatibility transcode of `demo-excerpt.ogg`, produced with FFmpeg/libmp3lame quality 2. Same original 30-second excerpt; no additional gain or musical processing. The website tries MP3 first and retains Ogg as fallback.
