/**
 * import style
*/
import "../styles/index.scss";

/**
 * Income
*/
class Income {
  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = Number(value);
  }
}

/**
 * Expense
*/
class Expense {
  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = Number(value);
  }
  
}

/**
 * calculateId
 * calculateMoney
*/
const calculateId = (array) => array.length + 1;

const calculateMoney = (array) => {
  return array.reduce((sum, item) => sum + item.value, 0);
};

/**
 * Budget
*/
class Budget {
  constructor() {
    this.expenses = [];
    this.incomes = [];
    this.totalExpenses = 0;
    this.totalIncomes = 0;
    this.total = 0;
  }

  addItem(type, description, value) {
    let item;
    if (type === "inc") {
      item = new Income(calculateId(this.incomes), description, value);
      this.incomes.push(item);
      View.addListItem(type, calculateId(this.incomes), description, value);
    } else if (type === "exp") {
      item = new Expense(calculateId(this.expenses), description, value);
      this.expenses.push(item);
      View.addListItem(type, calculateId(this.expenses), description, value);
    } else {
      console.log("Wrong type!!!");
    }

    this.calculateBudget();
    return item;
  }

  deleteItems(type, id) {
    if (type === "inc") {
      this.incomes = this.incomes.filter(item => item.id === id);
      // View.deleteListItem(id);
    } else if (type === "exp") {
      this.expenses = this.expenses.filter(item => item.id === id);
      // View.deleteListItem(id);
    } else {
      console.log("Wrong type!!!");
    }
    this.calculateBudget();
  }

  calculateBudget() {
    this.totalIncomes = calculateMoney(this.incomes);
    this.totalExpenses = calculateMoney(this.expenses);
    this.total = this.totalIncomes - this.totalExpenses;
  }

  getBudget() {
    return {
      total: this.total,
      totalExpenses: this.totalExpenses,
      totalIncomes: this.totalIncomes,
    };
  }
}

/**
 * DOM_ELEMENTS
*/
const DOM_ELEMENTS = {
  inputType: ".budget__form__select",
  inputDescription: ".budget__form__input-description",
  inputValue: ".budget__form__input-value",
  inputPercent: "report-tbody__percent span",
  submitBtn: ".budget__form__button",
  incomesContainer: ".report-tbody__income",
  expensesContainer: ".report-tbody__expenses",
  budgetLabel: ".budget-current",
  incomeLabel: ".recent-reports__income .recent-reports",
  expensesLabel: ".recent-reports__expenses .recent-reports",
  mouthItem: ".budget__information span",
  deleteButton: ".report-tbody__delete i",
  
};

/**
 * View
*/
class View {
  static getInputData() {
    return {
      type: document.querySelector(DOM_ELEMENTS.inputType).value,
      description: document.querySelector(DOM_ELEMENTS.inputDescription).value,
      value: document.querySelector(DOM_ELEMENTS.inputValue).value
    };
  }

  static addListItem(type, id, description, value) {
    let listBody;
    
    if (type === "inc") {
      listBody = document.querySelector(DOM_ELEMENTS.incomesContainer);
    } else if (type === "exp") {
      listBody = document.querySelector(DOM_ELEMENTS.expensesContainer);
    } else {
      console.log("Wrong type!!!");
    }

    const listContent = document.createElement("tr");
    
    listContent.className = "report-tbody__item";
    listContent.dataset.id = id;

    listContent.innerHTML = `
    <td class="report-tbody__description">${description}</td>
      <td class="report-tbody__quantity">${value}</td>
      <td class="report-tbody__percent">
        <span>+40%</span>
      </td>
      <td class="report-tbody__delete">
        <i class="fas fa-trash-alt"></i>
      </td>`;
      
    listBody.insertBefore(listContent, listBody.children[0]);
  }

