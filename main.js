"use strict";
class Note {
    constructor(node, id = Date.now() * Math.random()) {
        this.id = id,
            this.node = node;
    }
}
class NoteManager {
    constructor() {
        var _a;
        this.notes = [];
        let noteLocal = JSON.parse((_a = (localStorage.getItem("listNotes"))) !== null && _a !== void 0 ? _a : "[]");
        let noteTemp = [];
        for (let i in noteLocal) {
            noteTemp.push(new Note(noteLocal[i].node, noteLocal[i].id));
        }
        this.notes = noteTemp;
        this.render();
    }
    render() {
        const renderEl = document.querySelector(".renderContainer");
        let noteString = ``;
        this.notes.map((note, index) => {
            noteString += `
            <div class="renderContainerItem">
                <p>${note.node} </p>
                <i onclick="handleDelete(${note.id})" class="fa-solid fa-trash-can"></i>
            </div>
            `;
        });
        renderEl.innerHTML = noteString;
    }
    ;
    createNote(newNote) {
        this.notes.push(newNote);
        localStorage.setItem("listNotes", JSON.stringify(this.notes));
        this.render();
    }
    ;
    deteteNote(idNode) {
        this.notes = this.notes.filter(note => note.id !== idNode);
        localStorage.setItem('listNotes', JSON.stringify(this.notes));
        this.render();
    }
}
const notes = new NoteManager();
function addNewNote() {
    let value = document.getElementById("note").value;
    if (!value || !(value === null || value === void 0 ? void 0 : value.trim()))
        return alert("Please enter a valid note!");
    let newNote = new Note(value);
    notes.createNote(newNote);
    // Hiển thị thông báo toast
    const toastElement = document.getElementById("toast");
    toastElement.innerText = "Note added successfully!";
    toastElement.style.visibility = "visible";
    setTimeout(() => {
        toastElement.style.visibility = "hidden";
    }, 2000); // Hiển thị trong 2 giây
    document.getElementById("note").value = "";
}
function handleDelete(id) {
    if (confirm("Do you want delete ?")) {
        notes.deteteNote(id);
        // Hiển thị thông báo toast
        const toastElement = document.getElementById("toast");
        toastElement.innerText = "Delete Note Successfull !";
        toastElement.style.visibility = "visible";
        setTimeout(() => {
            toastElement.style.visibility = "hidden";
        }, 2000); // Hiển thị trong 2 giây
    }
}
