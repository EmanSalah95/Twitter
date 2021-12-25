var req = new XMLHttpRequest();
var url = 'http://localhost:3000';

// Start function to handle sign in and open sign in form in new window
function HandleSign () 
{
    
    location.assign("./twitter-log.html" );
}

// End function to handle sign in and open sign in form in new window

// Start Validate Inputs in login form (Handle Regular Expression in inputs)
function ValidateInput () 
{
    var fieldValue = document.getElementById("input-value") ,
        userName = document.getElementById("user-val") ,
        // fieldValue3 = document.getElementById("input-value").value ,
        // regPhoneNum =  /^(01)[0-2][0-9]{11}$ / ,
        regMail = /^[a-zA-Z]{3,}@[a-zA-Z0-9]{3,}(.com)$/ ,
        regName = /^[a-zA-Z]{3,}@[a-zA-Z]{3,}$/ ,
        regsText = document.getElementById("regs-text") 

    // validate E-mail
    if (regName.test(userName.value) && regMail.test(fieldValue.value) )
    {
        console.log("Name & Mail is Vailed");
        // Store data in Local Storage
        localStorage.setItem ("UserName", userName.value)
        localStorage.setItem ("Email", fieldValue.value)
        return true
    }
    
    else 
    {
        regsText.innerHTML = "Data you enterd not allowed"
        regsText.style.color = "red"
    } 
}
// End Handle Regular Expression in inputs

// Start Validate Inputs in login form (Handle Regular Expression in inputs)
function ValidateSignInInput () 
{
    var phoneValue = document.getElementsByClassName("tel-inp") ,
        userEmail = document.getElementsByClassName("mail-inp") ,
        regPhoneNum =  /^(01)[0-2][0-9]{11}$ / ,
        regMail = /^[a-zA-Z]{3,}@[a-zA-Z0-9]{3,}(.com)$/ ,
        regsText = document.getElementById("rgs-txt") 

    // validate phone
    if (regPhoneNum.test(phoneValue.value) && regMail.test(userEmail.value) )
    {
        console.log("Name & Mail is Vailed");
        // Store data in Local Storage
        // localStorage.setItem ("PhoneNumber", phoneValue.value)
        // localStorage.setItem ("UserEmail", userEmail.value)
    }
    
    else 
    {
        regsText.innerHTML = "Data you enterd not allowed"
        regsText.style.color = "red"
    } 

    
}
// End Handle Regular Expression in inputs

function HandleInput () 
{
    var inp1 = document.getElementsByClassName("forrm-inp") ,
        inp2 = document.getElementsByClassName("forrm-inpp") ;

    inp1.classList.add('active') ;
    inp2.classList.add('active') ;
}

function CompleteSignIn() {
    
    var fieldValue = document.getElementById("input-value").value ,
        usrName = document.getElementById("user-val").value ,
        users = [] ;

    req.open('GET', url + '/users');
    req.send();
    req.onreadystatechange = () => {
      if (req.readyState == 4) {
        if (req.status == 200) {
          users = JSON.parse(req.responseText);
          console.log(users);
          for (var i =0 ; i < users.length ;  i++) {
                if (fieldValue == users[i].email && usrName == users[i].userName)
                {
                    // window.open("https://fontawesome.com/v5.15/icons/times?style=solid" , "_self")
                    
                    console.log("founded user", users[i].id);
                    HamndleStoreData(users[i].id);
                    location.assign('../index.html');
                    // localStorage.setItem ("currentUser", users[i].id)
                    break ;
                }

                else 
                {
                    console.log("UserName Or E-mail you enterd not allowed")
                }          
            }
        }
      }
    };
  }

// End Handle Request and sign in

// Start Handle Store data in local or session Storage
function HamndleStoreData (userId)
{
    var checkboxInpVal = document.getElementById ("checkbox-inp");
    console.log("is checked ?",checkboxInpVal.checked);
    if (checkboxInpVal.checked)
            {
                localStorage.setItem ("currentUser", userId);
                sessionStorage.clear();
                console.log("user ID in local:" + userId);
            }

            else 
            {
                sessionStorage.setItem ("currentUser", userId);
                localStorage.clear();
                console.log("hello session",userId);
            }  
    

} 
// End Handle Store data in local or session Storage


// Start Creating Options in Select element 
function CreateMonthList ()  //Create function to fill month
{
    var monthSelect = document.getElementById("month-select"),
        month =  ["January", "Feburary", "March", "April", "May", "June", "July", "Augest", "Septemper", "October", "November", "December"]
    for (var m = 0; m <= 12; m++) {
        var monthOption = document.createElement("option")
        monthOption.value = month[m].value
        monthOption.innerHTML = month[m]
        monthSelect.appendChild(monthOption)
    }
}

function CreateYearList ()  //Create function to fill month
{
    var yearSelect = document.getElementById("Year-select")
    for (var y = 1900; y < 2021; y++) {
        var yearOption = document.createElement("option")
        yearOption.value = y.value
        yearOption.innerHTML = y
        yearSelect.appendChild(yearOption)
    }
}

function CreateDayList ()  //Create function to fill month
{
    var daySelect = document.getElementById("Day-select")
    for (var d = 1; d <= 31; d++) {
        var dayOption = document.createElement("option")
        dayOption.value = d.value
        dayOption.innerHTML = d
        daySelect.appendChild(dayOption)
    }
}
// End Creating Options in Select element 
