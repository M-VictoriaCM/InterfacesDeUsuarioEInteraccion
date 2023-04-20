const minutes = document.getElementById('min');
const seconds = document.getElementById('sec');
const hours = document.getElementById('hour');

setInterval(() => {
    let date = new Date;

    let dateSeconds= date.getSeconds();
    let dateMinutes = date.getMinutes(); 
    let dateHours = date.getHours(); 

    secondsDeg = 6 * dateSeconds;
    minutesDeg = 6 * dateMinutes;
    hoursDeg = 30 *dateHours + dateMinutes/2;

    seconds.style.transform = `rotate(${secondsDeg}deg)`;
    minutes.style.transform = `rotate(${minutesDeg}deg)`;
    hours.style.transform = `rotate(${hoursDeg}deg)`;
}, 1000);