  // static deleteListItem(id) {
  //   const listElement = document.querySelector(".report-tbody__item");
  //   listElement.dataset.id = id;
  //   console.log(listElement);
  //   document.querySelector(DOM_ELEMENTS.incomesContainer).removeChild(listElement);

  // }

  static displayBudget(data = {}) {
    const { titalExpenses = 0, totalIncomes = 0, total = 0 } = data;

    document.querySelector(DOM_ELEMENTS.budgetLabel).innerHTML = total;
    document.querySelector(DOM_ELEMENTS.incomeLabel).innerHTML = totalIncomes;
    document.querySelector(DOM_ELEMENTS.expensesLabel).innerHTML = titalExpenses;

  }
}

/**
 * Application
*/
class Application {
  constructor() {
    this.budget = new Budget();
  }

  init() {
    
    View.displayBudget();

    this.generateMonth();

    this.setupEventListeners(); 

    // this.deleteEventListeners();  

  }

  generateMonth() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const currentDate = new Date();
    const currentMouth = currentDate.getMonth();
    document.querySelector(DOM_ELEMENTS.mouthItem).innerHTML = monthNames[currentMouth];
  }

  setupEventListeners() {
    document.querySelector(DOM_ELEMENTS.submitBtn).addEventListener("click", () => {

      this.addItem();

    });
  
  }

  // deleteEventListeners() {
  //   console.log(document.querySelector(DOM_ELEMENTS.deleteButton).parentNode);
  //   console.log(document.querySelectorAll(DOM_ELEMENTS.deleteButton));

  //   document.querySelector(DOM_ELEMENTS.deleteButton).addEventListener("click", () => {

  //     // View.deleteListItem();
  //     // deleteItems();


  //     // const listElement = document.querySelector(".report-tbody__item").parentNode;
  //     const listElement = document.querySelector(DOM_ELEMENTS.deleteButton).parentNode.parentNode;

  //     // listElement.dataset.id = DOM_ELEMENTS.deleteButton.parentNode.parentNode;
  //     console.log(listElement);
  //     document.querySelector(DOM_ELEMENTS.incomesContainer).removeChild(listElement);

  //   });
  // }

  // removeItem(event){
  //   const buttonParent = event.target.parentNode;
  //   const iconParent = button.inputPercent;

  //   if(buttonParent.dataset.id || iconParent.dataset.id){

  //   }
  // }

  addItem() {
    const inputData = View.getInputData();
    const { type, description, value } = inputData;
    const idValid = this.validateUserData(inputData);

    if (idValid) {this.budget.addItem(type, description, value);
      View.displayBudget({
        titalExpenses: this.budget.totalExpenses, 
        totalIncomes: this.budget.totalIncomes, 
        total: this.budget.total
      });
    } else {
      console.log("no valid");
    }
  }
  validateUserData() {
    let strDescription = document.querySelector(DOM_ELEMENTS.inputDescription); 
    let strNumber = document.querySelector(DOM_ELEMENTS.inputValue);

    const remove = (el) => el.classList.remove("form__input__error");
    const add = (el) => el.classList.add("form__input__error");
    
    if(strNumber.value.search(/^\d+$/) == 0 && strDescription.value.search(/^\s*$/) == -1){
      remove(strNumber);
      remove(strDescription);
      strNumber.value = "";
      strDescription.value = "";
      return true;
    } else if(strNumber.value.search(/^\d+$/) == -1 && strDescription.value.search(/^\s*$/) == -1){
      add(strNumber);
      remove(strDescription);
      return false;
    } else if(strNumber.value.search(/^\d+$/) == 0 && strDescription.value.search(/^\s*$/) == 0){
      remove(strNumber);
      add(strDescription);
      return false;
    } else if(strNumber.value.search(/^\d+$/) == -1 && strDescription.value.search(/^\s*$/) == 0){
      add(strNumber);
      add(strDescription);
      return false;
    }
  }

}

const app = new Application();

/**
 * init budget
*/
app.init();