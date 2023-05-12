const url = 'https://api.exchangerate.host/latest';

let currentCurr = 'RUB' , exchangeCurr = 'USD';
letcurrVall = 1;

const word1left = document.querySelector('.word1left');
const word2left = document.querySelector('.word2left');

const plft1 = document.querySelector('.pleft1');
const plft2 = document.querySelector('.pleft2');

const btnsLeft = document.querySelector('.itemlist2').children;
for(let i=0; i<btnsLeft.length; i++) {
    btnsLeft[i].addEventListener('click', changeCurrentCurrency);
    
}

const btnsRight = document.querySelector('.itemlist22').children;
for(let i=0; i<btnsRight.length; i++) {
    btnsRight[i].addEventListener('click', changeExchangeCurrency)
    
}

async function loadCurrency(a,b) {
    if(a === b) return 1;
    const query = `?base=${a}&symbol=${b}`;
    const res = await fetch (url + query);
    const data = await res.json();
    return data.rates[b];
}
function getData(c, e, l, r) {
    loadCurrency(c, e)
    .then(data => {
        currVal = data.toFixed (4);
        const val = parseFloat(l.value);
        if(!isNaN(val)){
            
            r.value =(val * currVal).toFixed (4);
            plft1.innerText = `1 ${c} = ${currVal} ${e}`;
            const excVal = (1/currVal).toFixed(4);
            plft2.innerText = `1 ${e} = ${excVal} ${c}`;
        }
        else{ 
            r.value = ""
        }
    })
    .catch(e => alert ('Network error: error while getting data'));

}

function changeCurrentCurrency(e) {
    const btn = e.target;
    for(let i=0; i<btnsLeft.length; i++) {
        btnsLeft[i].classList.remove('ayri1')
    }
    btn.classList.add('ayri1');
    currentCurr = btn.innerText.toUpperCase();
    getData(currentCurr, exchangeCurr, word1left, word2left );
}

    function changeExchangeCurrency(e) {
        const btn = e.target;
        for(let i=0; i<btnsRight.length; i++) {
            btnsRight[i].classList.remove('ayri1')
        }
        btn.classList.add('ayri1');
        exchangeCurr = btn.innerText.toUpperCase();
        getData(currentCurr, exchangeCurr, word1left, word2left );

    }
    word1left.addEventListener('input', (e) => {
       
        e.target.value= e.target.value.replaceAll(',','.');
        getData(currentCurr, exchangeCurr, word1left, word2left);

    });

    word2left.addEventListener('input', (e) => {

        e.target.value= e.target.value.replaceAll(',','.');
        getData(exchangeCurr, currentCurr, word2left, word1left);
    });
    word1left.addEventListener('keydown', acceptNumber);
    word2left.addEventListener('keydown', acceptNumber);

    function acceptNumber(e) {
        if( ! ( (e.key === 'Backspace') || (e.key === 'Delete') ||
        (('0' <= e.key) && (e.key <='9')) ||
        (e.key === '.') || (e.key ==='.')
        ) ){
            e.preventDefault();
        }
        if((e.key ==='.') || (e.key === '.')) {
        if(e.target.value.indexOf('.') >= 0) {
                e.preventDefault();
            }
        }
    }
    
    getData(currentCurr, exchangeCurr, word1left, word2left);
