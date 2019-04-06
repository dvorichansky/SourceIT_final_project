import Budget from "./Budget";

class Application {
  constructor() {

  }

  init() {
    console.log("Hello my app!");
    const budget = new Budget();
    budget.addItem("inc", "Salary", 100500);
    budget.addItem("inc", "Salary", 100500);
    console.log(budget);
    budget.addItem("exp", "Salary", 100500);
    console.log(budget);
  }
}

const app = new Application();
export default app;