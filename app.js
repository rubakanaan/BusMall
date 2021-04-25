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
let left = 0;
let right = 0;
let middle = 0;

function imgRender() {
    let lIndex = getRandomNum(0, imgArr.length - 1);
    let mIndex = getRandomNum(0, imgArr.length - 1);
    let rIndex = getRandomNum(0, imgArr.length - 1);

    while (lIndex === mIndex) {
        mIndex = getRandomNum(0, imgArr.length - 1);
    }

    while ((rIndex === lIndex) || (rIndex === mIndex)) {
        rIndex = getRandomNum(0, imgArr.length - 1);
    }

    left = lIndex;
    right = rIndex;
    middle = mIndex;
    //console.log("l,m,r "+ lIndex , mIndex, rIndex);
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
        button.addEventListener('click', buttonEvent);
    }
}

function buttonEvent(e) {
    const ulEl = document.createElement('ul');
    article.appendChild(ulEl);

    for (let i = 0; i < images.all.length; i++) {
        const liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = images.all[i].name + " had " + images.all[i].clicks + ' votes, and was seen ' + images.all[i].shown + ' times.'

    }



}

imgSection.addEventListener('click', eventHandler);
imgRender();


