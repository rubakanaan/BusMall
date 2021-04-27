"use strict";

let imgArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg',
    'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
    'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg',
    'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif',
    'water-can.jpg', 'wine-glass.jpg'];


const imgSection = document.getElementById('imgSection');
const leftImg = document.getElementById('leftImg');
const rightImg = document.getElementById('rightImg');
const middleImg = document.getElementById('middleImg');
const button = document.getElementById("button");
const article = document.getElementById('article');
const ulEl = document.createElement('ul');
article.appendChild(ulEl);




function images(name) {
    this.name = name.split('.')[0];
    this.img = './img/' + name;
    this.shown = 0;
    this.clicks = 0;
    images.all.push(this);

}

images.all = [];

for (let i = 0; i < imgArr.length; i++) {
    new images(imgArr[i]);
}

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
let click = 0;
let left = -1;
let right = -1;
let middle = -1;

function imgRender() {
    let lIndex = getRandomNum(0, imgArr.length - 1);
    let mIndex;
    let rIndex;

    if (lIndex == left || lIndex == right || lIndex == middle) {
        lIndex = getRandomNum(0, imgArr.length - 1);
    }

    do {
        mIndex = getRandomNum(0, imgArr.length - 1);
        rIndex = getRandomNum(0, imgArr.length - 1);
        if (rIndex == right || rIndex == left || rIndex == middle) {
            rIndex = getRandomNum(0, imgArr.length - 1);
        }

        if (mIndex == middle || mIndex == left || mIndex == right) {
            mIndex = getRandomNum(0, imgArr.length - 1);
        }
    }
    while (lIndex === rIndex || lIndex === mIndex || rIndex == mIndex);

    left = lIndex;
    right = rIndex;
    middle = mIndex;
    console.log("l,m,r " + lIndex, mIndex, rIndex);
    leftImg.src = images.all[lIndex].img;
    middleImg.src = images.all[mIndex].img;
    rightImg.src = images.all[rIndex].img;

    images.all[lIndex].shown++;
    images.all[mIndex].shown++;
    images.all[rIndex].shown++;

}

function eventHandler(e) {
    if ((e.target.id == 'leftImg' || e.target.id == 'rightImg' || e.target.id == 'middleImg') && click < 25) {

        if (e.target.id == 'leftImg') {
            images.all[left].clicks++;
        }

        if (e.target.id == 'rightImg') {
            images.all[right].clicks++;
        }

        if (e.target.id == 'middleImg') {
            images.all[middle].clicks++;
        }
        click++;

        imgRender();


    } else {
        console.log(images.all);
        imgSection.removeEventListener('click', eventHandler);
        CanvasRender();

    }
}

function buttonEvent(e) {
    getData();
    
    for (let i = 0; i < images.all.length; i++) {
        const liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = images.all[i].name + " had " + images.all[i].clicks + ' votes, and was seen ' + images.all[i].shown + ' times.'

    }
    saveData();
    button.removeEventListener('click', buttonEvent);

}

function saveData() {
    localStorage.setItem('ulEl', JSON.stringify(images.all));
}

function getData() {
    let data = JSON.parse(localStorage.getItem('ulEl'));
    // console.log(data);
    // console.log(data.length)
    if (data) {
        for (let i = 0; i < data.length; i++) {
            images.all[i].shown += data[i].shown;
            images.all[i].clicks += data[i].clicks;
            console.log(images.all[i].shown, images.all[i].clicks);
        }
     
    }
}
function CanvasRender() {

    let clicks = [];
    let names = [];
    let shown = [];
    for (let i = 0; i < images.all.length; i++) {
        clicks.push(images.all[i].clicks);
        names.push(images.all[i].name);
        shown.push(images.all[i].shown);
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: '# of Votes',
                data: clicks,
                backgroundColor:
                    'rgba(101, 210, 188, 0.2)',
                borderColor:
                    'rgba(101, 210, 188, 1)',

                borderWidth: 1

            },
            {
                label: '# of shown',
                data: shown,
                backgroundColor:
                    'rgba(11, 61, 122, 0.2)',
                borderColor:
                    'rgba(11, 61, 122, 1)',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

imgSection.addEventListener('click', eventHandler);
imgRender();

button.addEventListener('click', buttonEvent);
