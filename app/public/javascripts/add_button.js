let btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    btn.style.backgroundColor = '#000000';
    btn.style.color = 'rgb(238, 241, 221)';
    if (btn.innerText === "Add") {
        btn.innerText = "Added";
    }
    else {
        btn.style.backgroundColor = 'rgb(238, 241, 221)'
        btn.style.color = '#000000';
        btn.innerText= "Add";
    }
});


