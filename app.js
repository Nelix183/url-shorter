const LINK_FOR_SHORT_INPUT = document.querySelector('#link');
const LINKS_AREA = document.querySelector('#links_area');
const API_URL = "https://api.shrtco.de/v2/shorten";
const BTN = document.querySelector('#short');
const LABEL = document.querySelector('label');
var shorten_link = "";
const ADD_EL_FUNCTION = (link_for_short, shorten_link) => {
    let div = document.createElement('div');
    div.classList.add('link')
    let div_p = document.createElement('p');
    div_p.innerText = link_for_short;
    let div2 = document.createElement('div');
    div2.classList.add('shorten-link');
    let div2_p = document.createElement('p');
    div2_p.innerText = shorten_link;
    let div2_button = document.createElement('button');
    div2_button.innerText = "Copy";
    div2_button.classList.add('copy');
    div2.appendChild(div2_p);
    div2.appendChild(div2_button);
    div.appendChild(div_p);
    div.appendChild(div2);
    LINKS_AREA.appendChild(div);
};
BTN.addEventListener('click', ()=>{
    LABEL.classList.remove('label-err');
    LINK_FOR_SHORT_INPUT.classList.remove('input-err');
    LABEL.innerText = "";
    let link_for_short = LINK_FOR_SHORT_INPUT.value;
    let link = `${API_URL}?url=${link_for_short}`;
    LINK_FOR_SHORT_INPUT.value = "";
    fetch(link).then(res => res.json()).then(wyn =>{
        if(wyn.ok){
            shorten_link = wyn.result.short_link2;
            ADD_EL_FUNCTION(link_for_short, shorten_link);
        }
        else{
            LINK_FOR_SHORT_INPUT.classList.add('input-err');
            LABEL.classList.add('label-err');
            LABEL.innerText = "Please add a link!";
        }
    });
});
LINKS_AREA.addEventListener('click', (e)=>{
    if(e.target.className == "copy"){
        let copy_link = e.target.parentElement.querySelector('p').innerText;
        navigator.clipboard.writeText(copy_link);
        e.target.innerText = 'Copied!';
        e.target.classList.add('copied');
        setTimeout(() =>{ 
            document.querySelector('.copied').innerText = 'Copy';
            document.querySelector('.copied').classList.remove('copied');
        }, 2000);
    }
});


