const cardContainer = document.querySelector(".card-container");
const nextBtn = document.querySelector(".next-pj");

const BASE_URL = "https://rickandmortyapi.com/api/character/";

const getRandomNumber = () => {
    return Math.floor(Math.random() * 825) + 1;
    //return 910
};

const GetPj = async () => {
    try {
        const newPj = await fetch(`${BASE_URL}${getRandomNumber()}`).then((res) => res.json());
        console.log(newPj);
        return newPj; 
         
    } catch (error) {
        cardContainer.innerHTML =`<div class="img-container">
        <img src="./error_img.png" alt="" />
        <h2>Oops!, an unexpected error occurred (${error}), please reload the page</h2>
    </div>` 
        console.log(error);

    }
}

const renderNewPj = (character) => {
    const {image, name, species, origin, gender, id } = character;
    if (!id) {
        cardContainer.innerHTML =`<div class="img-container">
        <img src="./question-guy.png" alt="" />
        <h2>Oops!, no character available, please try the next one</h2>
    </div>` 
    }
    cardContainer.innerHTML = `
    <div class="cardWrapper" id= ${id}>
      <div class="imgContainer">
        <img src="${image}" alt="" />
      </div>
      <div class="infoContainer">
        <h1>${name}</h1>
        <div class="info">
            <h2>ESPECIE:</h2>
            <span>${species}</span>
        </div>
        <div class="info">
            <h2>ORIGEN:</h2>
            <span>${origin.name}</span>
        </div>
        <div class="info">
            <h2>GENERO:</h2>
            <span>${gender}</span>
        </div>
    </div>
</div>`;
};

const GetAndRenderpj = async() => {
    cardContainer.innerHTML =`<span class="loader"></span>`
    const pj = await GetPj();
    renderNewPj(pj);
}

const changePj = () => {
    setTimeout(() => {  
        GetAndRenderpj();
    }, 800);
    cardContainer.innerHTML =`<span class="loader"></span>`
};



const init = () => {
    window.addEventListener("DOMContentLoaded", GetAndRenderpj);
    nextBtn.addEventListener("click", changePj);
    
};

init();