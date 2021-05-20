

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
    getQuote();
}


//Animated Background
function CreateBackgroundElement(){
    var backgroundContainer=document.getElementById("backgroundContainer");
    var elemento= document.createElement('div');
    elemento.classList.add('backgroundElement');
    let height= window.innerHeight;
    let width= window.innerWidth;
    elemento.style.top=Math.random()* height + "px";
    elemento.style.left="-10px";
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
var topTemp=50;
var score=0;
function ActivateGame(){
    const startButton= document.getElementById("startGame");
    startButton.addEventListener("click",function(){
        document.getElementById("player").style.display="block";
        startButton.style.display="none";
        enemyCount=true;
        gameOn=true;
        PlayGame();
    })
       
}

function PlayGame(){
    let player=document.getElementById("player");
    document.addEventListener('keypress', (event) => {
        var name = event.key;
        if (name === 's' && gameOn && topTemp<85) {
            topTemp+=5;
        }
        if (name === 'w' && gameOn && topTemp>0) {
            topTemp+=-5;
        }
        console.log(topTemp);
           
        player.style.top = topTemp +"%";


      });
      
      setInterval(UpdateGame,10);

      
}



var enemyCount=true;

function UpdateGame(){
    
    if(enemyCount==true){
        var movingGameBoard=document.getElementById("movingGameBoard");
        var enemy= document.createElement('div');
        enemy.classList.add('enemy');
        enemy.style.top=Math.random()* 90 + "%";
        enemy.style.left="100%";
        movingGameBoard.appendChild(enemy);
        enemyCount=false;
        
    }

    if(enemyCount==false){
        checkCollision();
        moveEnemy();
    }

}

function moveEnemy(){


    var enemy=document.querySelector(".enemy");
    let velocity= window.innerWidth/100;
    var enemyLeftTemp=parseInt( window.getComputedStyle(enemy).getPropertyValue("left"))-velocity;
    
    enemy.style.left = enemyLeftTemp + "px";


    if(enemyLeftTemp<-100){
        enemy.remove();
        enemyCount=true;
        increaseScore();
    }
    
}

function checkCollision(){
    
    var playerRight = parseInt( window.getComputedStyle(document.getElementById("player")).getPropertyValue("left"));
    var playerTop = parseInt( window.getComputedStyle(document.getElementById("player")).getPropertyValue("top"));
    var playerHeight= parseInt( window.getComputedStyle(document.getElementById("player")).getPropertyValue("height"));

    let enemy=document.querySelector(".enemy");

    var enemyLeft = parseInt( window.getComputedStyle(enemy).getPropertyValue("left"));
    
    var enemyTop = parseInt( window.getComputedStyle(enemy).getPropertyValue("top"));
    var enemyHeight= parseInt( window.getComputedStyle(enemy).getPropertyValue("height"));



    if(enemyLeft<=playerRight && enemyTop>playerTop-enemyHeight && enemyTop<playerHeight+playerTop ){
        //alert("ciao");
        
        enemy.remove();
        enemyCount=true;
        gameOver();

    }

}


function increaseScore(){
    score++;
    let scoreHTML= document.getElementById("score");
    scoreHTML.innerHTML="Your score is: "+score;
}

function gameOver(){
    alert(`Game Over :( , your score is: ${score}`);
    location.reload();

}




//REVIEW

function getQuote(){
    fetch(`https://type.fit/api/quotes`)
    .then(res=> res.json())
    .then((data) => {
        setQuote(data);
   })

}


function setQuote(exactData){

    let id= parseInt(Math.random()*1600);

    let name= document.getElementById("name");
    name.innerText= exactData[id].author;

    let quote= document.getElementById("quote");
    quote.innerText= '"'+ exactData[id].text+'"';

    let nextQuote= document.getElementById("nextQuote");
    nextQuote.addEventListener("click", function(){
        setQuote(exactData);
    });

}



