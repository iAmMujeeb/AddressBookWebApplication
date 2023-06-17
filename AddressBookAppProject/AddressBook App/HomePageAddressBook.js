let addressBookList;

window.addEventListener('DOMContentLoaded', (event) => {
    addressBookList = getAddressBookDataFromStorage();
    document.querySelector('.addressBook-count').textContent = addressBookList.length;
    createInnerHtml();
    localStorage.removeItem('editAddress');
});

const getAddressBookDataFromStorage = () => {
    return localStorage.getItem('AddressBookList') ? JSON.parse(localStorage.getItem('AddressBookList')) : [];
}

const createInnerHtml = () => {
const headerHtml = "<th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th><th>Actions</th>";
if (addressBookList.length == 0) return;
let innerHtml = `${headerHtml}`;
for(const addressBookData of addressBookList){
innerHtml = `${innerHtml}
<tr>
<td>${addressBookData._name}</td>
<td>${addressBookData._address}</td>
<td>${addressBookData._city}</td>
<td>${addressBookData._state}</td>
<td>${addressBookData._zip}</td>
<td>${addressBookData._number}</td>
<td>
<img class="delete" id="${addressBookData._id}" onclick="remove(this)" alt="delete" src="delete_icon.jpg">
<img class="edit" id="${addressBookData._id}" onclick="update(this)" alt="edit" src="edit_icon.jpg">
</td>
</tr> 
`;
}
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) =>{
    let addressBookData = addressBookList.find(addressData => addressData._id = node.id);
    if(!addressBookData) return;
    const index = addressBookList
    .map(addressData => addressData._id)
    .indexOf(addressBookData._id);
    addressBookList.splice(index, 1);
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
    document.querySelector(".addressBookCount").textContent = addressBookList.length;
    createInnerHtml();
}
