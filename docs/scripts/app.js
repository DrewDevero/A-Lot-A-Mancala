// have each player mini pot start with 4 beads
// each player capture pot starts empty
// when a player chooses a pot, the concurrent pots are filled with one bead each from the origin pot (pot++), leaving the origin pot empty (pot = 0)
// when one side has no more beads (all pOne OR all pTwo === 0) remaining beads in player mini pots goes into player with remaining beads capture pot (player capture pot += remaining beads)
// Highest count of player capture pot beads wins.
// Game resets

$(() => console.log("hello", $(".miniPots").length));
$("form").on("submit", (e) => {
    e.preventDefault();
})

// function applys to ability to click a button and make that individual button value equal to zero
    /* $(".miniPots").click(()=> {
        $("input").val("0");
    }); */

function applyZero(toZero) {
    $("input[type=submit]").eq(toZero).click(()=> {
            $("input[type=submit]").eq(toZero).val("0");
    })
    if (toZero < $("input[type=submit]").length) {
        applyZero(toZero+1);
    }
}
applyZero(0);
