# Listen to the invisible

The room is already full of signals. Most of the time, we only notice them when a connection fails. WiFi Ambient Synth starts with another question: what would it mean to listen to that environment?

The first surviving source snapshot in this repository dates to 1 August 2026. It already combines a Rust synthesizer with wireless events. Across the surviving August and September snapshots, the interface becomes a star map you can enter: networks are locations, clients and packet events add motion, and moving through the field changes what reaches your ears. The project history preserves those snapshots rather than pretending everything began with the first Git import.

The central gesture is attention. You can step into a network's space and listen to its character, then move back into the larger ensemble. That same focus can guide the radio toward the object's channel. One radio cannot listen everywhere at once, so memory matters: a network does not cease to exist simply because the receiver is listening elsewhere.

There are two kinds of time in the instrument. A composer makes slower decisions about harmony and density. Packet events bring sharper, immediate changes. The music lives in the tension between those scales, while the Mix Lab lets the listener decide which layers deserve space.

The development process also became an exercise in honest listening. Solo recordings exposed voices that the engine was supposed to be playing but had lost during state updates. Captured traffic and replay helped separate a musical change from a different radio scene. Kernel timestamps revealed that some apparent rhythms had come from how software drained a queue rather than from the wireless world itself.

Those discoveries shape the project's identity. A compelling picture is not enough; the screen should describe the actual instrument. A good score from an analysis tool is not the same thing as a good listening experience. A missing observation is not a silence. The work continues by testing those distinctions.

WiFi Ambient Synth is made by Ettore, with Claude Code and Codex assisting engineering, sound experiments and review. It is an experimental instrument, not a finished account of what wireless activity ought to sound like. Its invitation is simple: listen, move, focus, and discover what changes when you pay attention.

## In italiano

Una stanza è già piena di segnali. Di solito ce ne accorgiamo quando una connessione non funziona. WiFi Ambient Synth nasce da una domanda diversa: come si ascolta quell'ambiente?

La prima fotografia del codice sopravvissuta è del 1° agosto 2026. Nelle versioni di agosto e settembre, il sintetizzatore Rust diventa anche una mappa stellare attraversabile: le reti hanno un posto, il traffico porta movimento, la posizione dell'ascoltatore cambia il suono.

Il gesto centrale è l'attenzione. Ti avvicini a un oggetto per ascoltarlo, poi torni all'insieme. Anche la radio può dare più tempo al suo canale, senza dimenticare gli altri. Una sola radio non ascolta tutto insieme: la memoria mantiene le presenze quando l'osservazione si sposta altrove.

Un composer decide con calma; i pacchetti portano cambiamenti immediati. Le prove sul suono reale hanno insegnato a distinguere un miglioramento musicale da una differenza nel traffico, il ritmo della radio dal batching del software, il silenzio dalla mancata osservazione.

Creato da Ettore, con assistenza di Claude Code e Codex, il progetto resta uno strumento sperimentale. L'invito è ascoltare, muoversi, mettere a fuoco e scoprire cosa cambia quando presti attenzione.

## Traceable milestones

| Period | Surviving evidence |
| --- | --- |
| 1–3 August 2026 | Rust source snapshots: composition, source abstraction, star map and channel hopping |
| 5 August–8 September 2026 | Further snapshots and complete archives, preserved as `storia:` commits |
| October 2026 | TUI/Mix Lab review, layered audio diagnosis, real traffic capture/replay, kernel timestamps and measured radio attention |

This is a narrative drawn from [the project notebook](../RIPRENDI.md), [architecture](../PROGETTO.md) and the preserved Git history. The first surviving file is a historical anchor, not a claim about the exact moment the idea began.
