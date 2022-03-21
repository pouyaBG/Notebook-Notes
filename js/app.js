const notes = [
  {
    id: 2,
    titile: 'second note',
    body: 'some dummy text second',
    updated: '2021-10-31T15:02:00.411Z',
  },
  {
    id: 1,
    titile: 'first note',
    body: 'some dummy text firt',
    updated: '2021-10-31T15:03:23.556Z',
  },
];

// take note / save note / delete note

class NotesAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes-app')) || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }
  saveNote() {}
  deleteNote() {}
}
