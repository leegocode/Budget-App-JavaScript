const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");


const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

// INPUT BTS
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");


let ENTRY_LIST;

ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
update();



let balance = 0,income = 0,outcome = 0;
const DELETE = "delete",
  EDIT = "edit";

incomeBtn.addEventListener('click', function() {
  show(incomeEl);
  hide([expenseEl, allEl]);
  active(incomeBtn);
  inactive([expenseBtn, allBtn]);
})

allBtn.addEventListener('click', function() {
  show(allEl)
  hide([expenseEl, incomeEl]);
  active(allBtn);
  inactive([expenseBtn, incomeBtn]);
})


expenseBtn.addEventListener('click', function() {
  show(expenseEl);
  hide([incomeEl, allEl]);
  active(expenseBtn);
  inactive([incomeBtn, allBtn]);
})

addExpense.addEventListener('click', function() {
  if (!expenseTitle.value || !expenseAmount.value) return;
  let expense = {
    type: "expense",
    title: expenseTitle.value,
    amount: parseFloat(expenseAmount.value)
  }
  ENTRY_LIST.push(expense);
  update();
  clearInput([expenseTitle, expenseAmount]);
  localStorage.setItem("entry_list",JSON.stringify(ENTRY_LIST));

});

addIncome.addEventListener('click', function() {
  if (!incomeTitle.value || !incomeAmount.value) return;
  let income = {
    type: "income",
    title: incomeTitle.value,
    amount: parseFloat(incomeAmount.value)
  }
  ENTRY_LIST.push(income);
  update();
  clearInput([incomeTitle, incomeAmount]);
  localStorage.setItem("entry_list",JSON.stringify(ENTRY_LIST));

});


incomeList.addEventListener('click', deleteOrEdit)
expenseList.addEventListener('click', deleteOrEdit)
allList.addEventListener('click', deleteOrEdit)

function deleteOrEdit(event){
  const targetBtn = event.target;
  const entry = targetBtn.parentNode;
  if(targetBtn.id == DELETE){
    deleteEntry(entry);

  }else if(targetBtn.id == EDIT){
    editEntry(entry);
  }

}

function deleteEntry(entry){
  ENTRY_LIST.splice( entry.id, 1);
  update();
}

function editEntry(entry){
  let ENTRY= ENTRY_LIST[entry.id]
  if(ENTRY.type == "income"){
    incomeAmount.value = ENTRY.amount;
    incomeTitle.value = ENTRY.title;
  } else if(ENTRY.type =="expense"){
    expenseAmount.value = ENTRY.amount;
    expenseTitle.value = ENTRY.title;
  }
  deleteEntry(entry);

}

function update() {
  var income = calculateTotal("income", ENTRY_LIST);
  var outcome = calculateTotal("expense", ENTRY_LIST);
  var balance = Math.abs(calculateBalance(income, outcome));


  let sign = (income >= outcome) ? "$" : "-$";

  balanceEl.innerHTML = `<small> ${sign}</small>${balance}`;
  outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;
  incomeTotalEl.innerHTML = `<small>$</small>${income}`;

  clearElement([expenseList, incomeList, allList]);

  ENTRY_LIST.forEach((entry, index) => {
    if (entry.type == "expense") {
      showEntry(expenseList, entry.type, entry.title, entry.amount, index)
    } else if (entry.type == "income") {
      showEntry(incomeList, entry.type, entry.title, entry.amount, index)
    }
    showEntry(allList, entry.type, entry.title, entry.amount, index)
  });
  updateChart(income,outcome);


}

function showEntry(list, type, title, amount, id) {
  const entry = `<li id = "${id}" class="${type}">
                  <div class="entry">${title}: $${amount}</div>
                  <div id="edit"></div>
                  <div id="delete"></div>
                  </li>`;
  const position = "afterbegin";
  list.insertAdjacentHTML(position, entry);
}




function clearElement(entrys) {
  entrys.forEach(entry => {
    entry.innerHTML = "";
  });
}



function calculateBalance(income, outcome) {
  return income - outcome;
}

function calculateTotal(type, list) {
  let sum = 0;
  list.forEach(item => {
    if (item.type == type) {
      sum += item.amount;

    }

  });
  return sum;

}



function clearInput(inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}



function show(element) {
  element.classList.remove('hide');
}

function hide(elements) {
  elements.forEach(element => {
    element.classList.add("hide");
  });
}

function active(element) {
  element.classList.add("active");
}

function inactive(elements) {
  elements.forEach(element => {
    element.classList.remove("active");
  });
}
