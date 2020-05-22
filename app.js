
var score, roundScore, activePlayer, gamePlaying, rollsound;

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
startgame();

document.querySelector('.btn-roll').addEventListener('click', function() {
   if (gamePlaying) { //
        rollsound = new sound("sounds/rolldice.mp3");
        failsound = new sound("sounds/fail.mp3");
        rollsound.play();
        document.querySelector('.dice').style.boxShadow = "0px 10px 60px yellow";
        var dice = Math.floor(Math.random() * 6) + 1;
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'imgs/dice-' + dice + '.png';
        shake();
        if (dice !== 1) { 
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else { 
            document.querySelector('.dice').style.boxShadow = "0px 10px 60px red";
            failsound.play()
            nextPlayer();
        }    
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) { 
        score[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
        if (score[activePlayer] >= 100) { 
            winsound = new sound("sounds/win.mp3");
            winsound.play();
            confetti.toggle();
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!!!';            
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
       }else { 
           nextPlayer();
           }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.querySelector('#current-0').textContent = '0';
        document.querySelector('#current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', startgame);

function startgame() { 
    score =  [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    confetti.stop();
}

function shake()
{
      var elm = document.querySelector('.dice');
      elm.style.animation='';
      setTimeout(function () {elm.style.animation="shake 0.1s ease-in-out 0.1s 3 alternate";},15)
}


