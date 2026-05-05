import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const dataPath = (file) => join(__dirname, 'data', file);

function readJSON(file) {
  return JSON.parse(readFileSync(dataPath(file), 'utf-8'));
}

function writeJSON(file, data) {
  writeFileSync(dataPath(file), JSON.stringify(data, null, 2), 'utf-8');
}

app.get('/api/config', (_req, res) => {
  res.json(readJSON('config.json'));
});

app.get('/api/floorplans/:zoneId', (req, res) => {
  const plans = readJSON('floorplans.json');
  const plan = plans[req.params.zoneId];
  if (plan) {
    res.json(plan);
  } else {
    res.json({ cells: [], gridW: 20, gridH: 15 });
  }
});

app.put('/api/floorplans/:zoneId', (req, res) => {
  const plans = readJSON('floorplans.json');
  plans[req.params.zoneId] = req.body;
  writeJSON('floorplans.json', plans);
  res.json({ ok: true });
});

app.get('/api/bookings', (_req, res) => {
  res.json(readJSON('bookings.json'));
});


app.listen(PORT, () => {
  console.log(`Kontorplanlegger server running on http://localhost:${PORT}`);
});
