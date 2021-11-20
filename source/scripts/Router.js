// router.js

export class Router {
    static routes = {};
  
    constructor(homeFunc) {
      this['home'] = homeFunc;
    }

    addPage(page, pageFunc) {
      this[page] = pageFunc;
    }

    navigate(page, statePopped) {
      const hash = page==='home'?'':'#'+page;
      const isCurrentStateAndPopped = !statePopped && window.location.hash!==hash;
      if(isCurrentStateAndPopped){
        history.pushState({page},'', window.location.pathname+hash);
      }
      this[page]();
    }
  }