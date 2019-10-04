import express from 'express';
import Evernote from 'evernote';
import moment from 'moment-timezone';

import Note from '../models/note';
import { type } from 'os';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'this is api route' });
});

router.get('/token', (req, res) => {
  if (req.session.oauthAccessToken) {
    console.log(req.session.oauthAccessToken);
    res.send(req.session.oauthAccessToken);
  } else {
    res.redirect('/auth');
  }
});

router.get('/test', (req, res) => {
  const token = '';
  const NBGuid = '';
  const NGuid = '';

  const client = new Evernote.Client({
    token,
    sandbox: false,
    china: false,
  });

  const noteStore = client.getNoteStore();

  // noteStore.listNotebooks()
  //   .then((notebooks) => console.log(notebooks));

  noteStore.listNoteVersions(NGuid)
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  res.end();
});

router.get('/notes/', (req, res) => {
  const token = '';
  const NBGuid = '';

  const client = new Evernote.Client({
    token,
    sandbox: false,
    china: false,
  });

  const noteStore = client.getNoteStore();

  const filter = new Evernote.NoteStore.NoteFilter({
    notebookGuid: NBGuid,
  });

  const spec = new Evernote.NoteStore.NotesMetadataResultSpec({
    includeTitle: true,
    includeCreated: true,
    includeUpdated: true,
    includeTagGuids: true,
  });

  const getTotalNotes = async function getTotalNotes() {
    const notesNum = 100;
    let startIndex = 0;
    let remainings = Infinity;

    let totalNotes = [];

    while (remainings > 0) {
      const notesMetadataList = await noteStore.findNotesMetadata(filter, startIndex, notesNum, spec);
      totalNotes = totalNotes.concat(notesMetadataList.notes);

      remainings = notesMetadataList.totalNotes - (startIndex + notesNum);
      startIndex += notesNum;
    }

    return totalNotes;
  };

  const fillTagNs = async function fillTagNs(note) {
    note.tagNames = await noteStore.getNoteTagNames(note.guid);

    return note;
  };

  const fillTagNames = async function fillTagNames(totalNotes) {
    return Promise.all(totalNotes.map(fillTagNs));
  };

  const getNoteVersions = async function getNoteVersions(note) {
    const noteVersionList = await noteStore.listNoteVersions(note.guid);
    const noteVersions = [];

    noteVersionList.splice(0, 0, note);
    let currentDate = moment(0).tz('Asia/Seoul').format('YYYY-MM-DD');

    noteVersionList.forEach((noteV, index) => {
      const koreaMoment = moment(noteV.date).tz('Asia/Seoul');
      const refDate = koreaMoment.format('YYYY-MM-DD');

      if (currentDate !== refDate) {
        currentDate = refDate;

        const noteVersion = {};

        noteVersion.guid = note.guid;
        noteVersion.title = noteV.title;
        noteVersion.date = noteV.updated;
        noteVersion.tagNames = note.tagNames;
        noteVersion.status = index === noteVersionList.length - 1 ? 'created' : 'updated';

        noteVersions.push(noteVersion);
      }
    });

    return noteVersions;
  };

  const getTotalNoteVersions = async function getTotalNoteVersions(filledTotalNotes) {
    const nestedNoteVersions = await Promise.all(filledTotalNotes.map(getNoteVersions));
    let totalNoteVersions = [];

    nestedNoteVersions.forEach((noteVersions) => {
      totalNoteVersions = totalNoteVersions.concat(noteVersions);
    });

    return totalNoteVersions;
  };

  const reducer = function reducerForDailyStudyList(dailyStudyList, noteVersion) {
    const koreaMoment = moment(noteVersion.date).tz('Asia/Seoul');
    const refDate = koreaMoment.format('YYYY-MM-DD');

    const studyIndex = dailyStudyList.findIndex((study) => study.date === refDate);

    if (studyIndex === -1) {
      const newStudy = {};
      newStudy.date = refDate;
      newStudy.contents = [noteVersion];
      newStudy.count = newStudy.contents.length;

      dailyStudyList.push(newStudy);
    } else {
      const study = dailyStudyList[studyIndex];

      study.contents.push(noteVersion);
      study.count = study.contents.length;
    }

    return dailyStudyList;
  };

  const getDailyStudyList = function getDailyStudyList(totalNoteVersions) {
    return totalNoteVersions.reduce(reducer, []);
  };

  getTotalNotes()
    .then(fillTagNames)
    .then(getTotalNoteVersions)
    .then(getDailyStudyList)
    .then((v) => res.json(v))
    .catch((err) => res.send(err));
});

