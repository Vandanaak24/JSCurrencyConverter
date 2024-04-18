const Base_url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg =document.querySelector(".msg")

let i = 0;
for (let select of dropdowns) {
  for (currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currcode = element.value;
  let countryCode =countryList[currcode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
  let img = element.parentElement.querySelector("img");
  img.src=newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load",()=>{
    updateExchangeRate();
})

const updateExchangeRate= async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal=amount.value;
    console.log(amtVal);
    if(amtVal===""||amtVal<1){
    amtVal=1;
    amount.value="1";
    }

    const URL= `${Base_url}/${fromCurr.value.toLowerCase()}.json`
     let response = await fetch(URL);
     let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
     console.log(rate);
     let finalAmount = amtVal*rate;
     msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}