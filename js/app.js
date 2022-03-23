import NotesAPI from './NotesAPI.js';
import NotesView from './NotesView.js';

const app = document.getElementById('app');
const view = new NotesView(app, {
  onNoteAdd() {
    console.log('Note added');
  },
  onNoteEdit(newTitle, newBody) {
    console.log(newTitle, newBody);
  },
  onNoteSelect(noteId) {
    console.log(noteId);
    // make note
  },
  onNodeDelet(noteId) {
    console.log(noteId);
  },
});

view.updateNoteList(NotesAPI.getAllNotes());
view.updateActiveNote(NotesAPI.getAllNotes()[1]);
