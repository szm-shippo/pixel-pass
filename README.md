# pixel-pass

This repository contains the development source for an app that exchanges pixel-art membership cards over short-range phone communication.

The core of the project is not the transport itself. It is the experience of adding a small daily record to your card, exchanging it with someone nearby, and revisiting it later as a memory.

## MVP Scope

- Prioritize an iPhone-first MVP
- Card creation
- Today’s pixel stamp journal
- Explicit exchange centered on QR / NFC
- Card collection
- Calendar view
- Signed data model
- Local storage with an offline-first assumption

## Out of Scope for MVP

- Continuous BLE pass-by exchange
- Android support
- Detailed map view
- Event organizer features
- Backup / sync
- Subscription billing

## Product Principles

- Keep the exchange experience anonymous and safe
- Do not broadcast fixed IDs
- Handle location as opt-in and fuzzed data
- Make exchange and received-card viewing the free core features
- Avoid designing it like a dating app
- Keep it lighter than social media, closer to journaling and collecting

## Tech Stack

- Rust
- Tauri v2

## Repository Layout

```text
.
├── docs/
│   ├── requirements.md
│   └── architecture.md
├── src/
│   └── models.ts
├── .gitignore
├── README.js.md
└── README.md
```

## Source Requirement

The original requirements are stored in `docs/requirements.md`. If implementation decisions are unclear, prefer the requirements document over this README.
