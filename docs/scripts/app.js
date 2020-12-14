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

$(() => {

    "use strict;"

    const P_ONE = [$("#pOne1"), $("#pOne2"), $("#pOne3"), $("#pOne4"), $("#pOne5"), $("#pOne6")]
    const P_TWO = [$("#pTwo6"), $("#pTwo5"), $("#pTwo4"), $("#pTwo3"), $("#pTwo2"), $("#pTwo1")]
    let playerOne;
    const $OPEN_RULES = $("#openModal");
    const $MODAL = $("#modal");
    const $CLOSE_RULES = $("#close");

    // open modal

    const OPEN_MODAL = () => {
        $MODAL.show();
    }

    $OPEN_RULES.on("click", OPEN_MODAL);

    // close modal

    const CLOSE_MODAL = () => {
        $MODAL.hide();
    }

    $CLOSE_RULES.on("click", CLOSE_MODAL);

    // auto open model on page landing

    setTimeout(OPEN_MODAL, 5000);

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
    //countDown to capture check
            let countDown = valueOne;
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
                    countDown--;
                    if(playerOne === false) {
                        // if player has reched enemy board
                        let nextToCheck = $("input[type=submit]").eq(next)[0].id;
                        if(nextToCheck === P_TWO[5].attr("id")) {
                            console.log(nextToCheck);
                        }
                        // if player has reached back around to their board
                        let secondToCheck = $("input[type=submit]").eq(next)[0].id;
                        if(secondToCheck === P_ONE[0].attr("id")) {
                            console.log("foo");
                        }
                        // if on the last move - i === 1
                        // if next value will be === 1
                        // parallel value !== 0
                        // add next value and parallel value
                        // place total in player that moved capture pot
                        let toCapture = $("input[type=submit]").eq(next-1)[0].id;
                        if(valueOne > 5) {
                            for(let j = 0; j < 6; j++) {
                                if(toCapture === P_ONE[j].attr("id")) {
                                    if(countDown === 0 && parseInt(P_ONE[j].val()) === 1 && parseInt(P_TWO[j].val()) !== 0) {
                                        console.log(P_ONE[j].val())
                                        $("#playerOneCapture").val(parseInt(P_ONE[j].val()) + parseInt(P_TWO[j].val()));
                                        P_ONE[j].val("0");
                                        P_TWO[j].val("0");
                                    }
                                }
                            }
                        }
                    // same side check and capture rules for player two                   
                    } else if (playerOne === true) {
                        // if player has reched enemy board
                        let nextToCheck = $("input[type=submit]").eq(next)[0].id;
                        if(nextToCheck === P_ONE[1].attr("id")) {
                            console.log(nextToCheck);
                        }
                        // if player has reached back around to their board
                        let secondToCheck = $("input[type=submit]").eq(next)[0].id;
                        if(secondToCheck === P_TWO[5].attr("id")) {
                            console.log("bar");
                        }
                        // if on the last move - i === 1
                        // if next value will be === 1
                        // parallel value !== 0
                        // add next value and parallel value
                        // place total in player that moved capture pot

                        let toCapture = $("input[type=submit]").eq(next-1)[0].id;
                        if (valueOne > 5) {
                            for(let k = 0; k < 6; k++) {
                                if(toCapture === P_TWO[k].attr("id")) {
                                    if(countDown === 0 && parseInt(P_TWO[k].val()) === 1 && parseInt(P_ONE[k].val()) !== 0) {
                                        console.log(P_TWO[k].val())
                                        $("#playerTwoCapture").val(parseInt(P_TWO[k].val()) + parseInt(P_ONE[k].val()));
                                        P_TWO[k].val("0");
                                        P_ONE[k].val("0");
                                    }
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
                endGame();
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

    // End game
    // when it's the players turn and their side === 0 (all their mini-pots === 0)
    // all of opponents mini pot points gets added to their capture pot
    // whichever capture pot is higher
    // corresponds to the winning player

    function pOneEndGame() {
        let pOnePotsTotal = 1;
        let pTwoPotsTotal = 1;
        setTimeout(() => {
        P_ONE.forEach((item) => {pOnePotsTotal+= parseInt(item.val())});
        P_TWO.forEach((item) => {pTwoPotsTotal+= parseInt(item.val())});
        return pOnePotsTotal, pTwoPotsTotal;
        }, 2500)
        setTimeout(() => {
            if(playerOne === false && pTwoPotsTotal === 1) {
                let pOneCapture = parseInt($("#playerOneCapture").val());
                $("#playerTwoCapture").val(pOneCapture + pOnePotsTotal);
                for(let l = 0; l < 6; l++) {
                    P_ONE[l].val("0");
                }
                setTimeout(() => {
                if(parseInt($("#playerOneCapture").val()) > parseInt($("#playerTwoCapture").val())) {
                    alert("Player One Wins!");
                } else if(parseInt($("#playerTwoCapture").val()) > parseInt($("#playerOneCapture").val())) {
                    alert("Player Two Wins!");
                } else {
                    alert("It's a tie!");
                }
                }, 500);
            }
        }, 2600)
    }

    function pTwoEndGame() {
        let pOnePotsTotal = 1;
        let pTwoPotsTotal = 1;
        setTimeout(() => {
        P_ONE.forEach((item) => {pOnePotsTotal+= parseInt(item.val())});
        P_TWO.forEach((item) => {pTwoPotsTotal+= parseInt(item.val())});
        return pOnePotsTotal, pTwoPotsTotal;
        }, 2500)
        setTimeout(() => {
            if(playerOne === true && pOnePotsTotal === 1) {
                let pTwoCapture = parseInt($("#playerTwoCapture").val());
                $("#playerTwoCapture").val(pTwoCapture + pTwoPotsTotal);
                for(let m = 0; m < 6; m++) {
                    P_TWO[m].val("0");
                }
                setTimeout(() => {
                if(parseInt($("#playerOneCapture").val()) > parseInt($("#playerTwoCapture").val())) {
                    alert("Player One Wins!");
                } else if(parseInt($("#playerTwoCapture").val()) > parseInt($("#playerOneCapture").val())) {
                    alert("Player Two Wins!");
                } else {
                    alert("It's a tie!");
                }
                }, 500);
            }
        }, 2600)
    }
    function endGame() {
        for(let n = 0; n < 6; n++) {
            P_ONE[n].click(() => pOneEndGame());
            P_TWO[n].click(() => pTwoEndGame());
        }
    }

});