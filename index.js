const formId = 'save-later-form';
const url = location.href;
const formIdentifier = `${url} ${formId}`;
const saveButton = document.querySelector('#save');
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
  const message = 'Form draft has been saved!';
  displayAlert(message);
};

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
