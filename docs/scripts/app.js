// have each player mini pot start with 4 beads
// each player capture pot starts empty
// when a player chooses a pot, the concurrent pots are filled with one bead each from the origin pot (pot++), leaving the origin pot empty (pot = 0)
// when one side has no more beads (all pOne OR all pTwo === 0) remaining beads in player mini pots goes into player with remaining beads capture pot (player capture pot += remaining beads)
// Highest count of player capture pot beads wins.
// Game resets

// * Maybe attach API information about Africa and American connections

// silver and gold
// diamonds and pearls
// blue and pink
// black and white
// spinach and kale
// red wine and white wine
// gigs and full time job
// stocks and bonds
// bitcoin and dollar bill

// Add player one and player two selector fields 
// Type in name for each player - user input
// Random choice of which player goes first
// Only player field thas's currently in play is active
// Highlight current player's name

/* ------------------ code here --------------------*/

// Add player one and player two selector fields 
// Type in name for each player - user input
// Random choice of which player goes first
// Only player field that's currently in play is active
// Highlight current player's name

"use strict;"

const P_ONE = [$("#pOne6"), $("#pOne5"), $("#pOne4"), $("#pOne3"), $("#pOne2"), $("#pOne1")]
const P_TWO = [$("#pTwo1"), $("#pTwo2"), $("#pTwo3"), $("#pTwo4"), $("#pTwo5"), $("#pTwo6")]
let playerOne;

// prevents reload of page upon submit button click

$("form").on("submit", (e) => {
    e.preventDefault();
})

// alternates playable sides

function alternatePlayer() {
    if(playerOne === true) {
        playerMove(0);
        $(".pOnePots").off("click");
        // prevents capture pots from being manipulated
        $("#playerOneCapture").off("click");
        $("#playerTwoCapture").off("click");
        return playerOne = false;
    } else {
        playerMove(0);
        $(".pTwoPots").off("click");
        // prevents capture pots from being manipulated
        $("#playerOneCapture").off("click");
        $("#playerTwoCapture").off("click");
        return playerOne = true;
    }
};

// when the player chooses from one of their mini-pots
// adjacent pot gets + 1 
// count down from initial value of pot
// keep adding one to subsequent pots until count === 0
// the mini-pot chosen new value = 0

function playerMove(choice) {
    let potSelected =  $("input[type=submit]").eq(choice);
    potSelected.click(()=> {
// value of selected pot
        const valueOne = parseInt(potSelected.val());
        let i = valueOne;
// the next pot to add to
        let next = choice + 1;
//time it takes to add 1 to next pot
        let time = 300;

//add one to every adjacent pot
        while(i > 0) {      
            setTimeout(() => {
                const valueNext = parseInt($("input[type=submit]").eq(next).val());
                const addedValues = valueNext + 1;
                $("input[type=submit]").eq(next).val(addedValues);
                next++;
                if(next === $("input[type=submit]").length) {
                    next = 0;
                }
                // skip over the opponents capture pot when adding 1 to adjacent pots
                if(playerOne === false && $("input[type=submit]").eq(next)[0].id === $("#playerTwoCapture")[0].id) {
                    next = 0;
                } else if (playerOne === true && $("input[type=submit]").eq(next)[0].id === $("#playerOneCapture")[0].id) {
                    next++;
                }
                if(playerOne === false) {
                    let nextToCheck = $("input[type=submit]").eq(next)[0].id;
                    if(nextToCheck === P_TWO[0].attr("id") || nextToCheck === P_TWO[1].attr("id") || nextToCheck === P_TWO[2].attr("id") || nextToCheck === P_TWO[3].attr("id") || nextToCheck === P_TWO[4].attr("id") || nextToCheck === P_TWO[5].attr("id")) {
                        console.log(P_TWO[0].attr("id"));
                        console.log(nextToCheck);
                        for(let j = 0; j < 6; j++) {
                            if(P_ONE[j].val() === "1" && P_TWO[j] !== "0") {
                                console.log("foo");
                                $("#playerOneCapture").val(P_ONE[j].val() + P_TWO[j].val());
                                P_ONE[j].val("0");
                                P_TWO[j].val("0");
                            } 
                        }
                    }                        
                } else if (playerOne === true) {
                    let nextToCheck = $("input[type=submit]").eq(next)[0].id;
                    if(nextToCheck === P_ONE[0].attr("id") || nextToCheck === P_ONE[1].attr("id") || nextToCheck === P_ONE[2].attr("id") || nextToCheck === P_ONE[3].attr("id") || nextToCheck === P_ONE[4].attr("id") || nextToCheck === P_ONE[5].attr("id")) {
                        console.log(P_ONE[0].attr("id"));
                        console.log(nextToCheck);
                        for(let j = 0; j < 6; j++) {
                            if (P_TWO[j].val() === "1" && P_ONE[j] !== "0") {
                                console.log("bar")
                                $("#playerTwoCapture").val(P_TWO[j].val() + P_ONE[j].val());
                                P_TWO[j].val("0");
                                P_ONE[j].val("0");
                            }
                        }
                    }
                }
            }, time);
            time += 300;           
            i--;
        }
//apply alternate player function
        if(parseInt(potSelected.val()) === 0) {
            "";
        } else {
            alternatePlayer();
        }
        potSelected.val("0");
        return playerOne;
    })
    if (choice < $("input[type=submit]").length - 2) {
        playerMove(choice+1);
    }
    return playerOne;
}
//Toss the coin (button click) to have p1 or p2 be chosen to go first. 50/50 (50/49.9999...) chance achieved with Math.random()

$("#coinToss").one("click", () => {
    // alternates playable sides
    let coinToss = Math.random();
        if(coinToss > 0.5) {
            playerMove(0);
            $("#playerOneCapture").off("click"); // prevents pOne capture pot from being manipulated
            $("#playerTwoCapture").off("click"); // prevents pTwo capture pot from being manipulated
            $(".pTwoPots").off("click");
            $("#coinToss").html("Player One Starts");
            setTimeout(() => $("#coinToss").html("Mancala"), 3000);
            return playerOne = true;
        } else {
            playerMove(0);
            $("#playerOneCapture").off("click"); // prevents pOne capture pot from being manipulated
            $("#playerTwoCapture").off("click"); // prevents pTwo capture pot from being manipulated
            $(".pOnePots").off("click");
            $("#coinToss").html("Player Two Starts");
            setTimeout(() => $("#coinToss").html("Mancala"), 3000);
            return playerOne = false;
        }
})


// If, after the final move (i = 0)
// the current players last move pot total === 1
// and the opponent's parallel pot !== 0
// add the player pot and opponent parallel pot together
// add total to the player's capture pot
// set the player pot and the opponent's parallel pot = 0
            
            /* setTimeout(() => {
                setTimeout(() => {
                    console.log("yep")
                    for(let j = 0; j < 6; j++) {
                        if(P_ONE[j].val() === "1" && P_TWO[j] !== "0") {
                            console.log("foo");
                            $("#playerOneCapture").val(P_ONE[j].val() + P_TWO[j].val());
                            P_ONE[j].val("0");
                            P_TWO[j].val("0");
                        } else if (P_TWO[j].val() === "1" && P_ONE[j] !== "0") {
                            console.log("bar")
                            $("#playerTwoCapture").val(P_TWO[j].val() + P_ONE[j].val());
                            P_TWO[j].val("0");
                            P_ONE[j].val("0");
                        }
                    }
                }, time);
            }, 500); */
        