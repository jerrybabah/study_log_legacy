import express from 'express';
import EvernoteHelper from '../utils/evernote-helper';

import Study from '../models/study';


const router = express.Router();


router.get('/', (req, res) => {
  res.json({ msg: 'this is api route' });
});


router.get('/studies/', (req, res) => {
  const { year } = req.query;

  Study.findByYear(year)
    .then((dailyStudyList) => res.json(dailyStudyList))
    .catch((err) => res.send(err));
});


router.put('/studies/', (req, res) => {
  let token;
  if (process.env.NODE_ENV === 'development') {
    token = req.body.oauthAccessToken;
  } else {
    token = req.session.oauthAccessToken;
  }

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
