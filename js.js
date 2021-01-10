( function (){
  
  let seconds = 0, minutes = 0, hours = 0;
  let timer;

  const DOMStrings = {
    seconds: document.getElementById('seconds'),
    minutes: document.getElementById('minutes'),
    hours: document.getElementById('hours'),
    start: document.getElementById('start'),
    stop: document.getElementById('stop'),
  }

  DOMStrings.start.addEventListener('click', start);
  DOMStrings.stop.addEventListener('click', stop);

  function start() {
    //initialise the timer only, when the var timer is not set yet
    if(!timer) {
      timer = setInterval(run, 1000);
    }
  }

  function run() {
    seconds++;
    DOMStrings.seconds.textContent = (seconds < 10 ? "0" + seconds : seconds);
    
    if (seconds == 60) {
      seconds = 0;
      minutes ++;
      DOMStrings.minutes.textContent = (minutes < 10 ? "0" + minutes : minutes);
    }
    
  }

  function stop() {
    clearInterval(timer);
  }


})();