const notes = [
  {
    id: 1,
    title: 'Javascript',
    body: 'start now',
    updated: '2021-10-31T15:02:00.411Z',
  },
  {
    id: 2,
    title: 'React',
    body: 'i need time',
    updated: '2022-03-22T11:17:33.993Z',
  },
];

// take note / save note / delete note

export default class NotesAPI {
  static getAllNotes() {
    const savedNotes = notes || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave) {
    //1.exsist
    //2.not exsist
    const notes = NotesAPI.getAllNotes();
    // use id
    const exsistNote = notes.find((n) => n.id == noteToSave.id);
    if (exsistNote) {
      //user send
      exsistNote.titile = noteToSave.titile;
      exsistNote.body = noteToSave.body;
      exsistNote.updated = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      // title ok body ok =>new note
      notes.push(noteToSave);
    }
    localStorage.setItem('notes-app', JSON.stringify(notes));
  }
  
  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const fillterNotes = notes.filter((n) => n.id != id);
    localStorage.setItem('notes-app', JSON.stringify(fillterNotes));
  }
}
