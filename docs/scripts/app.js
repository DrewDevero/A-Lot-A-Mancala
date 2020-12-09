// have each player mini pot start with 4 beads
// each player capture pot starts empty
// when a player chooses a pot, the concurrent pots are filled with one bead each from the origin pot (pot++), leaving the origin pot empty (pot = 0)
// when one side has no more beads (all pOne OR all pTwo === 0) remaining beads in player mini pots goes into player with remaining beads capture pot (player capture pot += remaining beads)
// Highest count of player capture pot beads wins.
// Game resets

$(() => {
    console.log("hello", $(".miniPots").length);
    console.log($("input[type=submit]").length);
});
$("form").on("submit", (e) => {
    e.preventDefault();
})

// function applies ability to click a button and make that individual button value equal to zero and adds to the adjacent button

/* function applyZero(toZero) {
    $("input[type=submit]").eq(toZero).click(()=> {
            const valueOne = parseInt($("input[type=submit]").eq(toZero).val());
            const valueTwo = parseInt($("input[type=submit]").eq(toZero+1).val());
            const addedValues = valueOne + valueTwo
            $("input[type=submit]").eq(toZero+1).val(addedValues)
            console.log(addedValues);
            $("input[type=submit]").eq(toZero).val("0");
            console.log($("input[type=submit]").eq(toZero));
    })
    if (toZero < $("input[type=submit]").length - 2) {
        applyZero(toZero+1);
    }
    $("input[type=submit]").eq(13).click(()=> {
            const valueOne = parseInt($("input[type=submit]").eq(13).val());
            const valueTwo = parseInt($("input[type=submit]").eq(0).val());
            const addedValues = valueOne + valueTwo
            $("input[type=submit]").eq(0).val(addedValues)
            console.log(addedValues);
            $("input[type=submit]").eq(13).val("0");
            console.log($("input[type=submit]").eq(13));
    })
}
applyZero(0); */

// prevents capture pots from being manipulated

/* $("#playerOneCapture").off("click");
$("#playerTwoCapture").off("click");
 */
// when the player chooses from one of their mini-pots
// the mini-pot value = 0
// adjacent pot gets + 1 
// count down from initial value of pot
// keep adding one to subsequent pots until count === 0

function applyZero(toZero) {
    $("input[type=submit]").eq(toZero).click(()=> {
            const valueOne = parseInt($("input[type=submit]").eq(toZero).val());
            const valueTwo = parseInt($("input[type=submit]").eq(toZero+1).val());
            const addedValues = valueOne + valueTwo
            $("input[type=submit]").eq(toZero+1).val(addedValues)
            console.log(addedValues);
            $("input[type=submit]").eq(toZero).val("0");
            console.log($("input[type=submit]").eq(toZero));
    })
    if (toZero < $("input[type=submit]").length - 2) {
        applyZero(toZero+1);
    }
    $("input[type=submit]").eq(13).click(()=> {
            const valueOne = parseInt($("input[type=submit]").eq(13).val());
            const valueTwo = parseInt($("input[type=submit]").eq(0).val());
            const addedValues = valueOne + valueTwo
            $("input[type=submit]").eq(0).val(addedValues)
            console.log(addedValues);
            $("input[type=submit]").eq(13).val("0");
            console.log($("input[type=submit]").eq(13));
    })
}
applyZero(0);

// prevents capture pots from being manipulated

$("#playerOneCapture").off("click");
$("#playerTwoCapture").off("click");

