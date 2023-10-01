const API_URL = "https://crudcrud.com/api/dec8721cfa0341cea535ee0bd9cbc4d2";
window.onload = ()=>{
    
    axios.get(API_URL+"/appointmentDetails")
    .then(res=>{
        console.log(res);
        for(const e of res.data){
        showOnUserScreen(e);
        }
    }).catch(err=>console.log(err));
   
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

    axios.post(API_URL+"/appointmentDetails", obj)
    .then(res=> {
        showOnUserScreen(obj);
        // console.log(res);
    })
    .catch(err=>console.log(err));
     // localStorage.setItem(obj.Email, JSON.stringify(obj));
    // showOnUserScreen(obj);

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
        // localStorage.removeItem(obj.Email); // Remove from localStorage
            const id = obj._id;

            axios.delete(API_URL+`/appointmentDetails/${id}`)
            .then(res=>{
                console.log(res);
                
                // for(const e of res.data){
                // showOnUserScreen(e);
                // }
            }).catch(err=>console.log(err));
           
        
    });


    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    childElement.appendChild(editBtn);

    editBtn.addEventListener('click', function (event) {
    console.log(childElement);    
    const temp = childElement.textContent?.split("-").map((f)=>f.trim());
    const userName = document.getElementById("userName");
    const email  = document.getElementById("email");
    const tel = document.getElementById("phoneNumber");
    userName.value= temp[0];
    email.value = temp[1];
    tel.value = temp[2];
    // console.log(event.srcElement.parentELement);
    //     editItem(childElement);
    //     // localStorage.removeItem(obj.Email);
    //     const id = obj._id;
       
       
    //     axios.put(`https://crudcrud.com/api/9ba5d618f93e4155a4ebc699f8036906/appointmentDetails/${id}`, {
        
    //             Name: 'pradeep',
    //             Email: 'email',
    //             ContactNumber: '45612'
            
    //     })
    //     .then(res=>{
    //         console.log(res);
    //     }).catch(err=>console.log(err));
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

