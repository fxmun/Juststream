// Fonctions Document Object Model (DOM)
function selectDom(id){
    return document.querySelector(id);
}

function createDom(element){
    return document.createElement(element);
}

function appendDom(parent, child){
    return parent.appendChild(child);
}

let init = 'http://localhost:8000/api/v1/titles/'
//Création d'un tableau de tous les films non triés
async function main(init){
    let tousFilms = await fetch(init);
    let allMovies = await tousFilms.json();
    let urlNextPage = allMovies.next;
    let caracterise = allMovies.results;
    let nbPage = 1;
    let id; let url; let imdb_url; let title; let year; let imdb_score; let votes; let image_url; let directors; let actors; let writers; let genres; let date_published; let rated; let duration; let countries; let description;
    let tableFilms = [];
    caracterise.forEach(object =>{
        tableFilms.push(object)
    })
    
    while (urlNextPage != null){
        tousFilms = await fetch(urlNextPage);
        allMovies = await tousFilms.json();
        urlNextPage = allMovies.next;
        caracterise = allMovies.results;
        caracterise.forEach(object =>{
            tableFilms.push(object)
        })
        
        for (let i = 0; i < caracterise.length; i++) {
            id = caracterise[i].id;
            url = caracterise[i].url;
            imdb_url = caracterise[i].imdb_url;
            title = caracterise[i].title;
            year = caracterise[i].year;
            imdb_score = caracterise[i].imdb_score;
            votes = caracterise[i].votes;
            image_url = caracterise[i].image_url;
            directors = caracterise[i].directors;
            actors = caracterise[i].actors;
            writers = caracterise[i].writers;
            genres = caracterise[i].genres;
            date_published = caracterise[i].date_published;
            rated = caracterise[i].rated;
            directors = caracterise[i].directors;
            duration = caracterise[i].duration;
            countries = caracterise[i].countries;
            description = caracterise[i].description;
          }
          nbPage += 1;
          if (urlNextPage === "http://localhost:8000/api/v1/titles/?page=51"){
            break
        }
    }
    //console.log(tableFilms);
    //console.log(nbPage);
    return [id, url, imdb_url, title, year, imdb_score, votes, image_url, directors, actors, writers, genres, date_published, rated, duration, countries, description, tableFilms, nbPage];
}

const syntese = await main(init);
const selectFilms = syntese[17];
//console.log(syntese);
//console.log(selectFilms);

//Création d'un tableau de tous les films trié par par leurs score imdb
function genereFilmsOrdre(selectFilms){
    const filmsOrdonnees = Array.from(selectFilms);
    filmsOrdonnees.sort(function (a, b) {
        return b.imdb_score - a.imdb_score;  
    });
    return filmsOrdonnees;
}

const premierFilm = genereFilmsOrdre(selectFilms);
//console.log(premierFilm);

// Récupération de l'élément du DOM qui accueilleront le meilleur film
const divMeilleurFilm = selectDom(".best_all_movies");
const imageElement = createDom("img");
const filmImgUrl = premierFilm[0].image_url;
imageElement.id = "Img_1";
imageElement.src = filmImgUrl;
imageElement.classList.add("best_img");
imageElement.title = "image_test";
imageElement.alt = "Meilleur Film";
const theBest = createDom("h2");
theBest.classList.add("best_movie");
theBest.innerText = "Meilleur Film";
const titreBest = createDom("h3");
titreBest.classList.add("title_movie");
const filmTitre = premierFilm[0].title;
titreBest.innerText = filmTitre;
const playButton = createDom("button");
playButton.id = "winner";
playButton.type = "button";
playButton.classList.add("play");
playButton.innerText = "Play";

appendDom(divMeilleurFilm, imageElement);
appendDom(divMeilleurFilm, theBest);
appendDom(divMeilleurFilm, titreBest);
appendDom(divMeilleurFilm, playButton);

//Sélection globale des sept meilleurs films
let best7GlobalMovies = [];
for (let h = 0; h < 7; h ++){
    best7GlobalMovies.push(premierFilm[h]);
    var div7MeilleurFilm = selectDom(".best_all_7_movies");
    const imageElement_1 = createDom("img");
    imageElement_1.id = "img_1-"+ h;
    imageElement_1.src = best7GlobalMovies[h].image_url;
    imageElement_1.classList.add("other_img");
    imageElement_1.title = "image_test";
    imageElement_1.alt = "Top 7 Films";
    appendDom(div7MeilleurFilm, imageElement_1);
}
const _7_Best = createDom("h2");
_7_Best.classList.add("other_movie");
_7_Best.innerText = "Films les mieux notés";
appendDom(div7MeilleurFilm, _7_Best);
//console.log(best7GlobalMovies);

//Tri de tous les films par genre
function selectGender(choiceGender){
    var gender = Array.from(premierFilm);
    const triGenre = [];
    for(let i = 0 ; i < gender.length; i++){
        let genre = gender[i].genres
        for(let j = 0; j < genre.length;j++){
            if(genre[j] === choiceGender){
                triGenre.push(gender[i]);
            }
        }
    }
    return triGenre;
}

const triGenre_1 = selectGender("Action");
//console.log(triGenre_1);

const triGenre_2 = selectGender("Comedy");
//console.log(triGenre_2);

const triGenre_3 = selectGender("Fantasy");
//console.log(triGenre_3);

