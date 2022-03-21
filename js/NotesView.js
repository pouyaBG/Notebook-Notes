export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.root.innerHTML = `
    <div class="notes__sidebar">
      <div class="notes__logo">NOTE APP</div>
      <div class="notes__list">
      
      </div>
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
}
