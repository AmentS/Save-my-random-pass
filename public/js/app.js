const result = document.getElementById('result');
const length = document.getElementById('length');
const upperC = document.getElementById('uppercase');
const lowerC = document.getElementById('lowercase');
const number = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generate = document.getElementById('generate');
const clipBoard = document.getElementById('clipboard');


const randomFunct = {
    lower: getRandomLower,
    upper: getRandomUpper,
    symbol: getRandomSymbol,
    num: getRandomNumber
}

//Generate event
generate.addEventListener('click', () => {
    const len = +length.value; //ovaj plus pretvara string u int
    const hasLower = lowerC.checked;
    const hasUpper = upperC.checked;
    const hasNum = number.checked;
    const hasSymb = symbols.checked;

    result.value = generatePassword(hasLower, hasUpper, hasNum, hasSymb, len);
});

//Generate Password
function generatePassword(lower, upper, num, symbol, len) {

    let generatedPass = '';
    const typesCount = lower + upper + num + symbol;

    const typeArr = [{lower}, {upper}, {num}, {symbol}] // zelimo objekte a lower upper num i sum zelimo kao kljuceve
        .filter(item => Object.values(item)[0]); //zato cemo njih staviti izmedju {}


    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < len; i += typesCount) {

        typeArr.forEach(type => {
            const functName = Object.keys(type)[0]; //ovo pretvara u kljuceve da bi te kljuceve mogli da iskoristimo u randomFunck
                                                    //kao njene kljuceve
            generatedPass += randomFunct[functName]();

        })
    }


    const finalPassword = generatedPass.slice(0, len); //odje kidamo passvord od pocetka pa do len, tj duzine koju smo unijeli
    return finalPassword;

}

//Copy password to clipboard
clipBoard.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = result.value; //sa innerText-om mozemo uzeti iz polja am ozemo i staviti

    if (!password) {
        return;
    }

    textArea.value = password;

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password coppied to clipboard');

})


function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase();
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*()_+';
    return symbols[Math.floor(Math.random() * symbols.length)];
}


//save to database
document.getElementById('save').addEventListener('click', () => {
    var webName = document.getElementById('web-site').value;
    var pass = result.value;
    if (webName === '' && pass !== '') {
        error('webName');
        return;
    } else if (pass === '' && webName !== '') {
        error('pass');
        return;
    } else if (webName === '' && pass === '') {
        error();
        return;
    }

    var pram = `name=${webName}&pass=${pass}`;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'pass_save_read.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {

        if (this.responseText === 'saved') {
            swal("Successs", "Password successfully added!", "success");
            result.value = '';
            document.getElementById('web-site').value = '';
            instantLoad();
        } else if (this.responseText === 'not_ok') {
            swal("Error", "Website is already saved", "error");
        }

    }
    xhr.send(pram);


})

function error(msg) {
    const div = document.createElement('div');
    div.className = `errorClass`;
    const p = document.createElement('p');
    if (msg === 'webName') {
        p.appendChild(document.createTextNode('Please enter website name'));
    } else if (msg === 'pass') {
        p.appendChild(document.createTextNode('Please generate password'));
    } else {
        p.appendChild(document.createTextNode('Please enter website name and generate password'));
    }
    div.appendChild(p);
    const container = document.querySelector('.container-2-box');
    const label = document.querySelector('#label');
    container.insertBefore(div, label);//da ubacimo div prije lable-a
    setTimeout(() => document.querySelector('.errorClass').remove(), 2000)
}

function instantLoad() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetch_pass.php', true);
    xhr.onload = function () {
        if (this.status === 200) {
            var passwords = JSON.parse(this.responseText);

            var output = '';
            for (var i in passwords) {
                output += `<div class="content">
                                 <input type="text" value="${passwords[i].webname}"  style="margin-left: 1rem"  disabled>
                                 <input type="text" value="${passwords[i].pass}" id="${passwords[i].id}">
                                 <button class="btn-update" style="margin-right: 1rem" 
                                    onclick="updatePass(${passwords[i].webname}, ${passwords[i].pass})">Update</button>
                           </div>`;
            }


            document.getElementById('hidden').innerHTML = output;
        }
    }

    xhr.send();
}

//reading
document.addEventListener('DOMContentLoaded', instantLoad());

function updatePass(id, pass) {

  /*  if (pass === '') {
        Swal.fire({
            icon: 'error',
            title: 'Password missing',
            text: 'Please fill the password field',
        })
        return;
    }*/


    var pram = `name=${web}&pass=${pass}`;
    var xhr = new XMLHttpRequest();
    console.log(pram);
      xhr.open('POST', 'update.php', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onload = function () {

          if (this.responseText === 'password updated') {
              swal("Successs", "Password successfully updated!", "success");
              instantLoad();
          }

      }
      xhr.send(pram);

}

