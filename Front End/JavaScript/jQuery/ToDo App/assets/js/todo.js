// Check off specific todos by clicking
$('ul').on("click","li",function(){
	$(this).toggleClass("completed")
})

//delete button
$('ul').on("click",".trash",function(event){
	$(this).parent().fadeOut(200, function(){
		$(this).remove();
	});
	event.stopPropagation();
})

$('input[type="text"]').keypress(function(e){
	if (e.which === 13) {
		//grab new todo text
		let todoText = $(this).val();
		//delete input text
		$(this).val("");
		//create a new li and add to ul using append()
		$('ul').append(`<li><span class="trash"><i class='fa fa-trash'></i></span> ${todoText}</li>`)
	}
})

//plus button functionality
$('.fa-plus').click(function(){
	$('input[type="text"]').fadeToggle(300);
	});
