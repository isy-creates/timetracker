( function (){
  
  let timer;
  let paused = false;

  let times = {
    seconds: 0,
    minutes: 0,
    hours:   0
  }

  const local = {
    seconds:  localStorage.getItem('seconds'),
    minutes:  localStorage.getItem('minutes'),
    hours:    localStorage.getItem('hours')
  }

  const DOMStrings = {
    seconds:  document.getElementById('seconds'),
    minutes:  document.getElementById('minutes'),
    hours:    document.getElementById('hours'),
    start:    document.getElementById('start'),
    stop:     document.getElementById('stop'),
    time:     document.querySelectorAll('.framed-time')
  }

  document.addEventListener('DOMContentLoaded', checkLocalStorage);
  DOMStrings.start.addEventListener('click', start);
  DOMStrings.stop.addEventListener('click', stop);


  function checkLocalStorage(){

    times.seconds = local.seconds;
    (local.minutes ? times.minutes = local.minutes : 0);
    (local.hours ? times.hours = local.hours : 0);

    if (local.seconds) {
      for (const [time, duration] of Object.entries(times)) {
        updateDom(time, duration);
      }
    }
  }

  function start() {

    paused = false;

    //initialise the timer only, when the var timer is not set yet
    if(!timer) {
      //let the timer run every second
      timer = setInterval(run, 1000);

      //Change Button 'Start'
      DOMStrings.start.textContent = 'Pause';

      //Remove Paused from Elements
      checkPausedState();

    } else {
      pause();
    }
  }

  function run() {
    times.seconds++;
    updateDom("seconds", times.seconds);
    
    if (times.seconds == 60) {
      times.seconds = 0;
      times.minutes ++;
      updateDom("minutes", times.minutes);
    }

    if(times.minutes == 60) {
      times.minutes = 0;
      times.hours ++;
      updateDom("hours", times.hours);
    }
    
  }

  function stop() {
    paused = false;

    stopTimer();
    checkPausedState();

    times.seconds = 0;
    times.minutes = 0;
    times.hours = 0;

    //Update DOM to current times
    for (const [time, duration] of Object.entries(times)) {
      updateDom(time, duration);
    }

    //Clear LocalStorage of own entries
    for (const time of Object.keys(times)) {
      removeItemInLocalStorage(time);
    }
  }

  function pause(){
    paused = true;

    stopTimer();
    updateButtonText('Fortsetzen');
    checkPausedState();

    //Update entries in Local Storage
    for (const [time, duration] of Object.entries(times)) {
      setitemInLocalStorage(time, duration);
    }
  }

  function setitemInLocalStorage(time, duration){
    localStorage.setItem(time, duration)
  }

  function checkPausedState(){
    if (paused) {
      DOMStrings.time.forEach( item => item.classList.add('paused') );
    } else {
      DOMStrings.time.forEach( item => item.classList.remove('paused') );
    }
  }

  function removeItemInLocalStorage(time) {
    localStorage.removeItem(time);
  }

  function stopTimer(){
    clearInterval(timer);
    updateButtonText('Start');
    timer = false;
  }

  function updateButtonText(text){
    DOMStrings.start.textContent = text;
  }

  function addZero(number){
    //convert to string in order to check length
    let numString = number + "";

    if(numString.length < 2) {
      return "0" + number;
    } else {
      return number;
    }
  }

    //Update DOM to current times
    function updateDom(time, duration) {
      DOMStrings[time].textContent = addZero(duration === "hour" ? duration : duration % 60);
    }

})();