function showSelected(e) {
    if (radioButtons[0].checked == true) {sessionStorage.setItem("Qnt_players", 1 );} 
    if (radioButtons[1].checked == true) {sessionStorage.setItem("Qnt_players", 2 );} 
    if (radioButtons[2].checked == true) {sessionStorage.setItem("Level", "Easy"  );}   
    if (radioButtons[3].checked == true) {sessionStorage.setItem("Level", "Medium");}   
    if (radioButtons[4].checked == true) {sessionStorage.setItem("Level", "Hard"  );}  
 }

function init(){
    if(!sessionStorage.getItem("Level"))                   radioButtons[4].checked = true; 
    else if (sessionStorage.getItem("Level") == "Easy")    radioButtons[2].checked = true;
    else if (sessionStorage.getItem("Level") == "Medium")  radioButtons[3].checked = true;
    else if (sessionStorage.getItem("Level") == "Hard")    radioButtons[4].checked = true;

    if(!sessionStorage.getItem("Qnt_players"))              radioButtons[0].checked = true; 
    else if (sessionStorage.getItem("Qnt_players") == 1)    radioButtons[0].checked = true;
    else if (sessionStorage.getItem("Qnt_players") == 2)    radioButtons[1].checked = true;
}

const radioButtons = document.querySelectorAll('input[type="radio"]');

for(const radioButton of radioButtons){
    radioButton.addEventListener('change', showSelected);
}

init();