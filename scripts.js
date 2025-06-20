let images = document.querySelectorAll('.slider-image-wrapper .item');
let items = document.querySelectorAll('.page-list-item');
let slider = document.querySelector('.slider-image-wrapper');
let currentItem = 0;
let isEnabled = true;

function refreshPageCount(){
    document.getElementById('page').innerHTML = "0" + (currentItem+1) + " | 05";
    document.querySelector('.page-list-item.current').classList.remove('current');
    items[currentItem].classList.add('current');
}

function refreshItems(){
    document.querySelector('.item.active').classList.remove('active');
    document.querySelector('.item.next').classList.remove('next');
    document.querySelector('.item.prev').classList.remove('prev');
    images[currentItem].classList.add('active');
    images[(currentItem+1+images.length)%images.length].classList.add('next');
    images[(currentItem-1+images.length)%images.length].classList.add('prev');
}

function changeCurrentItem(n){
    currentItem = (n+images.length)%images.length;
}

function nextItem(n){
    changeCurrentItem(n+1);
}

function prevItem(n){
    changeCurrentItem(n-1);
}



const handleFromLeftToRight = () =>{
    if (isEnabled){
        isEnabled=false;
        slider.classList.add('to-right');
        prevItem(currentItem);
        slider.addEventListener('animationend', function (){
            slider.classList.remove('to-right');
            refreshItems();
            isEnabled=true;
        });
        refreshPageCount();
    }
}

const handleFromRightToLeft = () =>{
    if (isEnabled){
        isEnabled=false;
        slider.classList.add('to-left');
        nextItem(currentItem);
        slider.addEventListener('animationend', function (){
            slider.classList.remove('to-left');
            refreshItems();
            isEnabled=true;
        });
        refreshPageCount();
    }
}

document.querySelector('.right-arrow').addEventListener('click', handleFromRightToLeft);
document.querySelector('.left-arrow').addEventListener('click', handleFromLeftToRight);
document.body.addEventListener('mouse', refreshPageCount);

function swipeDetect(el){
    let startX = 0;
    let distX = 0;
    let surface = el;
    
    surface.addEventListener('mousedown', function(event){
        startX = event.pageX;
        event.preventDefault();
    });

    surface.addEventListener('mouseup', function(event){
        distX = event.pageX - startX;
        if (Math.abs(distX)>50){
            if (distX > 0){
                handleFromLeftToRight();
            } else{
                handleFromRightToLeft();
            }
        }
    });
    
    surface.addEventListener('touchmove', function(event){
        event.preventDefault();
    })
}

let el = document.querySelector('.slider-image-wrapper');
swipeDetect(el);