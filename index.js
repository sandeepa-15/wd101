document.addEventListener('DOMContentLoaded',function() 
{
    const storedEntries = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    displayEntries(storedEntries);
  });
  const currentDate=new Date();
  const minDate=new Date(currentDate);
  minDate.setFullYear(minDate.getFullYear()-55);
  const maxDate=new Date(currentDate);
  maxDate.setFullYear(maxDate.getFullYear()-18);
  const dobInput=document.getElementById('dob');
  dobInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
  dobInput.setAttribute('min', minDate.toISOString().split('T')[0]);
  document.getElementById('registrationForm').addEventListener('submit',function(event) {
    event.preventDefault();
    var name=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var dobInput=document.getElementById('dob').value;
    var acceptedTerms=document.getElementById('terms').checked;
    var currentDate=new Date();
    var inputDate=new Date(dobInput);
    const diff=currentDate - inputDate;
    const age=Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const dobError=document.getElementById('dobError');
    if(age<18 || age>55)
    {
      dobError.textContent='Age between 18 and 55';
      return;
    } 
    else
    {
      dobError.textContent='';
    }
    if(!validateEmail(email)) {
      alert('Enter valid email address');
      return;
    }
    const user={ name, email, password, dobInput, acceptedTerms };
    let storedEntries = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    storedEntries.push(user);
    localStorage.setItem('registeredUsers',JSON.stringify(storedEntries));
    displayEntries(storedEntries);
    document.getElementById('registrationForm').reset();
  });
  function validateEmail(email)
  {
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function displayEntries(entries){
    const tableBody=document.getElementById('userTableBody');
    tableBody.innerHTML='';
    entries.forEach(entry => {
      const row=tableBody.insertRow();
      const rowData=[entry.name,entry.email,entry.password,entry.dobInput,entry.acceptedTerms ? 'true' : 'false'];
      rowData.forEach((data,index) => {
        const cell=row.insertCell(index);
        cell.textContent=data;
      });
    });
  }
