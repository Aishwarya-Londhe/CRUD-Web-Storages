var cl = console.log;
let ls = window.localStorage;

const stdForm = document.getElementById("stdForm")
const submitBtn = document.getElementById("submitBtn")
const updateBtn = document.getElementById("updateBtn")
const fnameControl = document.getElementById("fname")
const lnameControl = document.getElementById("lname")
const emailControl = document.getElementById("email")
const contactControl = document.getElementById("contact")
const stdContainer = document.getElementById("stdContainer")


let stdArray = [];

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

const onEdit = (ele) => {
    let getId = ele.getAttribute('data-id');
    ls.setItem("setEditId", getId);
    let getobj = stdArray.find(obj => obj.id === getId);
    cl(getobj);
    fnameControl.value = getobj.fname;
    lnameControl.value = getobj.lname;
    emailControl.value = getobj.email;
    contactControl.value = getobj.contact;
    submitBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')
    ele.parentElement.parentElement;
}

const onDelete = (ele) => {
    cl(`Deleted`)
    // let deleteId = ele.getAttribute("data-id")
    let deleteId = ele.dataset.id;
    cl(deleteId)
    stdArray = stdArray.filter(obj => obj.id !== deleteId);
    setStdArray();
    // tempalating(stdArray);
    cl(ele.parentElement.parentElement);
    ele.parentElement.parentElement.remove();
}

const tempalating = (arr) => {
    let result = '';
    arr.forEach((std, i) => {
        result += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${std.fname}</td>
                    <td>${std.lname}</td>
                    <td>${std.email}</td>
                    <td>${std.contact}</td>
                    <td><button class="btn btn-primary" data-id="${std.id}" onclick="onEdit(this)">Edit</button></td>
                    <td><button class="btn btn-primary" data-id="${std.id}" onclick="onDelete(this)">Delete</button></td>
                </tr>
            `
    })
    stdContainer.innerHTML = result;
}
if (ls.getItem("setStdInfo").length > 0) {
    stdArray = JSON.parse(ls.getItem("setStdInfo"))
    tempalating(stdArray);
}

const onStdSubmit = (eve) => {
    eve.preventDefault();
    // cl(`submitted`)
    let obj = {
        fname : fnameControl.value,
        lname : lnameControl.value,
        email : emailControl.value,
        contact : contactControl.value,
        id : uuid()
    }
    stdArray.push(obj);
    cl(stdArray);
    tempalating(stdArray);
    ls.setItem("setStdInfo", JSON.stringify(stdArray));
    stdForm.reset();
}

const onStdUpdate = (eve) => {
    let getUpdateId = ls.getItem("setEditId");
    cl(getUpdateId);
    stdArray.forEach(obj => {
        if(obj.id === getUpdateId) {
            obj.fname = fnameControl.value;
            obj.lname = lnameControl.value;
            obj.email = emailControl.value;
            obj.contact = contactControl.value;
        }
    })
    setStdArray();
    // tempalating(stdArray);
    submitBtn.classList.remove('d-none')
    updateBtn.classList.add('d-none')
    stdForm.reset()
}

function setStdArray(){
    ls.setItem("setStdInfo", JSON.stringify(stdArray));
}

stdForm.addEventListener("submit", onStdSubmit)
updateBtn.addEventListener("click", onStdUpdate)
