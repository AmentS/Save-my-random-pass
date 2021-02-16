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

    console.log('Count checked: ', typesCount); // gledamo koliko smo chekovali boksova

    const typeArr = [{lower}, {upper}, {num}, {symbol}] // zelimo objekte a lower upper num i sum zelimo kao kljuceve
        .filter(item => Object.values(item)[0]); //zato cemo njih staviti izmedju {}


    console.log(typeArr);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < len; i += typesCount) {

        typeArr.forEach(type => {
            const functName = Object.keys(type)[0]; //ovo pretvara u kljuceve da bi te kljuceve mogli da iskoristimo u randomFunck
                                                    //kao njene kljuceve
            console.log(functName);
            generatedPass += randomFunct[functName]();

        })
    }


    const finalPassword = generatedPass.slice(0, len); //odje kidamo passvord od pocetka pa do len, tj duzine koju smo unijeli
    return finalPassword;


}

//Copy password to clipboard
clipBoard.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = result.innerText; //sa innerText-om mozemo uzeti iz polja am ozemo i staviti

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