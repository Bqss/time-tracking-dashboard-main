const menus = document.querySelectorAll('.menus li');
const boxs = document.querySelectorAll('.box');

const loadData = async (timeframes) => {
    try {
        let data = await fetch('./data.json');
        data = await data.json();
        data.forEach((val, id) => {
            const { current, previous } = val.timeframes[timeframes];
            const box = boxs[id];
            animate(box.querySelector('.current'), 'current', current);
            animate(box.querySelector('.previous'), 'previous', previous);
        })
    } catch (error) {
        console.log(error)
    }
}

const animate = (element, timeStamp, hours) => {
    let start = 0;
    const duration = 5;
    const speed = 10;
    const grow = hours * (speed / 100) / duration;
    const timer = setInterval(() => {
        if (hours == 0) {
            element.innerText = 0;
            clearInterval(timer)
        }
        if (start <= hours) {
            element.innerText = generateLabel(Math.round(start), timeStamp);
            start += grow;
        } else {
            clearInterval(timer);
        }
    }, speed)
}

const generateLabel = (numOfH, label) => {
    const res = numOfH > 1 ? numOfH + 'hrs' : numOfH + 'hr';
    return label === 'current' ? res : `Last Week - ${res}`
}

menus.forEach(e => {
    e.addEventListener('click', (event) => {
        loadData(event.target.innerText.toLowerCase());
        menus.forEach(e => e.classList.remove('active'))
        event.target.classList.add('active');

    })
});

loadData('weekly');



