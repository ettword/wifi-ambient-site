# Getting started

## First session: demo

Use a terminal with Unicode support and a working default audio output. A window of at least 100 columns by 28 rows gives the map room to breathe; the app also adapts to smaller terminals.

Linux prerequisites (Debian/Ubuntu):

```bash
sudo apt-get update
sudo apt-get install build-essential pkg-config libasound2-dev
```

On Windows, install the Rust MSVC toolchain and Visual Studio C++ build tools. No WiFi capture driver is needed for the demo. On Linux, install Rust through the instructions at <https://www.rust-lang.org/tools/install>.

```bash
git clone https://github.com/ettword/wifi-ambient.git
cd wifi-ambient
cargo run --locked --release -- --demo
```

Start with `z`, then `n`. Listen to one network, walk away, and hear how its place in the ensemble changes. Open `Tab`, select a source with up/down and adjust gain with left/right. `s` solos a source; `m` mutes it. The Master and Reverb buses remain part of the signal path when you solo a source.

Lowercase `a` and `b` store mix snapshots; uppercase `A` and `B` recall them. `r` resets the selected channel in Mix Lab; on the map it returns you to the origin. `?` always explains the current screen. `q` exits from any screen.

For visual exploration without an audio device:

```bash
cargo run --locked --release -- --demo --dry-run
```

## Linux monitor capture

Use a separate monitor-capable WiFi adapter. The hardware tested in this project is the 2.4 GHz Atheros AR9271, with the scheduler visiting channels 1–11. Support for other hardware and channel sets is not established by those tests.

```bash
sudo apt-get install libpcap-dev iw
cargo build --locked --release --features wifi
iw dev
```

Replace `wlan1` below with the actual interface from `iw dev`. Changing that adapter to monitor mode interrupts its normal network connection.

```bash
sudo ip link set wlan1 down
sudo iw dev wlan1 set type monitor
sudo ip link set wlan1 up
sudo setcap cap_net_raw,cap_net_admin+ep target/release/wifi-ambient
./target/release/wifi-ambient --interface wlan1
```

Capabilities must be set again after rebuilding. The Linux launcher can diagnose the environment with `./launch.sh check` and start it with `./launch.sh monitor wlan1`.

The default adaptive policy requests channel changes to keep coverage while giving focused and active channels extra attention; useful consecutive visits can continue without a retune. `WIFI_AMBIENT_ATTENTION=legacy` restores the previous round-robin policy. The default was exercised on AR9271/WSL; it is not a guarantee for every adapter. No channel change is evidence of a packet, and time outside a channel is not measured network silence.

## Windows with WSL2 and USB radio

The native Windows build is for demo/replay. Real capture runs inside Linux. Attach a compatible USB adapter to WSL2 using [usbipd-win](https://github.com/dorssel/usbipd-win), then follow the Linux instructions in a Linux checkout. `iw dev` must show the adapter before capture can work. Keep the WSL instance running throughout a hardware session; the project's measured sessions encountered USB loss when WSL shut down.

`setup_wsl2.sh` is a convenience script that installs packages, finds the first adapter, changes its mode and builds the capture binary. Read it before running; manual setup above gives you control over the selected adapter. The Windows launchers currently describe the maintainer's local environment and are not the portable quick start.

## Scan mode

Scan uses a normal managed-mode interface and discovers networks periodically. It has no raw frame stream or client activity, and active scanning can send discovery requests.

```bash
./target/release/wifi-ambient --scan --interface wlan1
```

Monitor and Scan require the Linux `wifi` build. The TUI `m` key requests a mode change; unavailable modes may report an error rather than start.

## Record your own audio

```bash
mkdir -p out
WIFI_AMBIENT_RECORD=out/session.wav ./target/release/wifi-ambient --demo
```

PowerShell:

```powershell
New-Item -ItemType Directory -Force out | Out-Null
$env:WIFI_AMBIENT_RECORD = 'out/session.wav'
cargo run --locked --release -- --demo
Remove-Item Env:WIFI_AMBIENT_RECORD
```

Exit with `q` to finalize the WAV. `--dry-run` has no audio engine and therefore does not record audio. Output files are excluded from Git by default. [Audio analysis tools](../tools/README.md).

## Capture events and replay

```bash
WIFI_AMBIENT_EVENT_LOG=out/events.tsv ./target/release/wifi-ambient --interface wlan1
./target/release/wifi-ambient --replay out/events.tsv
```

The current log stores capture-time events. Real-time replay preserves the event sequence and its timing, but thread scheduling, smoothing and user movement can still change the sound; it is not a sample-exact renderer. Event logs contain network identifiers, including SSIDs and MAC addresses. Share a demo capture for a public example, or explicitly review and sanitize a live capture before distributing it.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Nothing visible near the origin | Press `z` for overview or `n` to visit a known network |
| No audio | Verify the default output device; inspect Mix Lab mutes, solo and Master gain |
| Linux build cannot find ALSA or pcap | Install `libasound2-dev`, `libpcap-dev` and `pkg-config` |
| Monitor startup is blocked | Confirm `iw dev`, monitor mode and capabilities on the newly built binary |
| Demo works but live capture does not | Verify the Linux `wifi` build and USB/adapter access; Windows native capture is unavailable |
| No events in Scan | Check the managed interface and `iw scan` permissions; this mode does not provide client traffic |

Report the mode, OS, command, adapter if applicable, and the actual error. Do not attach unreviewed live network logs to an issue.
