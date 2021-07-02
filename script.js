//Функция, которая преобразовывает двоичноу число в десятичное
function bin2dec(bin) {
  return parseInt(bin, 2).toString(10);
}

//Функция для добавления новой строки
function addRow(table) {
  let input = document.querySelector('.new-number');
  let inputValue = input.value;
  let row = document.createElement('TR');

  // Добавляем ячейки с для ввода бинарного числа
  for(let i = 0; i < inputValue.length; i++) {
    let td = document.createElement('TD');
    td.appendChild(document.createTextNode(inputValue[i]));
    row.appendChild(td).classList.add('bite__bit');
    addInput(td);
  }

  // Добавляем ячейку для десятичного значения
  let tdTen = document.createElement('TD')
  tdTen.appendChild(document.createTextNode(bin2dec(inputValue)));
  row.appendChild(tdTen).classList.add('bite__decimal');
  table.appendChild(row).classList.add('bite');
  coloredRow(row, bin2dec(inputValue));
}

//Вызов функции addRow при клике на кнопку "Добавить строку"
let table = document.querySelector("#table");
let buttonAddRow = document.querySelector(".add-row");
buttonAddRow.addEventListener("click", () => addRow(table));

//Функция для удаления последней строки
function removeRow() {
  let ells = document.querySelectorAll('.bite'); // все строки
  let ell = ells[ells.length - 1];
  ell.parentElement.removeChild(ell);
}

////Вызов функции removeRow при клике на кнопку "Удалить строку"
let buttonRemoveRow = document.querySelector(".remove-row");
buttonRemoveRow.addEventListener("click", () => removeRow());

//Добавление input на ячейки, для редактирования двоичного числа
function addInput(bit) {
    bit.addEventListener('click', function func() {
        var input = document.createElement('input'); //создаем input на ячейку
        input.type = 'number';
        input.min = 0;
        input.max = 1;
        input.value = this.innerHTML;
        this.innerHTML = '';
        this.appendChild(input);
  
        let bit = this; //меняем контекст 
        input.addEventListener('blur', function() { //действия при потере фокуса
            bit.innerHTML = this.value;
            bit.addEventListener('click', func)
        })
        this.removeEventListener('click', func); //отвязываем анонимную функцию, чтобы срабатывал повторний клик 
  
        input.addEventListener("change", () => {
          let parentRow = bit.parentElement; // находим родительскую строку
          let cells = parentRow.querySelectorAll(".bite__bit"); // находим все ячейки в род. строке
          let cellDecimal = parentRow.querySelector(".bite__decimal"); // находим ячейку для десятичноно числа
          let biteValue = ''; // строка с двоичным значением
          for(let i = 0; i < cells.length; i++) {
            if (cells[i].querySelector("input")) {
              biteValue += input.value;
            } else {
              biteValue += cells[i].innerText;
            }
          }
          cellDecimal.innerText = bin2dec(biteValue);
          coloredRow(parentRow, bin2dec(biteValue));
        });
        
    });
}

//Добавляем input на ячейки, которые были в разметке
let bits = document.querySelectorAll('.bite__bit');
for (let i = 0; i < bits.length; i++) {
  addInput(bits[i]);
}

//Функция, которая меняет цвет строк
function coloredRow(row, decValue) {
  row.classList.remove("green", "yellow", "red");
  if (decValue < 50) {
    row.classList.add("green");
  } else {
    if ( (50 <= decValue) && (decValue < 100)) {
      row.classList.add("yellow");
    } else {
      if ( 100 <= decValue) {
        row.classList.add("red");
      }
    }
  }
}

//Валидация
let newNumberInput = document.querySelector('.new-number');
newNumberInput.addEventListener('input', () => {
  const valueLength = document.querySelector('.new-number').value.length;
  if (valueLength !== 8) {
    newNumberInput.setCustomValidity('Бинарное число содержит 8 символов');
  } else {
    newNumberInput.setCustomValidity('');
  } 
})