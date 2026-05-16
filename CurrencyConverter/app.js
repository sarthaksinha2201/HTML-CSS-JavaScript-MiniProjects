const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


// let i = 0;
for(let select of dropdowns) {
  for(let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
     if(select.name === "from" && currCode === "USD"){
        newOption.selected = true;
     }
     else if(select.name === "to" && currCode === "INR"){
        newOption.selected = true;
    }

     select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
    }
    // console.log(fromCurr, toCurr); 
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];


    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal.value} ${fromCurr} = ${finalAmt} ${toCurr.value}`
}

button.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", () => {
    updateExchangeRate();
})