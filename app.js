document.addEventListener('DOMContentLoaded', function () {
  const expenseForm = document.getElementById('expenseForm');
  const expenseList = document.getElementById('expenseList');

  // Load expenses from local storage
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Function to render expenses
  function renderExpenses() {
      expenseList.innerHTML = '';
      expenses.forEach((expense, index) => {
          const li = document.createElement('li');
          li.innerHTML = `
              <span>${expense.description}</span>
              <span>Rs${expense.amount}</span>
              <button onclick="editExpense(${index})">Edit</button>
              <button onclick="deleteExpense(${index})">Delete</button>
          `;
          expenseList.appendChild(li);
      });
  }

  // Function to add an expense
  function addExpense(description, amount) {
      const newExpense = { description, amount };
      expenses.push(newExpense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
      expenseForm.reset();
  }

  // Function to edit an expense
  window.editExpense = function (index) {
      const updatedDescription = prompt('Enter updated description:');
      const updatedAmount = prompt('Enter updated amount:');
      expenses[index] = { description: updatedDescription, amount: updatedAmount };
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
  };

  // Function to delete an expense
  window.deleteExpense = function (index) {
      expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
  };

  // Event listener for form submission
  expenseForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const description = document.getElementById('description').value;
      const amount = document.getElementById('amount').value;
      addExpense(description, amount);
  });

  renderExpenses();
});
