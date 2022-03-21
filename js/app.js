import NotesAPI from './NotesAPI.js';
import NotesView from './NotesView.js';

const app = document.getElementById('app');
const viwe = new NotesView(app, {
  onNoteAdd() {
    console.log('Note added');
  },
  onNoteEdit(newTitle, newBody) {
    console.log(newTitle, newBody);
  },
});
