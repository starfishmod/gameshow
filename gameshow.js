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

///------------------ End Click Handling --------------------------
var teams = {
	a: {
		name: "Team A",
		score: 0,
		button: 0,
		},
	b: {
		name: "Team b",
		score: 0,
		button: 5,
		}
	};

var stages = {
  
};
	
var button=[];
button[0]='a';
button[5]='b';

	
calloutQs = function(){
	$(window).on('buzzclick.callout',function(event){
		console.log(event.originalEvent.detail);
		var evDetail = event.originalEvent.detail;
		if(evDetail.button%5!=0)return;
		
		$(window).off('buzzclick.callout');
		$(window).on('mousedown.callout', function(event){
          event.preventDefault();
          event.stopPropagation();
			$(window).off('mousedown.callout');
			if (event.which===1){
				//Correct
				teams[button[evDetail.button]].score++;
			}else if (event.which===3){
				//inCorrect
				teams[button[evDetail.button]].score--;
			}else if (event.which===2){
				//end it
				return;
			}
			console.log(JSON.stringify(teams));
			calloutQs();
		});
		
	});
}	

$(document).ready(function(){
	/*$(".slide").presentation({
		'screenArrows':false,
		'slideClick':false,
		'tableContents':true
	});*/
	
	//obj.addEventListener("cat", function(e) { process(e.detail) })
	/*$(window).on('buzzclick',function(event){
		console.log(event.originalEvent.detail);
	});*/
	calloutQs();
});
