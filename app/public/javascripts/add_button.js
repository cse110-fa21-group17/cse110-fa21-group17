let btn = document.querySelectorAll('#btn');

for(let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', () => {
        if (btn[i].innerText === "Add") { //if the button is Add, change button to black, text to white, and text to Added
            btn[i].innerText = "Added";
            btn[i].style.backgroundColor = '#000000';
            btn[i].style.color = 'rgb(238, 241, 221)';
        }
        else { //else button is Added, change button to white, text to black, and text to Add
            btn[i].innerText= "Add";
            btn[i].style.backgroundColor = 'rgb(238, 241, 221)';
            btn[i].style.color = '#000000';
        }
    });
}



