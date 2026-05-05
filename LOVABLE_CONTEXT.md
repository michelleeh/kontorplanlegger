# Kontorlandskapplanlegger — Lovable Context

Denne filen beskriver appen for Lovable, og fungerer som referanse for frontend-utvikling.

---

## Arkitektur

```
Lovable frontend  →  Supabase (planverk, bookinger)
                  →  Railway API (bygg/etasje/sone-konfig)
```

- **Supabase**: lagring av planverk og bookinger (Lovable Cloud)
- **Railway**: `https://kontorplanlegger-production.up.railway.app/api/config` — statisk konfig for bygg, etasjer og soner

---

## Railway API (kun konfig)

| Metode | URL | Beskrivelse |
|--------|-----|-------------|
| GET | `/api/config` | Henter bygg, etasjer og soner |

### Eksempel: `/api/config`
```json
{
  "buildings": [{ "id": "bygg-a", "name": "Bygg A" }],
  "floors": [{ "id": "a1", "buildingId": "bygg-a", "name": "1. etasje" }],
  "zones": [{ "id": "a1-nord", "floorId": "a1", "name": "Nord", "soneType": "aktiv" }]
}
```

---

## Iterasjon 3 — Prompt til Lovable

```
Migrate data storage from the Railway REST API to Supabase (Lovable Cloud).

Create these two Supabase tables:

1. floor_plans
   - zone_id: text (primary key)
   - grid_w: integer (default 20)
   - grid_h: integer (default 15)
   - cells: jsonb (default [])
   - updated_at: timestamptz (default now())

2. bookings
   - id: uuid (primary key, default gen_random_uuid())
   - zone_id: text
   - element_id: text
   - element_type: text
   - user_name: text
   - booking_date: date
   - time_slot: text ('formiddag' | 'ettermiddag' | 'hel_dag')
   - created_at: timestamptz (default now())

Then update the app:

1. Replace all floor plan fetch/PUT calls to Railway with Supabase queries:
   - Load: SELECT from floor_plans WHERE zone_id = ?
   - Save: UPSERT into floor_plans

2. Keep fetching config (buildings/floors/zones) from Railway:
   https://kontorplanlegger-production.up.railway.app/api/config

3. Implement the BookingDialog so it actually saves to the bookings table:
   - Fields: name (text input), date (date picker), time slot (formiddag / ettermiddag / hel dag)
   - On submit: INSERT into bookings
   - Show success toast on save

4. In booking mode, show which elements are booked today:
   - Query bookings WHERE booking_date = today AND zone_id = current zone
   - Highlight booked elements in red/orange on the canvas
   - Show tooltip: "Booket av [navn] – [tidsluke]"

Norwegian language throughout.
```

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
