
export function isWinner(board, tag) { 
    if (board.line1[0] == tag && board.line1[1] == tag && board.line1[2] == tag) return true; //Verify line 1
    if (board.line2[0] == tag && board.line2[1] == tag && board.line2[2] == tag) return true; //Verify line 2
    if (board.line3[0] == tag && board.line3[1] == tag && board.line3[2] == tag) return true; //Verify line 3

    if (board.line1[0] == tag && board.line2[0] == tag && board.line3[0] == tag) return true; //Verify Column 1
    if (board.line1[1] == tag && board.line2[1] == tag && board.line3[1] == tag) return true; //Verify Column 2
    if (board.line1[2] == tag && board.line2[2] == tag && board.line3[2] == tag) return true; //Verify Column 3

    if (board.line1[0] == tag && board.line2[1] == tag && board.line3[2] == tag) return true; //Verify Diagonal 1
    if (board.line1[2] == tag && board.line2[1] == tag && board.line3[0] == tag) return true; //Verify Diagonal 2
    return false;
}

export function randonMode(board, tag){
    do{
        var randLine = Math.floor(Math.random() * 3) + 1;
        var randColumn = Math.floor(Math.random() * 3) + 1;
    } while(!board.check(randLine, randColumn));
    board.draw(randLine,randColumn, tag);    
}

export function attackMode(playList, board, tag){
    for(let l=1;l<=3;l++){
        for(let c=1;c<=3;c++){
            if(board.check(l,c)){
                board.draw(l,c, tag);
                if(isWinner(board, tag)){
                    return true;  
                }
                else{
                    playList.remove(board);
                }
            }
        }
    }
}

export function computerCanWin(playList, board, tag){
    for(let l=1;l<=3;l++){
        for(let c=1;c<=3;c++){
            if(board.check(l,c)){
                board.draw(l,c, tag);
                if(isWinner(board, tag)){
                    playList.remove(board);
                    return true;
                }
                else{
                    playList.remove(board);
                }
            }
        }
    }
    return false;
}

export function defendMode(playList, board, tag){
    var opponentTag = getOpponentTag(board,tag);
    for(let l=1;l<=3;l++){
        for(let c=1;c<=3;c++){
            if(board.check(l,c)){
                board.draw(l,c, opponentTag);
                if(isWinner(board, opponentTag)){
                    playList.remove(board);
                    board.draw(l,c, tag);
                    return true;  
                }
                else{
                    playList.remove(board);
                }
            }
        }
    }
}

export function opponentCanWin(playList, board, tag){
    var opponentTag = getOpponentTag(board, tag);
    for(let l=1;l<=3;l++){
        for(let c=1;c<=3;c++){
            if(board.check(l,c)){
                board.draw(l,c, opponentTag);
                if(isWinner(board, opponentTag)){
                    playList.remove(board);
                    return true;
                }
                else{
                    playList.remove(board);
                }
            }
        }
    }
    return false;
}

function getOpponentTag(board, tag){
    for(let i = 1; i<=3; i++){
        if(board.line1[i] != tag && board.line1[i] != " ") return board.line1[i];
        if(board.line2[i] != tag && board.line2[i] != " ") return board.line2[i];
        if(board.line3[i] != tag && board.line3[i] != " ") return board.line3[i];
    }    
    return null;
}

