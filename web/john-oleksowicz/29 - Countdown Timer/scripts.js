const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  const countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutesLeft = Math.floor(seconds / 60);
  const secondsLeft = numberWithLeadingZero(seconds % 60);
  const display = `${minutesLeft}:${secondsLeft}`;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours() <= 12 ? end.getHours() : end.getHours() - 12;
  const suffix = end.getHours() >= 12 ? 'pm' : 'am';
  const minutes = numberWithLeadingZero(end.getMinutes());
  endTime.textContent = `Be back at ${hour}:${minutes}${suffix}`;
}

function numberWithLeadingZero(number) {
  return number < 10 ? '0' + number : number;
}