import Income from "./Income";

class Budget {
  constructor() {
    this.expenses = [];
    this.incomes = [];
    this.totalExpenses = 0;
    this.totalIncomes = 0;
    this.total = 0;
  }

  addItem(type, description, value) {

    if (type === "inc") {
      const inc = new Income(1, description, value);
      this.incomes.push(inc);
    } else if (type === "exp") {
      // HW
    } else {
      console.log("Wrong type!!!");
    }
    
  }

  deleteItems() {
    // HW
  }

  calculateBudget() {
    //HW
  }
}
export default Budget;