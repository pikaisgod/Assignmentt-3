const employees = [];

document.getElementById('addEmployeeBtn').addEventListener('click', () => {
  addEmployee();
});

function addEmployee() {
  const firstName = prompt('Enter first name:');
  if (!firstName) return;

  const lastName = prompt('Enter last name:');
  if (!lastName) return;

  const salary = prompt('Enter salary:');
  if (!salary || isNaN(salary)) return alert('Please enter a valid salary.');

  // Add the new employee
  employees.push({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    salary: parseFloat(salary)
  });

  const shouldContinue = confirm('Do you want to add another employee?');
  if (shouldContinue) {
    addEmployee();
  } else {
    displayEmployees();
    logAggregatedData();
  }
}

function displayEmployees() {
  // Sort employees by last name
  employees.sort((a, b) => a.lastName.localeCompare(b.lastName));

  const employeeTableBody = document.querySelector('#employeeTable tbody');
  employeeTableBody.innerHTML = ''; // Clear the table

  // Populate the table with sorted employee data
  employees.forEach(employee => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>$${employee.salary.toFixed(2)}</td>
    `;
    employeeTableBody.appendChild(row);
  });
}

function logAggregatedData() {
  const totalEmployees = employees.length;
  const totalPayroll = employees.reduce((sum, employee) => sum + employee.salary, 0);
  const averageSalary = totalEmployees > 0 ? (totalPayroll / totalEmployees) : 0;

  console.log('Total Employees:', totalEmployees);
  console.log('Total Payroll: $', totalPayroll.toFixed(2));
  console.log('Average Salary: $', averageSalary.toFixed(2));
}
