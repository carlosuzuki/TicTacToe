import * as pc from '../Module/computer.mjs';

class board{
    constructor() {
        this.line1 = [" ", " ", " "];
        this.line2 = [" ", " ", " "];
        this.line3 = [" ", " ", " "];
    }
    printBoard() { 
        document.querySelectorAll(".game button")[0].innerHTML = this.line1[0];
        document.querySelectorAll(".game button")[1].innerHTML = this.line1[1];
        document.querySelectorAll(".game button")[2].innerHTML = this.line1[2];
        document.querySelectorAll(".game button")[3].innerHTML = this.line2[0];
        document.querySelectorAll(".game button")[4].innerHTML = this.line2[1];
        document.querySelectorAll(".game button")[5].innerHTML = this.line2[2];
        document.querySelectorAll(".game button")[6].innerHTML = this.line3[0];
        document.querySelectorAll(".game button")[7].innerHTML = this.line3[1];
        document.querySelectorAll(".game button")[8].innerHTML = this.line3[2]; 
    }
    check(line, column){ // retur true if field is empty.
        if      (line == "1") {if(this.line1[column-1] == " ") return true;}
        else if (line == "2") {if(this.line2[column-1] == " ") return true;}
        else if (line == "3") {if(this.line3[column-1] == " ") return true;}
        else return false;
    }
    clear(){
        this.line1 = [" ", " ", " "];
        this.line2 = [" ", " ", " "];
        this.line3 = [" ", " ", " "];
    }
    draw(line, column, charTag){
        playList.add(line-1, column-1);
        if (line == 1) this.line1[column-1] = charTag;
        else if (line == 2) this.line2[column-1] = charTag;
        else if (line == 3) this.line3[column-1] = charTag;
    }
}

class player{
    constructor(charTag, system) {
        this.name;
        this.charTag = charTag;
        this.playerSys = system;
    }
    
    play(board, playList, index) { //return false if "Exit" was chosen else return true
        if(this.name != "Computer"){
            var line, column;
            if (index == "1"){line=1; column=1;}
            else if (index == "2"){line=1; column=2;}
            else if (index == "3"){line=1; column=3;}
            else if (index == "4"){line=2; column=1;}
            else if (index == "5"){line=2; column=2;}
            else if (index == "6"){line=2; column=3;}
            else if (index == "7"){line=3; column=1;}
            else if (index == "8"){line=3; column=2;}
            else if (index == "9"){line=3; column=3;}
            if(!board.check(line, column)) currentPlayer.innerHTML = "This square is not availabe.";
            else {
                board.draw(line, column, this.charTag);
                currentPlayer.innerHTML = player[(playList.top)%2].name + " turn!";
            }      
        }
        if (player[(playList.top+1)%2].name == "Computer" && !pc.isWinner(board, player[0].charTag) && !pc.isWinner(board, player[1].charTag) && !playList.isFull()){
            if(player[1].playerSys.level == "Easy"){
                pc.randonMode(board, player[1].charTag);
            }
            else if(player[1].playerSys.level == "Medium"){
                if (pc.opponentCanWin(playList, board, player[1].charTag)) {pc.defendMode(playList, board, player[1].charTag)}
                else {pc.randonMode(board, player[1].charTag)}              
            }
            else if(player[1].playerSys.level == "Hard"){
                if (pc.computerCanWin(playList, board, player[1].charTag)) pc.attackMode(playList, board, player[1].charTag);
                else if (pc.opponentCanWin(playList, board, player[1].charTag)) pc.defendMode(playList, board, player[1].charTag);
                else pc.randonMode(board, player[1].charTag);
            }
        }
    }

    chooseName(){
    } 
}

class playList {
    constructor() {
        this.line = [null, null, null, null, null, null, null, null, null];
        this.column = [null, null, null, null, null, null, null, null, null];
        this.top = -1;
    }

    add(line, column){
        this.top++;
        this.line[this.top] = line;
        this.column[this.top] = column;
    }
    remove(board){
        if(this.top>=0){
            if      (this.line[this.top] == 0) board.line1[this.column[this.top]] = " ";
            else if (this.line[this.top] == 1) board.line2[this.column[this.top]] = " ";
            else if (this.line[this.top] == 2) board.line3[this.column[this.top]] = " ";
            this.line[this.top] = null;
            this.column[this.top] = null; 
            this.top--;
        }
    }
    clear(){
        this.line = [null, null, null, null, null, null, null, null, null];
        this.column = [null, null, null, null, null, null, null, null, null];
        this.top = -1;
    }
    isEmpty(){
        if (this.top == -1) return true;
        return false;
    }
    isFull(){
        if (this.top == 8) return true;
        return false;  
    }
}

class system {
    qntPlayers;
    level;
    
    numberPlayers(){
        if(!sessionStorage.getItem("Qnt_players")){
            player[0].name = "Player 1";
            player[1].name = "Computer";
            this.qntPlayers = 1;
        } 
        else {
            if (sessionStorage.getItem("Qnt_players") == 1) { 
                player[0].name = "Player 1";
                player[1].name = "Computer";
                this.qntPlayers = 1;
            } 
            else {
                player[0].name = "Player 1";
                player[1].name = "Player 2";
                this.qntPlayers = 2;
            }
        }
    }

    difficulty(){
        if(!sessionStorage.getItem("Level"))  this.level = "Hard";
        else if (sessionStorage.getItem("Level") == "Easy")    this.level = "Easy";
        else if (sessionStorage.getItem("Level") == "Medium")  this.level = "Medium";
        else if (sessionStorage.getItem("Level") == "Hard")    this.level = "Hard";
    }
}


function init(){
    boardSquare.forEach((item) => {
        item.innerHTML = " ";
        item.addEventListener("click", newMove);
    });

    optionButton.forEach((item) => {
        item.addEventListener("click", newOption);
    });

    system.numberPlayers();
    system.difficulty();
    currentPlayer.innerHTML = player[(playList.top+1)%2].name + " turn!";
}

function newMove(e){
    if (!pc.isWinner(board, player[0].charTag) && !pc.isWinner(board, player[1].charTag) && !playList.isFull()){
        var index = e.target.getAttribute("data-i");
        player[(playList.top+1)%2].play(board, playList, index);
        if (pc.isWinner(board, player[(playList.top)%2].charTag)) currentPlayer.innerHTML = player[(playList.top)%2].name + " Wins !!!";
        else if(playList.isFull()) currentPlayer.innerHTML = "No winner !!!"; 
        board.printBoard();
    } 
}

function newOption(e){
    const index = e.target.getAttribute("option");
    if(index == "restart"){
        board.clear();
        playList.top=-1;
        board.printBoard();
        currentPlayer.innerHTML = player[(playList.top+1)%2].name + " turn!"; 
    }
    if(index == "back"){
        playList.remove(board);
        board.printBoard();
        currentPlayer.innerHTML = player[(playList.top+1)%2].name + " turn!"; 
    }
}


system = new system();
board = new board();
playList = new playList();
player[0] = new player("x", system);
player[1] = new player("o", system);

const currentPlayer = document.querySelector(".currentPlayer");
const boardSquare = document.querySelectorAll(".game button");
const optionButton = document.querySelectorAll(".buttonOptions button");

init();