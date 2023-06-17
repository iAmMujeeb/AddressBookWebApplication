class AddressBookData {
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw 'Name is Incorrect';
    }

    get address() {
        return this._address;
    }
    set address(address) {
        let addressRegex = RegExp('^([a-zA-Z]{3,})[ ]([a-zA-Z]{3,})[ ]([a-zA-Z]{3,})$');
        if (addressRegex.test(address)) {
            this._address = address;
        }
        else throw 'Address is Incorrect';
    }

    get number() {
        return this._number;
    }
    set number(number) {
        let numberRegex = RegExp('^[+]91[0-9]{10}$');
        if (numberRegex.test(number)) {
            this._number = number;
        }
        else throw 'Number is Incorrect';
    }

    get city() {
        return this._city;
    }
    set city(city) {
        this._city = city;
    }

    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }

    get zip() {
        return this._zip;
    }
    set zip(zip) {
        this._zip = zip;
    }

    toString() {
        return "id = " + this._id + ",name = " + this._name + ",Address = " + this._address + ",Number = " + this._number + ",City = " + this._city + ",State = " + this._state + ",Zip = " + this._zip;
    }

}

let isUpdate = false;
let addressBookObj = {};

window.addEventListener('DOMContentLoaded', () => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).name = name.value;;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    // window.addEventListener('DOMContentLoaded', () => {
    const address = document.querySelector('#address');
    // const textError = document.querySelector('.text-error');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).address = address.value;;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    // window.addEventListener('DOMContentLoaded', () => {
    const number = document.querySelector('#phNum');
    // const textError = document.querySelector('.text-error');
    number.addEventListener('input', function () {
        if (number.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).number = number.value;;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    checkForUpdate();

});

const save = (event) => {
    event.preventDefault();
    event.stopPropogation();
    try {
        setAddressBookObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        return;
    }
}

const setAddressBookObject = () => {
    addressBookObj._name = getInputValueById('#name')
    addressBookObj._address = getInputValueById('#address')
    addressBookObj._number = getInputValueById('#number')
    addressBookObj._city = getInputValueById('#city')
    addressBookObj._state = getInputValueById('#state')
    addressBookObj._zip = getInputValueById('#zip')
}

const createAddressBook = () => {
    let addressBookData = new AddressBookData();
    try {
        addressBookData.name = getInputValueById('name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    addressBookData.address = getInputValueById('#address');
    addressBookData.address = getInputValueById('#number');
    addressBookData.address = getInputValueById('#city');
    addressBookData.address = getInputValueById('#state');
    addressBookData.address = getInputValueById('#zip');
    alert(addressBookData.toString());
    return addressBookData;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const createAndUpdateStorage = () => {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));

    if (addressBookList) {
        let addressBookData = addressBookList.find(addressData => addressData._id == addressBookObj._id);
        if (!addressBookData) {
            addressBookList.push(createAddressBookData());
        } else {
            const index = addressBookList
                .map(addressData => addressData._id)
                .indexOf(addressBookData._id);
            addressBookList.splice(index, 1, createAddressBookData.(addressBookData._id));
        }
    } else {
        addressBookList = [createAddressBookData()]
    }
    alert(addressBookList.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList))
}

const createAddressBookData = (id) => {
    let addressBookData = new AddressBookData();
    if (!id) addressBookData.id = createNewAddressI();
    else addressBookData.id = id;
    setAddressBookData(addressBookData);
    return addressBookData;
}

const setAddressBookData = (addressBookData) => {
    try {
        addressBookData.name = addressBookObj._name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    try {
        addressBookData._address = addressBookObj.__address;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    try {
        addressBookData._number = addressBookObj.__number;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    addressBookData.city = addressBookObj._city;
    addressBookData.state = addressBookObj._state;
    addressBookData.zip = addressBookObj._zip;
}

const createNewAddressId = () => {
    let addressId = localStorage.getItem("AddressID");
    addressId = !addressId ? 1 : (parseInt(addressId) + 1).toString();
    localStorage.setItem("AddressID", addressId);
    return addressId;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
}

const resetForm = () => {
    setValue('#name', '');
    setValue('#address', '');
    setValue('#number', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zip', '');
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem('editAddress');
    isUpdate = addressBookJson ? true : false;
    if (!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJson);
    setForm();
}

const setForm = () => {
    setValue('#name', addressBookObj._name);
    setValue('#address', addressBookObj._address);
    setValue('#number', addressBookObj._number);
    setValue('#city', addressBookObj._city);
    setValue('#state', addressBookObj._state);
    setValue('#zip', addressBookObj._zip);
}