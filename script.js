

//Auto Writing Text
var index=0; 
var text="Take a look at some of my projects down below!    ";
function writeText( ){
    if(index<text.length+1){
        document.getElementById("autoText").innerText="T"+text.slice(1,index);
        index++;
    }else{
        index=0; 
    }
}
setInterval(writeText,100);


//Info PopUp
window.onload=function(){
    const closePopUpButton= document.getElementById("infoClose");
    closePopUpButton.addEventListener("click",function(){
        document.getElementById("infoContainer").style.display="none";
    })

    const openPopUpButton= document.getElementById("info");
    openPopUpButton.addEventListener("click",function(){
        document.getElementById("infoContainer").style.display="flex";
    })
    ActivateGame();
    CreateBackgroundElement();
}


//Animated Background
function CreateBackgroundElement(){
    var backgroundContainer=document.getElementById("backgroundContainer");
    var elemento= document.createElement('div');
    elemento.classList.add('backgroundElement');
    elemento.style.top=Math.random()* 100 + "vw";
    elemento.style.left="-10vw";
    let rnd= Math.random()*2;
    rnd<1? elemento.innerText= "<Vittorio Schiavon>" : elemento.innerText= "</Vittorio Schiavon>";
    backgroundContainer.appendChild(elemento);
    setTimeout(()=>{
        elemento.remove();
    },5000);
}

setInterval(CreateBackgroundElement,1000);


//Game
var gameOn=false;
var topTemp=500;
var leftTemp=500;
function ActivateGame(){
    const startButton= document.getElementById("startGame");
    startButton.addEventListener("click",function(){
        document.getElementById("player").style.display="block";
        startButton.style.display="none";
        gameOn=true;
        PlayGame();
    })
       
}

function PlayGame(){
    let player=document.getElementById("player");
    document.addEventListener('keypress', (event) => {
        var name = event.key;
        if (name === 'd' && gameOn) {
          leftTemp+=5;
        }
        if (name === 'a' && gameOn) {
            leftTemp+=-5;
          }
        if (name === 's' && gameOn) {
            topTemp+=5;
        }
        if (name === 'w' && gameOn) {
            topTemp+=-5;
        }
        console.log(topTemp);
        console.log(leftTemp);
        player.style.top = topTemp +"px";
        player.style.left = leftTemp +"px";
      });
}