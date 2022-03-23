// take note / save note / delete note
export default class NotesAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes-app')) || [];
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
      exsistNote.title = noteToSave.title;
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