router.post('/notes/', (req, res) => {
  const book = new Note({
    guid: 'note guid',
    title: 'note title',
    tags: ['tag1', 'tag2'],
    date: new Date(),
  });
  book.save((err, savedBook) => {
    if (err) {
      console.error(err);
    } else {
      res.send('success');
    }
  });
});

router.put('/notes/', (req, res) => {
  // const token = req.session.oauthAccessToken;
  const token = '';
  const NBGuid = '';

  const client = new Evernote.Client({
    token,
    sandbox: true,
    china: false,
  });

  const noteStore = client.getNoteStore();

  const filter = new Evernote.NoteStore.NoteFilter({
    notebookGuid: NBGuid,
  });

  const spec = new Evernote.NoteStore.NotesMetadataResultSpec({
    includeTitle: true,
    includeCreated: true,
    includeUpdated: true,
    includeDeleted: true,
  });

  // noteStore.findNotesMetaData(filter, 0, 100, spec)
  //   .then((notesMetadataList) => {
  //     const { notes } = notesMetadataList;
  //     const promiseList = []

  //     notes.forEach((note) => {
  //       promiseList.push(noteStore.listNoteVersions(note.guid))
  //     });

  //     retrun Promise.all(promiseList);
  //   })
  //   .then()

  // getNotes()
  //   .then(getNoteVersions(notes))
  //   .then(changeFormat(noteVersions))
  //   .then(save(dailyStudy));

  // noteStore.findNotesMetadata(filter, 0, 100, spec)
  //   .then((notesMetadataList) => {
  //     let { notes } = notesMetadataList;
  //     notes.forEach((note) => {
  //       let noteVersions = noteStore.listNoteVersions(note.guid)
  //         .then((detailNoteVersions) => {
  //           detailNoteVersions.reduce((noteVersions, noteVersion) => {

  //           }, []);
  //         });
  //       noteVersions += getNoteVersions(note);
  //     });

  //     console.dir(notesMetadataList.notes);
  //     console.log(notesMetadataList.notes[0].constructor);
  //     res.json(notesMetadataList.notes);
  //   });
  // noteVersions.sort();

  // noteStore.listNoteVersions('7c124e39-209e-46c8-a858-4c5d944e267b')
  //   .then((noteVersions) => {
  //     console.dir(noteVersions);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});

router.post('/sync', (req, res) => {
  const token = '';
  const studyNotebookGuid = '';

  const client = new Evernote.Client({
    token,
    sandbox: true,
    china: false,
  });

  const noteStore = client.getNoteStore();

  const filter = new Evernote.NoteStore.NoteFilter({
    notebookGuid: studyNotebookGuid,
  });

  const spec = new Evernote.NoteStore.NotesMetadataResultSpec({
    includeTitle: true,
    includeCreated: true,
    includeUpdated: true,
    includeDeleted: true,
  });

  noteStore.findNotesMetadata(filter, 0, 100, spec).then((notesMetadataList) => {
    console.log(notesMetadataList.notes);
  });

  res.send('sync');
});

router.post('/test', (req, res) => {
  console.log(req.body);
  console.log(req.session.oauthAccessToken);
  res.end();
});

router.use('*', (req, res) => {
  res.json({ msg: 'any api is not found' });
});

export default router;
