import * as express from "express";
import * as cors from 'cors';
import * as fs from "node:fs";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

interface Session {
  id: number,
  title: string,
  body: string,
  type: string,
  startDateTime: number,
  endDateTime: number,
}

const sessionsStorage: Session[] = JSON.parse(fs.readFileSync('./server/data/sessions.json', 'utf8'));

function getResourceId(): number {
  let highestKnownId = 0;

  for (const session of sessionsStorage) {
    if (session.id > highestKnownId) {
      highestKnownId = session.id;
    }
  }

  return highestKnownId + 1;
}

app.get('/sessions', (_req, res) => {
  console.log('[LOG]:api: GET sessions', sessionsStorage);

  res.send(sessionsStorage);
});

app.post('/sessions', (req, res) => {
  const newSession: Session = {
    id: getResourceId(),
    title: req.body.title,
    body: req.body.body,
    type: req.body.type,
    startDateTime: Number(req.body.startDateTime),
    endDateTime: Number(req.body.endDateTime),
  }

  sessionsStorage.push(newSession);

  console.log('[LOG]:api: POST sessions', newSession);

  res.send(newSession);
});

app.put('/sessions/:id', (req, res) => {
  const session = sessionsStorage.find((s) => s.id === Number(req.params.id));

  if (session) {
    session.title = req.body.title;
    session.body = req.body.body;
    session.type = req.body.type;
    session.startDateTime = Number(req.body.startDateTime);
    session.endDateTime = Number(req.body.endDateTime);
  }

  console.log('[LOG]:api: PUT sessions', session);

  res.send(session);
});

app.delete('/sessions/:id', (req, res) => {
  const sessionPositionToDelete = sessionsStorage.findIndex((s) => s.id === Number(req.params.id));
  sessionsStorage.splice(sessionPositionToDelete, 1);

  console.log('[LOG]:api: DELETE session', req.params.id);

  res.send();
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})