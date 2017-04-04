function next (e) {
    
}

function prev (e) {
    
}

$( document ).ready(function() {
    $("body").scrollsteps({
        up: prev,
        down: next,
        transitionDuration: 1000,
        quietPeriodBetweenTwoScrollEvents: 200,
    });
});
