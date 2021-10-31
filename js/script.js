//GLOBAL VARIABLES

const inputBillElement = document.getElementById('input-bill');
const tipElement = document.querySelectorAll('.tip-percent');
const tipParentElement = document.querySelector('.data-input__tips');
const tipChildrenElements = tipParentElement.children;
const tipPercentCustomElement = document.getElementById('tip-percent-custom');
const numberOfPeopleElement = document.getElementById('number-of-people');
const tipPerPersonElement = document.getElementById('tip-per-person');
const totalPerPersonElement = document.getElementById('total-per-person');
const clearStorage = document.getElementById('clear-storage');

//CODE...

tipElement.forEach(getTipPercent);
inputBillElement.addEventListener('input',billAmount);
tipPercentCustomElement.addEventListener('input',customPercentage)
numberOfPeopleElement.addEventListener('input',numberPeople);
clearStorage.addEventListener('click',clearLocalStorage);

//FUNCTIONS

function billAmount () {
    const billAmount = inputBillElement.value;
    localStorage.setItem('bill',billAmount);
    calculateTip();
}

function customPercentage() {
    const customPercent = tipPercentCustomElement.value / 100;
    localStorage.setItem('tip',customPercent);
    calculateTip();
}

function getTipPercent(tip){
    tip.addEventListener('click',function(){
        const tipNumber = parseInt(tip.textContent.replace('%','')) / 100;
        localStorage.setItem('tip',tipNumber);
        for (let item of tipChildrenElements)
            if (item.classList.contains('data-input__tip-selected')) {
                item.classList.remove('data-input__tip-selected')
            }
            else {
                tip.classList.add('data-input__tip-selected');
            };
        
        calculateTip();
    })  
}

function numberPeople () {
    const numberOfPeople = numberOfPeopleElement.value;
    if (numberOfPeople == 0) {
        document.querySelector('.data-input__header-error').style.display = "block";
        numberOfPeopleElement.style.border = "2px solid #E17052"
    }
    else {
        document.querySelector('.data-input__header-error').style.display = "none";
        numberOfPeopleElement.style.border = "none"
    }
    localStorage.setItem('people',numberOfPeople);
    calculateTip();
}

function calculateTip() {
    const billAmount = localStorage.getItem('bill');
    const tipNumber = localStorage.getItem('tip');
    const numberOfPeople = localStorage.getItem('people');

    const tipResult = (billAmount / numberOfPeople) * tipNumber;
    const tipRound = Math.round(tipResult *100)/100;

    const personTotal = (billAmount / numberOfPeople) + tipResult;
    const personTotalRound = Math.round(personTotal *100)/100;

    if (billAmount && tipNumber && numberOfPeople) {
        tipPerPersonElement.innerText = '$' + tipRound;
        totalPerPersonElement.innerText = '$' + personTotalRound;
    }
    else {
        tipPerPersonElement.innerText = '$0.00';
        totalPerPersonElement.innerText = '$0.00';
    }
}

function clearLocalStorage () {
    localStorage.clear();
    tipPerPersonElement.innerText = '$0.00';
    totalPerPersonElement.innerText = '$0.00';
    inputBillElement.value = null;
    numberOfPeopleElement.value = null;
    tipPercentCustomElement.value = null;
    for (let item of tipChildrenElements)
        item.classList.remove('data-input__tip-selected');
}