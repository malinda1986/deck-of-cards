export async function createLeaderBoard  (params)  {

};

export async function finishGame  (params)  {

};

export async function checkMatch  (params) {

};

export async function setCards  (params)  {

};

export async function shuffle (array) {
    let currentIndex = array.length; 
    let temporaryValue; 
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
};

export async function getLeaderBoard (params) {

};