//Selection et intégration des sept meilleurs films d'action
let best7ActionMovies = [];
for (let h = 0; h < 7; h ++){
    best7ActionMovies.push(triGenre_1[h]);
    var div7ActionFilm = selectDom(".best_action_7_movies");
    const imageElement_2 = createDom("img");
    imageElement_2.id = "img_2-"+ h;
    imageElement_2.src = best7ActionMovies[h].image_url;
    imageElement_2.classList.add("other_img");
    imageElement_2.title = "image_test";
    imageElement_2.alt = "Top 7 Films Action";
    appendDom(div7ActionFilm, imageElement_2);
}

const _7_Action = createDom("h2");
_7_Action.classList.add("other_movie");
_7_Action.innerText = "Films d'action les mieux notés";
appendDom(div7ActionFilm, _7_Action);
//console.log(best7ActionMovies);

//Selection et intégration des sept meilleurs films de comédie
let best7ComedieMovies = [];
for (let h = 0; h < 7; h ++){
    best7ComedieMovies.push(triGenre_2[h]);
    var div7ComedieFilm = selectDom(".best_comedy_7_movies");
    const imageElement_3 = createDom("img");
    imageElement_3.id = "img_3-"+ h;
    imageElement_3.src = best7ComedieMovies[h].image_url;
    imageElement_3.classList.add("other_img");
    imageElement_3.title = "image_test";
    imageElement_3.alt = "Top 7 Films Comedie";
    appendDom(div7ComedieFilm, imageElement_3);
}

const _7_Comedie = createDom("h2");
_7_Comedie.classList.add("other_movie");
_7_Comedie.innerText = "Films de comédie les mieux notés";
appendDom(div7ComedieFilm, _7_Comedie);
//console.log(best7ComedieMovies);

//Selection et intégration des sept meilleurs films de fantaisie
let best7FantaisieMovies = [];
for (let h = 0; h < 7; h ++){
    best7FantaisieMovies.push(triGenre_3[h]);
    var div7FantaisieFilm = selectDom(".best_fantasy_7_movies");
    const imageElement_4 = createDom("img");
    imageElement_4.id = "img_4-"+ h;
    imageElement_4.src = best7FantaisieMovies[h].image_url;
    imageElement_4.classList.add("other_img");
    imageElement_4.title = "image_test";
    imageElement_4.alt = "Top 7 Films Fantaisie";
    appendDom(div7FantaisieFilm, imageElement_4);
}

const _7_Fantaisie = createDom("h2");
_7_Fantaisie.classList.add("other_movie");
_7_Fantaisie.innerText = "Films de fantaisie les mieux notés";
appendDom(div7FantaisieFilm, _7_Fantaisie);
//console.log(best7FantaisieMovies);

var identify = document.getElementsByTagName("img");
var divId = document.getElementsByTagName("div");

//Création des éléments nécéssaires au déclenchement dévènements lors du click sur une image
function load (identify, divId) {
    var tabDiv = [];
    var tabId = [];
    var tabSrc = [];
    var tabImg = [];

    for (let g = 0; g < divId.length; g++){
        tabDiv.push(divId[g]);
        var childLength = divId[g].childNodes.length
        for (let h = 0; h < childLength; h++){
            if (tabDiv[g].childNodes[h].id && tabDiv[g].childNodes[h].id !== "winner" ){
                tabImg.push(tabDiv[g].childNodes[h]);
            }
        }
    }
    
    for (let i = 0; i < identify.length; i++){
        tabId.push(identify[i].id);
        tabSrc.push(identify[i].src);
        var idPicture = tabId[i];
        document.getElementById(idPicture).onclick = function(){
            console.log(tabSrc[i]);
            var callMovie = tabSrc[i];
            const matching = syncSrcMovies(callMovie);
            openModale(matching, premierFilm);
        }
    }

    console.log(tabDiv);
    console.log(tabId);    
    console.log(tabSrc);
    console.log(tabImg);
    return idPicture;     
}

var idPicture = load(identify, divId);

function syncSrcMovies(callMovie){
    var allBestMovies = [];
    for (let g = 0; g < 7; g++){
    allBestMovies.push(best7GlobalMovies[g]);
}
    for (let h = 0; h < 7; h++){
    allBestMovies.push(best7ActionMovies[h]);
}
    for (let i = 0; i < 7; i++){
    allBestMovies.push(best7ComedieMovies[i]);
}
    for (let j = 0; j < 7; j++){
     allBestMovies.push(best7FantaisieMovies[j]);
    }

    //console.log(callMovie);
    //console.log(allBestMovies);

    for (let k = 0; k < allBestMovies.length; k++){
        if (callMovie === allBestMovies[k].image_url){
            var matching = allBestMovies[k];
            return matching;
        }
    }

}

//Déclenchement de l'évènement du bouton "Play" sur le meilleur film
document.getElementById("winner").onclick = function() {openModale(premierFilm[0])};

//Attribution des caractéristiques du film par l'élément cliqué à la fenêtre modale qui s'ouvre
function openModale(matching, premierFilm){
    if (document.getElementById(idPicture).onclick){
        var result = matching;
    }
    else if (document.getElementById("winner").onclick){
        var result = premierFilm;
    }
    
    const resume = [];
    resume.push(result.image_url);
    resume.push(result.title);
    resume.push(result.genres);
    resume.push(result.date_published);
    resume.push(result.rated);
    resume.push(result.imdb_score);
    resume.push(result.directors);
    resume.push(result.actors);
    resume.push(result.duration);
    resume.push(result.countries);
    resume.push(result.votes);
    resume.push(result.description);
    let popup = window.open("about:blank", "resume", "width=1100,height=238,left=795,top=112");
    for (let x = 0; x < resume.length; x++){
        popup.document.write(resume[x], "<br/>");
    }
    return resume;
}