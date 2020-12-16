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

    const $P_ONE = [$("#pOne1"), $("#pOne2"), $("#pOne3"), $("#pOne4"), $("#pOne5"), $("#pOne6")]
    const $P_TWO = [$("#pTwo6"), $("#pTwo5"), $("#pTwo4"), $("#pTwo3"), $("#pTwo2"), $("#pTwo1")]
    let playerOne;
    const $OPEN_RULES = $("#openModal");
    const $MODAL = $("#modal");
    const $CLOSE_RULES = $("#close");
    const $FLIP_ONE = $("#flipPlayerOne");
    const $FLIP_TWO = $("#flipPlayerTwo");
    const $PVC = $("#playerVsComputer");
    const $PLAYER_MODAL = $("#playerVs-modal");
    const $WINNER_MODAL = $("#winner-modal");
    const $MODAL_MESSAGE = $("#winnerMessage");
    let cName;
    let randomName;
    let cPlayer;

    // prevents reload of page upon submit button click

    $("form").on("submit", (e) => {
        e.preventDefault();
    })

    const CLOSE_PLAYER_MODAL = () => {
        $PLAYER_MODAL.fadeOut(1000);
    }

    const P_ONE_WINNER = () => {
        $MODAL_MESSAGE.html("player one wins!!!")
        $WINNER_MODAL.fadeIn(500);
    }

    const P_TWO_WINNER = () => {
        $MODAL_MESSAGE.html("player two wins!!!")
        $WINNER_MODAL.fadeIn(500);
    }

    const P_ONE_TWO_TIE = () => {
        $MODAL_MESSAGE.html("it's a tie!!!")
        $WINNER_MODAL.fadeIn(500);
    }
    
    function playerVsComputer() {

        // open modal

        const OPEN_MODAL = () => {
            $MODAL.fadeIn(2000);
        }

        $OPEN_RULES.on("click", OPEN_MODAL);

        // close modal

        const CLOSE_MODAL = () => {
            $MODAL.fadeOut(1000);
        }

        $CLOSE_RULES.on("click", CLOSE_MODAL);

        // auto open model on page landing

        setTimeout(OPEN_MODAL, 1300);

        // alternates playable sides

        function alternatePlayer() {
            if(playerOne === true) {
                let computerChoice = Math.floor(Math.random() * cPlayer.moves.length);
                let potSelected = cPlayer.moves[computerChoice];
                    console.log(potSelected);
                if(parseInt(potSelected.val()) !== 0) {
                    setTimeout(() => computerMove(computerChoice), 2000);
                } else {
                    while(parseInt(potSelected.val()) === 0) {
                        computerChoice = Math.floor(Math.random() * cPlayer.moves.length);
                        potSelected = cPlayer.moves[computerChoice];
                         if(parseInt(potSelected.val()) !== 0) {
                            console.log(computerChoice);
                            setTimeout(() => computerMove(computerChoice), 2000);
                            console.log("yea");
                            }
                        console.log("redo");
                    }

                }
                pOneEndGame();
                $(".pOnePots").off("click");
                // prevents capture pots from being manipulated
                $("#playerOneCapture").off("click");
                return playerOne = false;
            } else {
                playerMove(0);
                pTwoEndGame();
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
                        // increase border each time a number is added on the board
                        if(playerOne === true) {
                            potSelected.css({
                                "border" : "0.5rem solid rgba(0, 255, 0, 0.425)"
                            });
                            setTimeout(() => {
                                potSelected.css({
                                    "border" : "0.1rem solid rgba(0, 255, 0, 0.425)"
                                });
                            }, 500);
                            $("input[type=submit]").eq(next).css({
                                "border" : "0.5rem solid rgba(0, 255, 0, 0.425)"
                            });
                            setTimeout(() => {
                                $("input[type=submit]").eq(next-1).css({
                                    "border" : "0.1rem solid rgba(0, 255, 0, 0.425)"
                                });
                            }, 500);
                            $("input[type=submit]").eq(next-1).css({
                                "border" : "0.5rem solid rgba(0, 255, 0, 0.425)"
                            });
                            setTimeout(() => {
                                $("input[type=submit]").eq(next-2).css({
                                    "border" : "0.1rem solid rgba(0, 255, 0, 0.425)"
                                });
                            }, 500);
                        } else {
                            potSelected.css({
                                "border" : "0.5rem solid rgba(255, 0, 0, 0.425)"
                            });
                            setTimeout(() => {
                                potSelected.css({
                                    "border" : "0.1rem solid rgba(255, 0, 0, 0.425)"
                                });
                            }, 500);
                            $("input[type=submit]").eq(next).css({
                                "border" : "0.5rem solid rgba(255, 0, 0, 0.425)"
                            });
                            setTimeout(() => {
                                $("input[type=submit]").eq(next-1).css({
                                    "border" : "0.1rem solid rgba(255, 0, 0, 0.425)"
                                });
                            }, 500);
                            $("input[type=submit]").eq(next-1).css({
                                "border" : "0.5rem solid rgba(255, 0, 0, 0.425)"
                            });
                            setTimeout(() => {
                                $("input[type=submit]").eq(next-2).css({
                                    "border" : "0.1rem solid rgba(255, 0, 0, 0.425)"
                                });
                            }, 500);
                        }
                        next++;
                        if(next === $("input[type=submit]").length) {
                            next = 0;
                        }
                        // skip over the opponents capture pot when adding 1 to adjacent pots
                        if(playerOne === true && $("input[type=submit]").eq(next)[0].id === $("#playerTwoCapture")[0].id) {
                            next = 0;
                        } else if (playerOne === false && $("input[type=submit]").eq(next)[0].id === $("#playerOneCapture")[0].id) {
                            next++;
                        }
                        countDown--;
                        if(playerOne === true) {
                            // if player has reched enemy board
                            let nextToCheck = $("input[type=submit]").eq(next)[0].id;
                            if(nextToCheck === $P_TWO[5].attr("id")) {
                                console.log(nextToCheck);
                            }
                            // if player has reached back around to their board
                            let secondToCheck = $("input[type=submit]").eq(next)[0].id;
                            if(secondToCheck === $P_ONE[0].attr("id")) {
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
                                    if(toCapture === $P_ONE[j].attr("id")) {
                                        if(countDown === 0 && parseInt($P_ONE[j].val()) === 1 && parseInt($P_TWO[j].val()) !== 0) {
                                            console.log($P_ONE[j].val())
                                            let currentAmt = parseInt($("#playerOneCapture").val());
                                            $("#playerOneCapture").val(currentAmt + parseInt($P_ONE[j].val()) + parseInt($P_TWO[j].val()));
                                            $P_ONE[j].val("0");
                                            $P_TWO[j].val("0");
                                        }
                                    }
                                }
                            }
                        // same side check and capture rules for player two                   
                        } else if (playerOne === false) {
                            // if player has reched enemy board
                            let nextToCheck = $("input[type=submit]").eq(next)[0].id;
                            if(nextToCheck === $P_ONE[1].attr("id")) {
                                console.log(nextToCheck);
                            }
                            // if player has reached back around to their board
                            let secondToCheck = $("input[type=submit]").eq(next)[0].id;
                            if(secondToCheck === $P_TWO[5].attr("id")) {
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
                                    if(toCapture === $P_TWO[k].attr("id")) {
                                        if(countDown === 0 && parseInt($P_TWO[k].val()) === 1 && parseInt($P_ONE[k].val()) !== 0) {
                                            console.log($P_TWO[k].val())
                                            let currentAmt = parseInt($("#playerTwoCapture").val());
                                            $("#playerTwoCapture").val(currentAmt + parseInt($P_TWO[k].val()) + parseInt($P_ONE[k].val()));
                                            $P_TWO[k].val("0");
                                            $P_ONE[k].val("0");
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
                    $(".pOnePots").off("click");
                    $(".pTwoPots").off("click");
                    setTimeout(() => alternatePlayer(), time);
                }
                potSelected.val("0");
                return playerOne;
            })
            if (choice < $("input[type=submit]").length - 2) {
                playerMove(choice+1);
            }
            return playerOne;
        }

        // computer move function 

        function computerMove(choice) {
            let potSelected = cPlayer.moves[choice];
            console.log(potSelected);
        // value of selected pot
                let valueOne = parseInt(potSelected.val());
                let i = valueOne;
        // the next pot to add to
                let next;
                switch(choice) {
                    case 5:
                        next = choice + 3;
                    break;
                    case 4:
                        next = choice + 5;
                    break;
                    case 3:
                        next = choice + 7;
                    break;
                    case 2:
                        next = choice + 9;
                    break;
                    case 1:
                        next = choice + 11;
                    break;
                    case 0:
                        next = choice + 13;
                    break;
                }
                console.log(choice);
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
                        // increase border each time a number is added on the board
                        if(playerOne === true) {
                            potSelected.css({
                                "border" : "0.5rem solid rgba(0, 255, 0, 0.425)"
                            });
                            setTimeout(() => {
                                potSelected.css({
                                    "border" : "0.1rem solid rgba(0, 255, 0, 0.425)"
                                });
                            }, 500);
                            $("input[type=submit]").eq(next).css({
                                "border" : "0.5rem solid rgba(0, 255, 0, 0.425)"
                            });
                            setTimeout(() => {
                                $("input[type=submit]").eq(next-1).css({
                                    "border" : "0.1rem solid rgba(0, 255, 0, 0.425)"
                                });
                            }, 500);
                            $("input[type=submit]").eq(next-1).css({
                                "border" : "0.5rem solid rgba(0, 255, 0, 0.425)"
                            });
                            setTimeout(() => {
                                $("input[type=submit]").eq(next-2).css({
                                    "border" : "0.1rem solid rgba(0, 255, 0, 0.425)"
                                });
                            }, 500);
                        } else {
                            potSelected.css({
                                "border" : "0.5rem solid rgba(255, 0, 0, 0.425)"
                            });
                            setTimeout(() => {
                                potSelected.css({
                                    "border" : "0.1rem solid rgba(255, 0, 0, 0.425)"
                                });
                            }, 500);
                            $("input[type=submit]").eq(next).css({
                                "border" : "0.5rem solid rgba(255, 0, 0, 0.425)"
                            });
                            setTimeout(() => {
                                $("input[type=submit]").eq(next-1).css({
                                    "border" : "0.1rem solid rgba(255, 0, 0, 0.425)"
                                });
                            }, 500);
                            $("input[type=submit]").eq(next-1).css({
                                "border" : "0.5rem solid rgba(255, 0, 0, 0.425)"
                            });
                            setTimeout(() => {
                                $("input[type=submit]").eq(next-2).css({
                                    "border" : "0.1rem solid rgba(255, 0, 0, 0.425)"
                                });
                            }, 500);
                        }
                        next++;
                        if(next === $("input[type=submit]").length) {
                            next = 0;
                        }
                        // skip over the opponents capture pot when adding 1 to adjacent pots
                        if(playerOne === true && $("input[type=submit]").eq(next)[0].id === $("#playerTwoCapture")[0].id) {
                            next = 0;
                        } else if (playerOne === false && $("input[type=submit]").eq(next)[0].id === $("#playerOneCapture")[0].id) {
                            next++;
                        }
                        countDown--;
                        if(playerOne === true) {
                            // if player has reched enemy board
                            let nextToCheck = $("input[type=submit]").eq(next)[0].id;
                            if(nextToCheck === $P_TWO[5].attr("id")) {
                                console.log(nextToCheck);
                            }
                            // if player has reached back around to their board
                            let secondToCheck = $("input[type=submit]").eq(next)[0].id;
                            if(secondToCheck === $P_ONE[0].attr("id")) {
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
                                    if(toCapture === $P_ONE[j].attr("id")) {
                                        if(countDown === 0 && parseInt($P_ONE[j].val()) === 1 && parseInt($P_TWO[j].val()) !== 0) {
                                            console.log($P_ONE[j].val())
                                            let currentAmt = parseInt($("#playerOneCapture").val());
                                            $("#playerOneCapture").val(currentAmt + parseInt($P_ONE[j].val()) + parseInt($P_TWO[j].val()));
                                            $P_ONE[j].val("0");
                                            $P_TWO[j].val("0");
                                        }
                                    }
                                }
                            }
                        // same side check and capture rules for player two                   
                        } else if (playerOne === false) {
                            // if player has reched enemy board
                            let nextToCheck = $("input[type=submit]").eq(next)[0].id;
                            if(nextToCheck === $P_ONE[1].attr("id")) {
                                console.log(nextToCheck);
                            }
                            // if player has reached back around to their board
                            let secondToCheck = $("input[type=submit]").eq(next)[0].id;
                            if(secondToCheck === $P_TWO[5].attr("id")) {
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
                                    if(toCapture === $P_TWO[k].attr("id")) {
                                        if(countDown === 0 && parseInt($P_TWO[k].val()) === 1 && parseInt($P_ONE[k].val()) !== 0) {
                                            console.log($P_TWO[k].val())
                                            let currentAmt = parseInt($("#playerTwoCapture").val())
                                            $("#playerTwoCapture").val(currentAmt + parseInt($P_TWO[k].val()) + parseInt($P_ONE[k].val()));
                                            $P_TWO[k].val("0");
                                            $P_ONE[k].val("0");
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
                if(playerOne === true && parseInt(potSelected.val()) === 0) {
                    "";
                } else {
                    $(".pOnePots").off("click");
                    $(".pTwoPots").off("click");
                    setTimeout(() => alternatePlayer(), time);
                }
                potSelected.val("0");
                return playerOne;
        }

        //Toss the coin (button click) to have p1 or p2 be chosen to go first. 50/50 (50/49.9999...) chance achieved with Math.random()

        (function coinToss() {
            $("#coinToss").one("click", () => {
                // alternates playable sides
                let coinToss = Math.random();
                if(coinToss > 0.5) {
                    playerMove(0);
                    $("#playerOneCapture").off("click"); // prevents pOne capture pot from being manipulated
                    $("#playerTwoCapture").off("click"); // prevents pTwo capture pot from being manipulated
                    $(".pTwoPots").off("click");
                    $("#coinToss").fadeOut(2000, () => {
                        $("#coinToss").html("Player One Starts");
                        $("#coinToss").css({
                            "left" : "20%",
                            "top" : "20%"
                        })
                    }).fadeIn(2000);
                    setTimeout(() => {
                        $("#coinToss").fadeOut(5000)
                    });
                    return playerOne = true;
                } else {
                    let computerChoice = Math.floor(Math.random() * cPlayer.moves.length)
                    setTimeout(() => computerMove(computerChoice), 9000);
                    $("#playerOneCapture").off("click"); // prevents pOne capture pot from being manipulated
                    $("#playerTwoCapture").off("click"); // prevents pTwo capture pot from being manipulated
                    $(".pOnePots").off("click");
                    $("#coinToss").fadeOut(2000, () => {
                        $("#coinToss").html("Player Two Starts");
                        $("#coinToss").css({
                            "left" : "20%",
                            "top" : "20%"
                        })
                    }).fadeIn(2000);
                    setTimeout(() => {
                        $("#coinToss").fadeOut(5000)
                    });
                    return playerOne = false;
                }
            })
    })()

        // End game
        // when it's the players turn and their side === 0 (all their mini-pots === 0)
        // all of opponents mini pot points gets added to their capture pot
        // whichever capture pot is higher
        // corresponds to the winning player

        function pOneEndGame() {
            let pOnePotsTotal = 1;
            let pTwoPotsTotal = 1;
            setTimeout(() => {
            $P_ONE.forEach((item) => {pOnePotsTotal+= parseInt(item.val())});
            $P_TWO.forEach((item) => {pTwoPotsTotal+= parseInt(item.val())});
            return pOnePotsTotal, pTwoPotsTotal;
            }, 2500)
            setTimeout(() => {
                if(playerOne === false && pTwoPotsTotal === 1) {
                    let pOneCapture = parseInt($("#playerOneCapture").val());
                    $("#playerOneCapture").val(pOneCapture + pOnePotsTotal - 1);
                    for(let l = 0; l < 6; l++) {
                        $P_ONE[l].val("0");
                    }
                    setTimeout(() => {
                    if(parseInt($("#playerOneCapture").val()) > parseInt($("#playerTwoCapture").val())) {
                        P_ONE_WINNER();
                    } else if(parseInt($("#playerTwoCapture").val()) > parseInt($("#playerOneCapture").val())) {
                        P_TWO_WINNER();
                    } else {
                        P_ONE_TWO_TIE();
                    }
                    }, 500);
                    setTimeout(() => location.reload(), 10000);
                }
            }, 2600)
        }

        function pTwoEndGame() {
            let pOnePotsTotal = 1;
            let pTwoPotsTotal = 1;
            setTimeout(() => {
            $P_ONE.forEach((item) => {pOnePotsTotal+= parseInt(item.val())});
            $P_TWO.forEach((item) => {pTwoPotsTotal+= parseInt(item.val())});
            return pOnePotsTotal, pTwoPotsTotal;
            }, 2500)
            setTimeout(() => {
                if(playerOne === true && pOnePotsTotal === 1) {
                    let pTwoCapture = parseInt($("#playerTwoCapture").val());
                    $("#playerTwoCapture").val(pTwoCapture + pTwoPotsTotal - 1);
                    for(let m = 0; m < 6; m++) {
                        $P_TWO[m].val("0");
                    }
                    setTimeout(() => {
                    if(parseInt($("#playerOneCapture").val()) > parseInt($("#playerTwoCapture").val())) {
                        P_ONE_WINNER();
                    } else if(parseInt($("#playerTwoCapture").val()) > parseInt($("#playerOneCapture").val())) {
                        P_TWO_WINNER();
                    } else {
                        P_ONE_TWO_TIE();
                    }
                    }, 500);
                    setTimeout(() => location.reload(), 10000);
                }
            }, 2600)
        }
    
        // flip player mechanism for ipad or smart phone two player local play

        (function rotateSideToPlayer() {
            let rotateOne = false;
            let rotateTwo = false;

            const FLIP_P_ONE = () => {
                if(rotateOne === false) {
                    $P_ONE.forEach((item) => {
                        item.css({
                            "transform" : "rotateZ(180deg)"
                        });
                    })
                    $("#playerOneCapture").css({
                            "transform" : "rotateZ(180deg)",
                            "border-radius" : "50% 0% 0% 50%"
                        });
                    return rotateOne = true;
                } else {
                    $P_ONE.forEach((item) => {
                    item.css({
                        "transform" : "rotateZ(360deg)"
                    });
                })
                    $("#playerOneCapture").css({
                            "transform" : "rotateZ(360deg)",
                            "border-radius" : "0% 50% 50% 0%"
                        });
                    return rotateOne = false;
                }
            };

            const FLIP_P_TWO = () => {
                if(rotateTwo === false) {
                    $P_TWO.forEach((item) => { 
                        item.css({
                            "transform" : "rotateZ(180deg)"
                        })
                    })
                    $("#playerTwoCapture").css({
                            "transform" : "rotateZ(180deg)",
                            "border-radius" : "0% 50% 50% 0%"
                        });
                    return rotateTwo = true;
                } else {
                    $P_TWO.forEach((item) => { 
                        item.css({
                            "transform" : "rotateZ(360deg)"
                        })
                    })
                    $("#playerTwoCapture").css({
                            "transform" : "rotateZ(360deg)",
                            "border-radius" : "50% 0% 0% 50%"
                        });
                    return rotateTwo = false;
                }
            };

            $FLIP_ONE.on("click", FLIP_P_ONE);
            $FLIP_TWO.on("click", FLIP_P_TWO);
        })();
    };

    // play against another player using app.js or play against the computer using pvc.js
    // when $PVP is pressed, just remove modal to show the main game screen for player 1 vs. Player 2 game
    // when $PVC is pressed, player is assigned player 1 and the computer is assigned player 2
    // give player 2 name field a random name for the computer(array of local names and/or API call to popular names)
    // the computer waits for the coin toss
    // if the computer/player 2 goes first, the computer chooses a random player 2 mini pot after 1 second
    // if player 1 goes first, the computer goes after player 1 move is finished (all +1 to adjacent pots complete, countdown === 0)
    // repeat above function for player 1 true or false (if pot === 0, choose another pot)
    // follow all pre-established rules of the game
    // when computer has no more moves and it's the computer's turn, turn off computer gameplay as the game will then end as usual

    $PVC.on("click", () => {
        cName = ["Jessica", "Taylor", "Ashley", "Michael", "Amanda", "Christopher", "Sarah", "Matthew", "Jennifer", "Joshua", "Amy"];
        randomName = Math.floor(Math.random() * cName.length);
        cPlayer = {
            name : cName[randomName],
            moves : $P_TWO
        };
        $("#playerTwo").val(cPlayer.name);
        CLOSE_PLAYER_MODAL();
        playerVsComputer();
    })
/* setInterval(() => console.log(cName, randomName, cPlayer), 1000); */
});