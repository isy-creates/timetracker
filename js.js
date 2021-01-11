( function (){
  
  let seconds = 0, minutes = 0, hours = 0;
  let timer;
  let paused = false;

  const DOMStrings = {
    seconds: document.getElementById('seconds'),
    minutes: document.getElementById('minutes'),
    hours: document.getElementById('hours'),
    start: document.getElementById('start'),
    stop: document.getElementById('stop'),
    time: document.querySelectorAll('.framed-time')
  }

  DOMStrings.start.addEventListener('click', start);
  DOMStrings.stop.addEventListener('click', stop);

  function start() {
    //initialise the timer only, when the var timer is not set yet
    if(!timer) {
      //let the timer run every second
      timer = setInterval(run, 1000);
      DOMStrings.start.textContent = 'Pause';
      if (paused) {
        DOMStrings.time.forEach( x => x.classList.remove('paused') );
      }
    } else {
      pause();
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
    paused = true;
    DOMStrings.start.textContent = 'Fortsetzen';
    DOMStrings.time.forEach( x => x.classList.add('paused') );
  }

  function stopTimer(){
    clearInterval(timer);
    timer = false;
  }


})();