var searchInput = document.querySelector('input').value
var form = document.querySelector('form');
var resultat = document.querySelector('.resultat');
var url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`;

//

console.log(searchInput);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    ajaxF(url);
    document.querySelector('input').value = '';
})
console.log(searchInput);


async function ajaxF(url) {
    var XHR = new XMLHttpRequest();
    XHR.open('GET', url);
    XHR.responseType = 'json';
    XHR.send();
    XHR.onload = () => {
        if (XHR.readyState === XMLHttpRequest.DONE) {
            if (XHR.status === 200) {
                let reponse =  XHR.response;
                console.log(reponse);
                let data =  reponse.query.search;
                console.log(data);
                data.forEach(el => {
                    const url = `https://en.wikipedia.org/?curid=${el.pageid}`;
                    var card = document.createElement('div');
                    card.className = 'resultat-item';
                    card.innerHTML = 
                    `
                        <h3 class="resultat-title"><a target='_blank' href="${url}">${el.title}</a></h3>
                        <a href=${url} class="resultat-link" target="_blank">${url}</a>
                        <span class="resultat-snippet">${el.snippet}</span>
                    `
                    resultat.appendChild(card)
                    
                });

            }
        }
    }
}