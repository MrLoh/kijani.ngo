function reorderComments() {
	if( $(window).width() <= 1023 ) {
		$('#comments').insertBefore($('.articles'));
		$('.author').insertBefore($('.subscribe'));
	} else {
		$('#comments').insertAfter($('.articles'));
		$('.author').insertAfter($('.subscribe'));
	}
}

jQuery(document).ready(function($){
	reorderComments();
	$(window).resize(reorderComments);
	$(".post-area").slideUp();
	$(".comment-area textarea").focus(function(){
		$(".post-area").slideDown();
	});
	$('textarea').on('keydown', function(e){
		var that = $(this);
		if (that.scrollTop()) {
			$(this).height(function(i,h){
				return h + 24;
			});
		}
	});
});