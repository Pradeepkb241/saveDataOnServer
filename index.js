
window.onload = ()=>{
    
    axios.get('https://crudcrud.com/api/9ba5d618f93e4155a4ebc699f8036906/appointmentDetails')
    .then(res=>{
        console.log(res);
        for(const e of res.data){
        showOnUserScreen(e);
        }
    }).catch(err=>console.log(err));
    // localStorage.setItem(obj.Email, JSON.stringify(obj));
    // showOnUserScreen(obj);

}
function saveToLocalStorage(event) {
    event.preventDefault();

    let name = event.target.userName.value;
    let email = event.target.email.value;
    let contactNumber = event.target.phoneNumber.value;

    let obj = {
        Name: name,
        Email: email,
        ContactNumber: contactNumber
    }

    axios.post('https://crudcrud.com/api/9ba5d618f93e4155a4ebc699f8036906/appointmentDetails', obj)
    .then(res=> {
        showOnUserScreen(obj);
        // console.log(res);
    })
    .catch(err=>console.log(err));

    event.target.reset();

}

function showOnUserScreen(obj) {
    let parentELement = document.getElementById('listOfItem');
    let childElement = document.createElement('li');
    childElement.textContent = obj.Name + '- ' + obj.Email + '- ' + obj.ContactNumber;
    parentELement.appendChild(childElement);

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    childElement.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function () {
        removeList(childElement);
        localStorage.removeItem(obj.Email); // Remove from localStorage
    });


    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    childElement.appendChild(editBtn);

    editBtn.addEventListener('click', function () {
        editItem(childElement);
        localStorage.removeItem(obj.Email);
    });


}



function removeList(listItem) {
    let parentList = listItem.parentElement;
    parentList.removeChild(listItem);
}
function editItem(listItem) {
    let parentList = listItem.parentElement;
    parentList.removeChild(listItem);
}

