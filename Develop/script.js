// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
  // TODO: Get user input to create and return an array of employee objects
  const employees = []; //array to store employee objects

  //prompt the user
  while (true) {
    const firstName = prompt("Enter employee first name:");
    const lastName = prompt("Enter employee last name:");
    const salaryStr = prompt("Enter employee salary:");

    //check if prompts were canceled
    if (firstName === null || lastName === null || salaryStr === null) {
      break; //exit loop if any prompt was cancelled
    }

    // Convert salary string to number
    let salary = parseFloat(salaryStr.replace(/[^\d.-]/g, ''));

    // Check if salary is a valid number
    if (!isNaN(salary)) {
      // Create employee object and add it to the array
      const employee = { firstName, lastName, salary };
      employees.push(employee);
    } else {
      alert("Invalid salary. Please enter a valid number.");
    }
    
    //ask user if they want to add another employee
    const addAnotherEmployee = confirm("Do you want to add another employee?");
    if (!addAnotherEmployee) {
      break; // Exit the loop if the user does not want to add another employee
    }
  }
  return employees;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
   
  // Check if the employees array is empty
   if (employeesArray.length === 0) {
    console.log('No employees to select from.');
    return;
  }

  //find total salary
  let totalSalary = 0
  for (let i = 0; i < employeesArray.length; i++) {
    totalSalary += employeesArray[i].salary;
  }

  //calculate avg sal
  const avgSalary = totalSalary / employeesArray.length;

  //log average salary
  console.log(`The average employee salary between our ${employeesArray.length} employees is:`, avgSalary.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  }),'!');
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
    
  // Check if the employees array is empty
    if (employeesArray.length === 0) {
      console.log('No employees to select from.');
      return;
    }
  
    // Generate a random index within the range of the employees array
    const randomIndex = Math.floor(Math.random() * employeesArray.length);
  
    // Get the random employee object
    const randomEmployee = employeesArray[randomIndex];
  
    // Log the random employee's data
    console.log('Random Employee:', randomEmployee.firstName, randomEmployee.lastName,"'s salary is", randomEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    }));
  }

  // Sort the employees alphabetically by last name
  const sortEmployeesByName = function(employeesArray) {
    return employeesArray.sort(function(a, b) {
    
      // Convert last names to lowercase for case-insensitive sorting
      const lastNameA = a.lastName.toLowerCase();
      const lastNameB = b.lastName.toLowerCase();

      if (lastNameA < lastNameB) {
        return -1;
      }
      if (lastNameA > lastNameB) {
        return 1;
      }
     
      // If last names are equal, compare first names
      const firstNameA = a.firstName.toLowerCase();
      const firstNameB = b.firstName.toLowerCase();
      if (firstNameA < firstNameB) {
        return -1;
     }
      if (firstNameA > firstNameB) {
        return 1;
     }
    // If both first and last names are equal
    return 0; 
   });
  }

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
