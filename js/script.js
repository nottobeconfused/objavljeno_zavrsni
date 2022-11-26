var clicked = 0;
function prosiri(){
    if(clicked == 0){
    document.getElementById('prosiri').style.height = 'auto';
    clicked = 1;
    }
    else{
        document.getElementById('prosiri').style.height = 'var(--visinaKartice)';
        clicked = 0;
    }
}/*
let textarea = document.createElement("textarea");
function novaBiljeska(){
    document.getElementById("bilješke").insertAdjacentElement("afterBegin", textarea);
}
textarea.contentEditable = "true";

*/


const biljeskeSpremnik = document.getElementById("BiljeskeAplikacija");
const dodajBiljesku = biljeskeSpremnik.querySelector(".dodajBiljesku");

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    biljeskeSpremnik.insertBefore(noteElement, dodajBiljesku);
});



function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Nova bilješka...";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Jeste li sigurni da želite izbrisati?!");

        if(doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}

function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    biljeskeSpremnik.insertBefore(noteElement, dodajBiljesku);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent) {
    const note = getNotes();
    const targetNote = note.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(note);
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    biljeskeSpremnik.removeChild(element);
}