export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNodeDelet } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNodeDelet = onNodeDelet;
    this.root.innerHTML = `
    <div class="notes__sidebar">
      <div class="notes__logo">NOTE APP</div>
      <div class="notes__list"></div>
      <button class="notes__add coolBeans">ADD NOTE</button>
    </div>
    <div class="notes__preview">
      <input type="text" class="notes__title " placeholder="Note title">
      <textarea class="notes__body">Take some note</textarea>
    </div>
    `;
    const addNoteBtn = this.root.querySelector('.notes__add');

    addNoteBtn.addEventListener('click', () => {
      // run add note method !!
      this.onNoteAdd();
    });
    const inputTitle = this.root.querySelector('.notes__title');
    const inputBody = this.root.querySelector('.notes__body');
    [inputBody, inputTitle].forEach((inputField) => {
      inputField.addEventListener('blur', () => {
        const newBody = inputBody.value.trim();
        const newTitle = inputTitle.value.trim();
        this.onNoteEdit(newTitle, newBody);
      });
    });
  }

  // privet class دسترسی در جای دگیر نداریم
  _createListItemHtml(id, title, body, updated) {
    const MAX_BODY_LENGTH = 50;
    return `
    <div class="notes__list-item" data-note-id="${id}" >
    
    <div class="notes__item-header">
    <div class="notes__small-title">${title}</div>
    <span class="notes__list-trash" data-note-id="${id}">
      <i class="far fa-trash-alt"></i>
    </span>
    </div>
    <div class="notes__small-body">
    ${body.substring(0, MAX_BODY_LENGTH)}
    ${body.length > MAX_BODY_LENGTH ? '...' : ''}
    </div>
    <div class="notes__small-updated">
    ${new Date(updated).toLocaleString('IR', {
      dataStyle: 'full',
      timeStyle: 'long',
    })}
    </div>
  </div>
    `;
  }
  updateNoteList(notes) {
    const notesContainer = this.root.querySelector('.notes__list');
    // empty
    notesContainer.innerHTML = '';
    let notesList = '';
    for (const note of notes) {
      const { id, title, body, updated } = note;
      const html = this._createListItemHtml(id, title, body, updated);
      notesList += html;
    }
    notesContainer.innerHTML = notesList;
    notesContainer.querySelectorAll('.notes__list-item').forEach((noteItem) => {
      noteItem.addEventListener('click', () => {
        this.onNoteSelect(noteItem.dataset.noteId);
      });
    });
    notesContainer.querySelectorAll('.notes__list-trash').forEach((noteItem) => {
        noteItem.addEventListener('click', (e) => {
          // برای تنها اجرا شدن کلیک فرزند
          e.stopPropagation();
          this.onNodeDelet(noteItem.dataset.noteId);
        });
      });
  }
}
