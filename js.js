( function (){

  //TODO
  //Remove 60s and 60m out of the counter
  //cleanup
  
  var seconds = 0, minutes = 0, hours = 0;
  let timer;
  let paused = false;
  let localSeconds = localStorage.getItem('timer-seconds');
  let localMinutes = localStorage.getItem('timer-minutes');
  let localHours = localStorage.getItem('timer-hours');

  const DOMStrings = {
    seconds: document.getElementById('seconds'),
    minutes: document.getElementById('minutes'),
    hours: document.getElementById('hours'),
    start: document.getElementById('start'),
    stop: document.getElementById('stop'),
    time: document.querySelectorAll('.framed-time')
  }

  document.addEventListener('DOMContentLoaded', checkLocalStorage);
  DOMStrings.start.addEventListener('click', start);
  DOMStrings.stop.addEventListener('click', stop);

  function checkLocalStorage(){

    seconds = localSeconds;
    minutes = localMinutes;
    hours = localHours;

    if (localSeconds) {
      DOMStrings.seconds.textContent = (seconds < 10 ? "0" + seconds : seconds);
      DOMStrings.minutes.textContent = (minutes < 10 ? "0" + minutes : minutes);
      DOMStrings.hours.textContent = (hours < 10 ? "0" + hours : hours);
    }
  }



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
    DOMStrings.seconds.textContent = addZero(seconds % 60);
    
    if (seconds == 60) {
      seconds = 0;
      minutes ++;
      DOMStrings.minutes.textContent = addZero(minutes % 60);
    }

    if(minutes == 60) {
      minutes = 0;
      hours ++;
      DOMStrings.hours.textContent = addZero(hours);
    }
    
  }

  function stop() {
    stopTimer();
    seconds = 0;
    minutes = 0;
    hours = 0;
    DOMStrings.seconds.textContent = addZero(seconds % 60);
    DOMStrings.minutes.textContent = addZero(minutes % 60);
    DOMStrings.hours.textContent = addZero(hours);
    localStorage.removeItem('timer-minutes');
    localStorage.removeItem('timer-seconds');
    localStorage.removeItem('timer-hours');
  }

  function pause(){
    stopTimer();
    paused = true;
    DOMStrings.start.textContent = 'Fortsetzen';
    DOMStrings.time.forEach( x => x.classList.add('paused') );
    localStorage.setItem('timer-minutes', minutes);
    localStorage.setItem('timer-seconds', seconds);
    localStorage.setItem('timer-hours', hours);
  }

  function stopTimer(){
    clearInterval(timer);
    timer = false;
  }

  function addZero(val){
    var valString = val + "";

    if(valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }


})();