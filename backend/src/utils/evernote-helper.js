import config from 'config';
import Evernote from 'evernote';
import moment from 'moment-timezone';


class EvernoteHelper {
  constructor(token) {
    this.token = token;

    this.sandbox = config.get('evernote.sandbox');
    this.china = config.get('evernote.china');

    this.client = new Evernote.Client({
      token: this.token,
      sandbox: this.sandbox,
      china: this.china,
    });

    this.noteStore = this.client.getNoteStore();

    this.notebookName = config.get('evernote.notebookName');
    this.notesNum = config.get('evernote.notesNum');

    this.specOption = config.get('evernote.specOption');
    this.spec = new Evernote.NoteStore.NotesMetadataResultSpec(this.specOption);
  }


  async getNotebookGuid() {
    const notebooks = await this.noteStore.listNotebooks();
    const studyNotebook = notebooks.filter((notebook) => notebook.name === this.notebookName)[0];
    return studyNotebook.guid;
  }


  async getTotalNotes(notebookGuid) {
    const filter = new Evernote.NoteStore.NoteFilter({
      notebookGuid,
    });

    let startIndex = 0;
    let remainings = Infinity;

    let totalNotes = [];

    while (remainings > 0) {
      const notesMetadataList = await this.noteStore.findNotesMetadata(filter, startIndex, this.notesNum, this.spec);
      totalNotes = totalNotes.concat(notesMetadataList.notes);

      remainings = notesMetadataList.totalNotes - (startIndex + this.notesNum);
      startIndex += this.notesNum;
    }

    return totalNotes;
  }


  async fillTagsTo(note) {
    note.tagNames = await this.noteStore.getNoteTagNames(note.guid);

    return note;
  }


  async fillTagsToAll(notes) {
    return Promise.all(notes.map((note) => this.fillTagsTo(note)));
  }


  async getNoteVersions(filledNote) {
    const noteVersionList = await this.noteStore.listNoteVersions(filledNote.guid);

    noteVersionList.splice(0, 0, filledNote);
    let currentDate = moment(0).tz('Asia/Seoul').format('YYYY-MM-DD');

    const noteVersions = [];

    noteVersionList.forEach((noteV) => {
      const koreaMoment = moment(noteV.updated).tz('Asia/Seoul');
      const refDate = koreaMoment.format('YYYY-MM-DD');

      if (currentDate !== refDate) {
        currentDate = refDate;

        const noteVersion = {};

        noteVersion.guid = filledNote.guid;
        noteVersion.title = filledNote.title;
        noteVersion.date = noteV.updated;
        noteVersion.tagNames = filledNote.tagNames;
        noteVersion.status = 'updated';

        noteVersions.push(noteVersion);
      }
    });

    noteVersions[noteVersions.length - 1].status = 'created';

    return noteVersions;
  }


  async getTotalNoteVersions(filledNotes) {
    const nestedNoteVersions = await Promise.all(filledNotes.map((filledNote) => this.getNoteVersions(filledNote)));
    let totalNoteVersions = [];

    nestedNoteVersions.forEach((noteVersions) => {
      totalNoteVersions = totalNoteVersions.concat(noteVersions);
    });

    return totalNoteVersions;
  }


  static reducer(dailyStudyList, noteVersion) {
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
  }


  static getDailyStudyList(totalNoteVersions) {
    const dailyStudyList = totalNoteVersions.reduce(EvernoteHelper.reducer, []);
    dailyStudyList.sort((a, b) => {
      let comparison = 0;
      if (a.date > b.date) {
        comparison = -1;
      }
      if (a.date < b.date) {
        comparison = 1;
      }
      return comparison;
    });
    return dailyStudyList;
  }
}

export default EvernoteHelper;
