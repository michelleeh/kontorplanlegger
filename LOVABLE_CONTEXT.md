# Kontorlandskapplanlegger — Lovable Context

Denne filen beskriver appen for Lovable, og fungerer som referanse for frontend-utvikling.

---

## Backend API

Alle API-kall går til:
```
https://kontorplanlegger-production.up.railway.app
```

### Endepunkter

| Metode | URL | Beskrivelse |
|--------|-----|-------------|
| GET | `/api/config` | Henter bygg, etasjer og soner |
| GET | `/api/floorplans/:zoneId` | Henter planverk for en sone |
| PUT | `/api/floorplans/:zoneId` | Lagrer planverk for en sone |
| GET | `/api/bookings` | Henter alle bookinger |

### Eksempel: `/api/config`
```json
{
  "buildings": [{ "id": "bygg-a", "name": "Bygg A" }],
  "floors": [{ "id": "a1", "buildingId": "bygg-a", "name": "1. etasje" }],
  "zones": [{ "id": "a1-nord", "floorId": "a1", "name": "Nord", "soneType": "aktiv" }]
}
```

### Eksempel: `/api/floorplans/:zoneId`
```json
{
  "gridW": 20,
  "gridH": 15,
  "cells": [
    { "id": "el-1", "type": "pult-skjerm", "x": 2, "y": 3, "w": 2, "h": 1 }
  ]
}
```

---

## App-beskrivelse til Lovable

Build a Norwegian office floor plan tool called **"Kontorlandskapplanlegger"**.

The app has two modes toggled by a pill switch in the header:
- **Admin mode (🗺️ Rediger)** — draw and edit the floor plan
- **Booking mode (📅 Book plass)** — view the floor plan and book a workspace

**Location selector (shown in both modes):**
Cascading dropdowns: Building → Floor → Zone. Fetch data from `https://kontorplanlegger-production.up.railway.app/api/config`.

**Admin mode — floor plan editor:**
- A grid canvas (60px cells) where admin places furniture elements
- Elements have different sizes (e.g. desk = 2×1, large meeting room = 6×4)
- Sidebar palette with element types grouped as: Arbeidsplasser (desk with screen, desk without screen, standing desk, lounge), Møterom (small 2-4, medium 4-8, large 8-16, phone booth), Dekor (wall, plant, kitchen, printer, toilet)
- Click empty cell to place element, click placed element to select and resize it
- Save button: PUT to `https://kontorplanlegger-production.up.railway.app/api/floorplans/{zoneId}`
- Load: GET from same URL

**Booking mode:**
- Read-only view of the floor plan
- Bookable elements (desks, meeting rooms) are clickable and show a booking dialog

**Design:** Clean, professional, blue/green color scheme. Norwegian language throughout.

---

## Elementtyper og standardstørrelser

| ID | Navn | Bredde | Høyde | Bookbar |
|----|------|--------|-------|---------|
| `pult-skjerm` | Pult m/ skjerm | 2 | 1 | ja |
| `pult-laptop` | Pult u/ skjerm | 2 | 1 | ja |
| `pult-staaende` | Stående pult | 2 | 1 | ja |
| `lounge` | Lounge-plass | 2 | 1 | ja |
| `mote-lite` | Møterom (2–4) | 3 | 2 | ja |
| `mote-medium` | Møterom (4–8) | 4 | 3 | ja |
| `mote-stort` | Møterom (8–16) | 6 | 4 | ja |
| `telefonkiosk` | Telefonkiosk | 1 | 2 | ja |
| `vegg` | Vegg/skillevegg | 1 | 1 | nei |
| `plante` | Plante | 1 | 1 | nei |
| `kjoekken` | Kjøkken/kaffebar | 4 | 2 | nei |
| `printer` | Printer/kopimaskin | 1 | 1 | nei |
| `toalett` | Toalett/garderobe | 2 | 3 | nei |

---

## Sonetyper

| Type | Beskrivelse |
|------|-------------|
| `stille` | Stillesone — ingen prating |
| `fokus` | Fokussone — ro og konsentrasjon |
| `aktiv` | Aktivsone — samarbeid tillatt |
| `sosial` | Sosial sone — fri prating |
