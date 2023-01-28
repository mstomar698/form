const formId = 'save-later-form';
const url = location.href;
const formIdentifier = `${url} ${formId}`;
const saveButton = document.querySelector('#save');
const deleteButton = document.querySelector('#delete');
const searchButton = document.querySelector('#search');
// const sortButton = document.querySelector('#sort');
const alertBox = document.querySelector('.alert');
let form = document.querySelector(`#${formId}`);
let formElements = form.elements;

/**
 * This function gets the values in the form
 * and returns them as an object with the
 * [formIdentifier] as the object key
 * @returns {Object}
 */
const getFormData = () => {
  let data = { [formIdentifier]: {} };
  for (const element of formElements) {
    if (element.name.length > 0) {
      data[formIdentifier][element.name] = element.value;
    }
  }
  return data;
};

saveButton.onclick = (event) => {
  event.preventDefault();
  data = getFormData();
  localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier]));
  localStorage.setItem('tableIdentifier', JSON.stringify(data));
  const message = 'Form draft has been saved!';
  displayAlert(message);
  populateTable();
};

deleteButton.onclick = (event) => {
  event.preventDefault();
  localStorage.clear();
  const message = 'Data from table has been deleted!';
  displayAlert(message);
  console.log(localStorage);
};

searchButton.onclick = (event) => {
  event.preventDefault();
  var searchQuery = document.getElementById('myText').value;
  if (localStorage.key(formIdentifier)) {
    const savedData = JSON.parse(localStorage.getItem(formIdentifier));
    const first_name_expecting = savedData.first_name;
    function print() {
      var keys = Object.keys(savedData);
      for (var i = 0; i < keys.length; i++) {
        let objectArray = [
          savedData[keys[0]],
          savedData[keys[1]],
          savedData[keys[2]],
        ];
        return objectArray;
      }
    }
    console.log(searchQuery);
    console.log(first_name_expecting);
    if (searchQuery === first_name_expecting) {
      document.getElementById('searchResult').innerHTML = print() || '';
      const message = 'Searched User Found!!!';
      displayAlert(message);
    } else {
      document.getElementById('searchResult').innerHTML = 'No User Found';
      const message = 'Searched User not Found!!!';
      displayAlert(message);
    }
  }
};

function SortLocalStorage() {
  console.log('sorted');
  if (localStorage.key(formIdentifier)) {
    let localStorageArray = new Array();
    for (i = 0; i < localStorage.length; i++) {
      localStorageArray[i] =
        localStorage.key(i) + localStorage.getItem(localStorage.key(i));
    }
    var sortedArray = localStorageArray.sort();
    console.log(sortedArray);
    const message = 'Sorted Array in localStorage based on first_name!!!';
    displayAlert(message);
  }
  return sortedArray;
}

/**
 * This function displays a message
 * on the page for 1 second
 *
 * @param {String} message
 */
const displayAlert = (message) => {
  alertBox.innerText = message;
  alertBox.style.display = 'block';
  setTimeout(function () {
    alertBox.style.display = 'none';
  }, 5000);
};

const populateForm = () => {
  if (localStorage.key(formIdentifier)) {
    const savedData = JSON.parse(localStorage.getItem(formIdentifier));
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }

    const message = 'Form has been refilled with saved data!';
    displayAlert(message);
  }
};

const populateTable = () => {
  console.log('table populated');
  var demoObject = [
    { first_name: 'James, holand', phone: '1234567890' },
    { first_name: 'esim, heroku', phone: '1234567890' },
    { first_name: 'heli, grmal', phone: '1234567890' },
    { first_name: 'gwan, pill', phone: '1234567890' },
    { first_name: 'dirt, circ', phone: '1234567890' },
  ];
  localStorage.setItem('demoFormData', JSON.stringify(demoObject));

  const demoStoredData = JSON.parse(localStorage.getItem('demoFormData'));
  const savedData = JSON.parse(localStorage.getItem(formIdentifier));
  function name() {
    var keys = Object.keys(savedData);
    for (var i = 0; i < keys.length; i++) {
      let objectArray = [savedData[keys[0]], savedData[keys[1]]];
      return objectArray;
    }
  }
  var tr = '<tr>';
  var td = '<td>';
  var HTML =
    tr +
    '<td>2</td>' +
    td +
    name() +
    '</td>' +
    td +
    savedData.phone +
    '</td>' +
    td +
    '<button type="submit" id="delete">❌</button>' +
    '</td></tr>';

  var t = document.getElementById('table_body');
  t.innerHTML = HTML;
  var tbody = document.getElementById('table_body');
  tr +=
    '<td>3</td>' +
    td +
    demoStoredData[0].first_name +
    '</td>' +
    td +
    demoStoredData[0].phone +
    '</td>' +
    td +
    '<button type="submit" id="delete">❌</button>' +
    '</td>' +
    '</td></tr>';
  tr +=
    '<td>4</td>' +
    td +
    demoStoredData[1].first_name +
    '</td>' +
    td +
    demoStoredData[1].phone +
    '</td>' +
    td +
    '<button type="submit" id="delete">❌</button>' +
    '</td>' +
    '</td></tr>';
  tr +=
    '<td>5</td>' +
    td +
    demoStoredData[2].first_name +
    '</td>' +
    td +
    demoStoredData[2].phone +
    '</td>' +
    td +
    '<button type="submit" id="delete">❌</button>' +
    '</td>' +
    '</td></tr>';
  tr +=
    '<td>6</td>' +
    td +
    demoStoredData[3].first_name +
    '</td>' +
    td +
    demoStoredData[3].phone +
    '</td>' +
    td +
    '<button type="submit" id="delete">❌</button>' +
    '</td>' +
    '</td></tr>';
  tr +=
    '<td>7</td>' +
    td +
    demoStoredData[4].first_name +
    '</td>' +
    td +
    demoStoredData[4].phone +
    '</td>' +
    td +
    '<button type="submit" id="delete">❌</button>' +
    '</td>' +
    '</td></tr>';
  tbody.innerHTML += tr;
  const message = 'Table has been populated with formData and demoData!!';
  displayAlert(message);
};

document.onload = populateForm();
document.onload = populateTable();
