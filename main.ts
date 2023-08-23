class Note{
    id : number
    node: string
    constructor(node:string,id:number = Date.now() * Math.random()){
        this.id = id,
        this.node=node;
    }
}
class NoteManager{
    notes : Note[] = [];
    constructor(){
        let noteLocal = JSON.parse((localStorage.getItem("listNotes")) ?? "[]");
        let noteTemp = []
        for(let i in noteLocal){
            noteTemp.push(new Note(noteLocal[i].node,noteLocal[i].id))
        }
        this.notes = noteTemp;
        this.render()
    }
    render():void {
        const renderEl = document.querySelector(".renderContainer") as HTMLElement ;
        let noteString = ``;
        this.notes.map((note,index) =>{
            noteString += `
            <div class="renderContainerItem">
                <p>${note.node} </p>
                <i onclick="handleDelete(${note.id})" class="fa-solid fa-trash-can"></i>
            </div>
            `
        })
        renderEl.innerHTML = noteString;
    };
    createNote(newNote : Note){
        this.notes.push(newNote);
        localStorage.setItem("listNotes",JSON.stringify(this.notes));
        this.render()
    };
    deteteNote(idNode : number){
        this.notes = this.notes.filter(note => note.id !== idNode)
        localStorage.setItem('listNotes',JSON.stringify(this.notes));
        this.render();
    }


}
const notes = new NoteManager();
function addNewNote(){
    let value = (document.getElementById("note") as HTMLInputElement).value;
    if(!value || !value?.trim()) return alert("Please enter a valid note!");
    let newNote = new Note(value)
    notes.createNote(newNote);
    // Hiển thị thông báo toast
    const toastElement = document.getElementById("toast") as HTMLElement;
    toastElement.innerText = "Note added successfully!";
    toastElement.style.visibility = "visible";
    setTimeout(() => {
        toastElement.style.visibility = "hidden";
    }, 2000); // Hiển thị trong 2 giây
    
    (document.getElementById("note") as HTMLInputElement).value = ""
}

function handleDelete(id : number){
    if(confirm("Do you want delete ?")){
        notes.deteteNote(id);
         // Hiển thị thông báo toast
    const toastElement = document.getElementById("toast") as HTMLElement;
    toastElement.innerText = "Delete Note Successfull !";
    toastElement.style.visibility = "visible";
    setTimeout(() => {
        toastElement.style.visibility = "hidden";
    }, 2000); // Hiển thị trong 2 giây
   
      
    }
}