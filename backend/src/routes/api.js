import express from 'express';
import EvernoteHelper from '../utils/evernote-helper';

import Study from '../models/study';


const router = express.Router();


router.get('/', (req, res) => {
  res.json({ msg: 'this is api route' });
});


router.get('/studies/', (req, res) => {
  const { year } = req.query;
  console.log(year);

  Study.findByYear(year)
    .then((dailyStudyList) => res.json(dailyStudyList))
    .catch((err) => res.send(err));
});


router.get('/studies/test', (req, res) => {
  const token = 'S=s685:U=c0e3e7d:E=1755e2e584f:C=16e067d2880:P=185:A=baba-hironobu-6341:V=2:H=d2453e2ef33a410d46f1e59a619e44fc';

  const everHelper = new EvernoteHelper(token);

  everHelper.getNotebookGuid()
    .then((notebookGuid) => everHelper.getTotalNotes(notebookGuid))
    .then((notes) => everHelper.fillTagsToAll(notes))
    .then((filledNotes) => everHelper.getTotalNoteVersions(filledNotes))
    .then((noteVersions) => EvernoteHelper.getDailyStudyList(noteVersions))
    .then((dailyStudyList) => res.json(dailyStudyList))
    .catch((err) => res.send(err));
});


router.put('/studies/', (req, res) => {
  const token = req.session.oauthAccessToken;

  const everHelper = new EvernoteHelper(token);

  everHelper.getNotebookGuid()
    .then((notebookGuid) => everHelper.getTotalNotes(notebookGuid))
    .then((notes) => everHelper.fillTagsToAll(notes))
    .then((filledNotes) => everHelper.getTotalNoteVersions(filledNotes))
    .then((noteVersions) => EvernoteHelper.getDailyStudyList(noteVersions))
    .then((dailyStudyList) => Study.rebuild(dailyStudyList))
    .then(() => res.send('success'))
    .catch((err) => res.send(err));
});

export default router;
