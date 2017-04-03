function next (e) {
    
}

function prev (e) {
    
}

$( document ).ready(function() {
    $("body").scrollsteps({
        up: yourUpFunction,
        down: yourUpFunction,
        transitionDuration: 1000,
        quietPeriodBetweenTwoScrollEvents: 200,
    });
}
