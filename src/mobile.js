function mobile_main () {
	let compression_handler = function (ab, next) {
		return new PNGAnimation(ab, next);
	};
	
	preload = new Preload ([
		["/resources/anim1/anim1.cpng"]
	],[
		compression_handler
	], function () {
		$(preload.logo.get()).addClass ("loaded");
		$(".content").addClass ("loaded");
		
		animation = new AnimationHandler (preload.loads[0][0].urls, 24, document.getElementById('anim1'), [0, -60]);
	});
	
	preload.start ();
	
	timeline = new Timeline([function () {
		$(".timeline > ul").removeClass ("timeline-dark");
		$(".site-grid").removeClass ("dark");
		$(".keyboard")
	}, function () {
		$(".timeline > ul").removeClass ("timeline-dark");
		$(".site-grid").removeClass ("dark");
	}, function () {
		$(".timeline > ul").addClass ("timeline-dark");
		$(".site-grid").addClass ("dark");
	}]);
	
	$(".keyboard .left").click(function () {subtimeline.back ()});
	$(".keyboard .right").click(function () {subtimeline.next ()});
}