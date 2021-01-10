( function (){
  
  let seconds = 0, minutes = 0, hours = 0;
  let timer;

  const DOMStrings = {
    seconds: document.getElementById('seconds'),
    minutes: document.getElementById('minutes'),
    hours: document.getElementById('hours'),
    start: document.getElementById('start'),
    stop: document.getElementById('stop'),
    pause:document.getElementById('pause')
  }

  DOMStrings.start.addEventListener('click', start);
  DOMStrings.stop.addEventListener('click', stop);
  DOMStrings.pause.addEventListener('click', pause);

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

    if(minutes == 60) {
      minutes = 0;
      hours ++;
      DOMStrings.hours.textContent = (hours < 10 ? "0" + hours : hours);
    }
    
  }

  function stop() {
    stopTimer();
    seconds = 0;
    minutes = 0;
    hours = 0;
    DOMStrings.seconds.textContent = (seconds < 10 ? "0" + seconds : seconds);
    DOMStrings.minutes.textContent = (minutes < 10 ? "0" + minutes : minutes);
    DOMStrings.hours.textContent = (hours < 10 ? "0" + hours : hours);
  }

  function pause(){
    stopTimer();
  }

  function stopTimer(){
    clearInterval(timer);
    timer = false;
  }


})();