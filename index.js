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
  console.log(localStorage);
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
      console.log(keys);
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
      document.getElementById('searchResult').innerHTML = print();
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
  }, 1000);
};

const populateForm = () => {
  if (localStorage.key(formIdentifier)) {
    const savedData = JSON.parse(localStorage.getItem(formIdentifier));
    console.log(savedData);
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }

    const message = 'Form has been refilled with saved data!';
    displayAlert(message);
    console.log(localStorage);
  }
};

const populateTable = () => {
  console.log('table populated');
  var testObject = [
    { name: 'James', score: 90, time: '16:00' },
    {
      name: 'Robert',
      score: 80,
      time: '15:00',
    },
  ];
  localStorage.setItem('testObject', JSON.stringify(testObject));
  var retrievedObject = JSON.parse(localStorage.getItem('testObject'));
  console.log(retrievedObject);
  var savedData = JSON.parse(localStorage.getItem('tableIdentifier'));
  console.log(savedData);
  var tbody = document.getElementById('table_body');
  for (var i = 0; i < retrievedObject.length; i++) {
    var tr = '<tr>';
    tr += '<td>Name</td>' + '<td>' + retrievedObject[i].name + '</td></tr>';
    tr += '<td>Score</td>' + '<td>' + retrievedObject[i].score + '</td></tr>';
    tr += '<td>Time</td>' + '<td>' + retrievedObject[i].time + '</td></tr>';
    tbody.innerHTML += tr;
  }
};

document.onload = populateForm();

// for creating table

var el_up = document.getElementById('table_creater');
var list = [
  { col_1: 'val_11', col_3: 'val_13' },
  { col_2: 'val_22', col_3: 'val_23' },
  { col_1: 'val_31', col_3: 'val_33' },
];
function constructTable(selector) {
  // Getting the all column names
  var cols = Headers(list, selector);

  // Traversing the JSON data
  for (var i = 0; i < list.length; i++) {
    var row = $('<tr/>');
    for (var colIndex = 0; colIndex < cols.length; colIndex++) {
      var val = list[i][cols[colIndex]];

      // If there is any key, which is matching
      // with the column name
      if (val == null) val = '';
      row.append($('<td/>').html(val));
    }

    // Adding each row to the table
    $(selector).append(row);
  }
}
function Headers(list, selector) {
  var columns = [];
  var header = $('<tr/>');

  for (var i = 0; i < list.length; i++) {
    var row = list[i];

    for (var k in row) {
      if ($.inArray(k, columns) == -1) {
        columns.push(k);

        // Creating the header
        header.append($('<th/>').html(k));
      }
    }
  }

  // Appending the header to the table
  $(selector).append(header);
  return columns;
}
