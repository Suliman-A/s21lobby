//==================================================SHOE HISTORY LOGIC==================================================
export const mapIconBigRoad = (winner, game_type) => {

    let icon_symbol = '';

    if(game_type === 0 || game_type === 2) {
        if(winner === 'PLAYER') {
            icon_symbol = 'player-icon';   
        } else if(winner === 'BANKER') {
            icon_symbol = 'banker-icon';
        } else {
            icon_symbol = 'tie-icon';
        } 
    } else if (game_type === 1) {
        if(winner === 'DRAGON') {
            icon_symbol = "dragon";  
        } else if(winner === 'TIGER') {
            icon_symbol = "tiger"; 
        } else {
            icon_symbol = "dt-tie";
        }     
    } else {
        console.log('FAILED TO MAP HISTORY SYMBOL:' + winner)
    }
    return icon_symbol;
}

//Checks if color can be placed at that coordinate (checks the color at y and x-1)
const checkColor = (used_coordinates, x, y, current_winner) => {
    let check_x = x - 1;
    let check_y = y;

    let result = true;

    for( let i = 0; i<used_coordinates.length; i++){
        if(used_coordinates[i][0] === check_x && used_coordinates[i][1] === check_y){
            if(current_winner === used_coordinates[i][2]){
                result =  false;
            }
        }
    }
    return result;
}

//Checks if coordinates are available
export const checkCoordinates = (used_coordinates, x, y) => {
    for( let i = 0; i<used_coordinates.length; i++){
        if(used_coordinates[i][0] === x && used_coordinates[i][1] === y){
            return false;
        }
    }
    return true;
}
    
/*======================== GENERATES THE COORDINATES OF THE NEXT BEAD==========================
* If there is a dragon leg thats forming and y > 6 ==> we use a separate dragon_x coordinate ==> after the leg is done we switch back to the regular x
* Same color wins go down a column
* Different color wins go to the next column
* If there is a tie the coordinates stay the same
* TODO: Implement dragon leg stacking logic
*/
export const generateCoordinates = (current_x, current_y, dragon_x, previous_winner, current_winner, used_coordinates, used_symbols) => {
    let new_x, new_y, new_dragon_x = null;

    if(current_winner === 'tie' || current_winner === 'TIE'){
        new_dragon_x = dragon_x
        new_x = current_x;
        new_y = current_y;
    }else if(previous_winner !== current_winner){
        new_x = current_x + 1;
        new_y = 1;
    }else if(previous_winner === current_winner && current_y < 6){

        let coordinate_is_free;
        let color_is_free = true;

        if(dragon_x){
            coordinate_is_free = checkCoordinates(used_coordinates, dragon_x, current_y + 1);
        }else{
            coordinate_is_free = checkCoordinates(used_coordinates, current_x, current_y + 1);
        }

        if(coordinate_is_free && dragon_x){
            color_is_free =  checkColor(used_coordinates, dragon_x, current_y + 1, current_winner);
        }

        //the coordinate has already been used OR the you cannot use the winner's color on these coordinates
        if(!coordinate_is_free || !color_is_free){
            if(dragon_x){
                new_dragon_x = dragon_x + 1; //dragon tail formation
            }else{
                new_dragon_x = current_x + 1; //dragon tail formation
            }
            new_y = current_y; 
        }else{ //y coordinate has not been used
            if(dragon_x){//if dragon_x has been used --> continue with it
                new_dragon_x = dragon_x;
            }
            new_x = current_x;
            new_y = current_y + 1; 
        }   
    }else if(previous_winner === current_winner && current_y === 6){

        if(dragon_x){
            new_dragon_x = dragon_x + 1; //dragon tail formation
        }else{
            new_dragon_x = current_x + 1; //dragon tail formation
        }
        new_y = current_y; 
    }

    return [new_x, new_y, new_dragon_x];
}

  