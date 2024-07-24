const inputslider=document.querySelector("[data-lengthSlider]");
const lengthdisplay=document.querySelector("[data-lengthNumber]");
const passworddisplay=document.querySelector("[data-passwordDisplay]");
const copymsg=document.querySelector("[data-copyMsg]");
const copybtn=document.querySelector("[data-copy]");
const uppercheck=document.querySelector("#uppercase");
const lowercheck=document.querySelector("#lowercase");
const numberscheck=document.querySelector("#numbers");
const symbolscheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generatebtn=document.querySelector(".generatebtn");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const symbols="~!#$%^&*()_+={}[]:;,<>.?/'|";

let password="";
let checkcount=0;
let passwordlength=10;
handleslider();
setindicator("#808080");
function handleslider(){


inputslider.value=passwordlength;
lengthdisplay.innerText=passwordlength;


}
function setindicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getrandominteger(min,max){
   return Math.floor( Math.random() * (max-min))+min;
 }
function getrandomnumber(){
    return getrandominteger(0,9);
}
function getrandomlower(){
    return String.fromCharCode(getrandominteger(97,123));
}
function getrandomupper(){
    return String.fromCharCode(getrandominteger(65,91));
}
function getrandomsymbol(){
    const randno=getrandominteger(0,symbols.length);
    return symbols.charAt(randno);

}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercheck.checked) hasUpper = true;
    if (lowercheck.checked) hasLower = true;
    if (numberscheck.checked) hasNum = true;
    if (numberscheck.checked) hasSym = true;
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8) {
        setindicator("#0f0");
    } else if (
    (hasLower || hasUpper) && (hasNum || hasSym) && passwordlength >= 6
    ) {
        setindicator("#ff0");
    } else { setindicator("#f00");
    }
    }
async function copycontent(){
    try{
      await navigator.clipboard.writeText(passworddisplay.value);
      copymsg.innerText="copied";
    }
    catch(e){
        copymsg.innerText="failed";
    }
    copymsg.classList.add("active");
    setTimeout(()=>{

        copymsg.classList.remove("active");

    },2000);
}
function sufflepass(array){


    for
    (let i= array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


function handlechckboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if (checkbox.checked) checkcount++;
    });
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
}

allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlechckboxchange);
      })


inputslider.addEventListener('input',(e)=>{

passwordlength=e.target.value;

handleslider();

})
copybtn.addEventListener('click',()=>{

if(passworddisplay.value) copycontent();


})
generatebtn.addEventListener('click',()=>{

    if(checkcount==0) return;
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
    password="";
    let funcarr=[];
    if(uppercheck.checked){
        funcarr.push(getrandomupper);
    }
    if(lowercheck.checked){
        funcarr.push(getrandomlower);
    }

    if(numberscheck.checked){
        funcarr.push(getrandomnumber);
    }

    if(symbolscheck.checked){
        funcarr.push(getrandomsymbol);
    }
for(let i=0;i<funcarr.length;i++){
    password+=funcarr[i]();
}
for(let i=0;i<passwordlength-funcarr.length;i++){
    let randindex=getrandominteger(0,funcarr.length);
    password+=funcarr[randindex]();
}

password=sufflepass(Array.from(password));
passworddisplay.value=password;
calcStrength();












});
