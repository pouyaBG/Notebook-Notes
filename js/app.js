import NotesAPI from './NotesAPI.js';
import NotesView from './NotesView.js';

export default class App {
  constructor(root) {
    this.notes = [];
    this.activNote = null;
    this.view = new NotesView(root, this._handlers());
    this._refreshNotes();
  }
  _refreshNotes() {
    const notes = NotesAPI.getAllNotes();

    // set notes:
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVissibility(notes.length > 0);

    // set active notes:
    this.activNote = notes[0];
    this.view.updateActiveNote(notes[0]);
  }
  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: 'new note',
          body: ' take new note',
        };
        NotesAPI.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (newTitle, newBody) => {
        NotesAPI.saveNote({
          id: this.activNote.id,
          title: newTitle,
          body: newBody,
        });
        this._refreshNotes();
      },
      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find((n) => n.id == noteId);
        this.activNote = selectedNote;
        this.view.updateActiveNote(selectedNote);
      },
      onNodeDelet: (noteId) => {
        NotesAPI.deleteNote(noteId);
        this._refreshNotes();
      },
    };
  }
}
