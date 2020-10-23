var card = document.querySelectorAll("img");
var start = document.querySelector("#strt");
var seconds = document.querySelector("#sec");
var minutes = document.querySelector("#min");
var solveButton = document.querySelector("#solve");
var newGame = document.querySelector("#nGame");
var gameOn = false;
var elements = ["img/bewd.jpg"
				,"img/rebd.jpg"
				,"img/kuribuh.jpg"
				,"img/darkMagician.jpg"
				,"img/slifer.jpg"
				,"img/ra.png"
				,"img/obelsik.jpg"
				,"img/mirrorForce.jpg"
				,"img/trapHole.png"
				,"img/curseOfDragon.jpg"
				,"img/summonedSkull.jpg"
				,"img/lob-e047.jpg"
				,"img/exodia.jpg"
				,"img/swordsOfLight.jpg"
				,"img/changeOfHeart.jpg"
				,"img/stardust.png"
				,"img/theSealOfOrichalcos.png"
				,"img/TimeWizard.jpg"
				,"img/bewd.jpg"
				,"img/rebd.jpg"
				,"img/kuribuh.jpg"
				,"img/darkMagician.jpg"
				,"img/slifer.jpg"
				,"img/ra.png"
				,"img/obelsik.jpg"
				,"img/mirrorForce.jpg"
				,"img/trapHole.png"
				,"img/curseOfDragon.jpg"
				,"img/summonedSkull.jpg"
				,"img/lob-e047.jpg"
				,"img/exodia.jpg"
				,"img/swordsOfLight.jpg"
				,"img/changeOfHeart.jpg"
				,"img/stardust.png"
				,"img/theSealOfOrichalcos.png"
				,"img/TimeWizard.jpg"];
var memory =[];
var memoryIndex;
var secIndex;
var flipped = 0;
var timerSec = 0;
var timerMin = 0;
var timeInterval;
Array.prototype.shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function timer(){
		timerSec++;
		if(timerSec<10) seconds.textContent ="0" +timerSec;
		else if(timerSec<60) seconds.textContent =timerSec;
		else{
			timerSec=0;
			seconds.textContent ="00"
			timerMin ++;
			if(timerMin<10) minutes.textContent ="0" +timerMin;
			else minutes.textContent =timerMin;
		}

}
function unreveal(){
	card[secIndex].setAttribute("src","img/back.jpg");//the last selected card
	card[memoryIndex].setAttribute("src","img/back.jpg");//the first selected card
	for(var i = 0 ; i <card.length ; i++){
		card[i].addEventListener("click",flipping);
	}
}
function eleminate(){
	document.getElementById(String(memoryIndex)).style.display='none';
	document.getElementById(String(secIndex)).style.display='none';

}
function flipping(){
			//secIndex = null;
			//console.log(this.getAttribute("src"));
			this.removeEventListener("click",flipping);
			if(memory.length===0){
				this.setAttribute("src",elements[this.getAttribute("id")]);//reveal
				memory.push(elements[this.getAttribute("id")]);//path
				memoryIndex = Number(this.getAttribute("id"));//i
				//this.removeEventListener("click",flipping);
			}
			else if(memory.length===1){
				//to avoid stupid clicking
				for(var i = 0 ; i <card.length ; i++){
					card[i].removeEventListener("click",flipping);
				}

				this.setAttribute("src",elements[this.getAttribute("id")]);//reveal
				secIndex = Number(this.getAttribute("id"));//i
				memory.push(elements[this.getAttribute("id")]);//path

				if(elements[card[secIndex].getAttribute("id")]==memory[0]){
					flipped+=2;
					card[memoryIndex].removeEventListener("click",flipping);
					card[secIndex].removeEventListener("click",flipping);
					setTimeout(eleminate,500);
					for(var i = 0 ; i <card.length ; i++){
					card[i].addEventListener("click",flipping);
					}
					memory=[];
					//game over !!
					if(flipped === 36){
						for(var i = 0 ; i <card.length ; i++){
							card[i].removeEventListener("click",flipping);
						}
						solveButton.disabled = true;
						clearInterval(timeInterval);
						setTimeout(function(){
							alert('Game Over!\n' +'You did it in '+timerMin+' minutes and '+timerSec+' seconds!');
						},500);
					}
				}else{
					card[memoryIndex].removeEventListener("click",flipping);
					card[secIndex].removeEventListener("click",flipping);
					memory=[];
					setTimeout(unreveal, 500);
				 }
			card[memoryIndex].addEventListener("click",flipping);				
			}
}

//solve button & New game button are disabled
solveButton.disabled = true;
newGame.disabled = true;



//gameStart!!
start.addEventListener("click",function(){
	solveButton.disabled = false;
	newGame.disabled = false;
	start.disabled= true;
	elements.shuffle();
	//flipping photos
	for(var i = 0 ; i <card.length ; i++){
		card[i].addEventListener("click",flipping);
			}
	
	//time
		timeInterval=setInterval(timer,1000);
});
//solve (uncover all cards)
solveButton.addEventListener("click",function(){
	for(var i = 0 ; i<card.length;i++){
		card[i].setAttribute("src",elements[card[i].getAttribute("id")]);
	}
	clearInterval(timeInterval);
	for(var i = 0 ; i <card.length ; i++){
		card[i].removeEventListener("click",flipping);
			}
});

//start a new game
newGame.addEventListener("click",function(){
	document.location.reload(true);
});
