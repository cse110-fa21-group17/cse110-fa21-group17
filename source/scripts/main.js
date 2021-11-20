// main.js

import { Router } from './Router.js';

const router = new Router(function () {
  document.querySelector('section.card-flex-container').classList.remove('hidden');
  document.querySelector('section.add-new-form').classList.add('hidden');
});

router.addPage('newrecipe', function() {
  document.querySelector('section.card-flex-container').classList.add('hidden');
  document.querySelector('section.add-new-form').classList.remove('hidden');
});

window.addEventListener('DOMContentLoaded', init);

// Initialize function, begins all of the JS code in this file
async function init() {
    //document.querySelector('section.card-flex-container').classList.remove('hidden');
    //document.querySelector('section.add-new-form').classList.add('hidden');
    router.navigate('home');
    clickAdd();
    escReturn();
    backForward();
    //router.navigate('newrecipe');
}

function clickAdd() {
    document.getElementsByClassName('button')[0].addEventListener('click', function() {
        router.navigate('newrecipe');
    });
}

function escReturn() {
    window.addEventListener('keydown', e => {
        if(e.key==='Escape'){
            router.navigate('home');
        }
    });
}

function backForward() {
    window.addEventListener('popstate', e => {
        if(!e.state){
            router.navigate('home', true);
          } else {
            router.navigate(e.state.page, true);
        }
    })
}