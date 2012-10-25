function updateStatus() {
    window.webkitRequestAnimationFrame(updateStatus);
    window.gamepad = window.gamepad ||[];

    var gamepads = navigator.webkitGetGamepads();

    //var data = '';
    for (var padindex = 0; padindex < gamepads.length; ++padindex)
    {
        var pad = gamepads[padindex];
        if (!pad) continue;
        if(!window.gamepad[padindex])window.gamepad[padindex]={buttons:new Array(pad.buttons.length + 1).join(0).split('')};
       // data += '<pre>' + pad.index + ": " + pad.id + "<br/>";
        for (var i = 0; i < pad.buttons.length; ++i){
			if(pad.buttons[i]!=window.gamepad[padindex].buttons[i]) {
				window.gamepad[padindex].buttons[i]=pad.buttons[i];
				var myEvent = new CustomEvent("buzzclick", {
				  detail: {
					pad:pad,
					button: i,
					status: pad.buttons[i]
				  }
				});
				//buttonEvent(pad, i, pad.buttons[i]);
				window.dispatchEvent(myEvent);
			}
		}
    }
}




window.webkitRequestAnimationFrame(updateStatus);

$(document).ready(function(){
	$(".slide").presentation({
		'screenArrows':false,
		'slideClick':false,
		'tableContents':true
	});
	
	//obj.addEventListener("cat", function(e) { process(e.detail) })
	$(window).on('buzzclick',function(event){
		console.log(event.originalEvent.detail);
	});
});
