
// node getters
const mainDiv = () => document.getElementById('main')
const gameTab =  () => document.getElementById('gametab')
const logo = () => document.getElementById('logo')
const favoritesTab = () => document.getElementById("favorites")

  const allFreeGames = []
  const allFavGames = []

// Fetch Requests ----------------------------------------------------------

// OPTIONS HOLDS KEY REMOVE BEFORE PUSHING OR COMMITING---------------------
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
    'X-RapidAPI-Key': ''
  }
};

  // GET Request (ALL)------------------------------------------------------
  function fetchFreeGames(){
 fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=alphabetical', options)
    .then(response => response.json())
    .then(data => {
      allFreeGames.push(data)
      allFreeGames[0].forEach(game => renderGameCard(game))
    })
    .catch(err => console.error(err));
  }

  // GET Request (Genre & Platform)
  function fetchFreeGamesGenreAndPlatform(platform, category, sort){
    fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}&category=${category}&sort-by=${sort}`, options)
  }

  // Finish GET ------------------------------------------------------------
  function fetchFavGames(){
    fetch("http://localhost:3000/favorites")
    .then(res => res.json())
    .then(data => {
      allFavGames.splice(0, 1, data)
      let allFavGamesLength = allFavGames[0].length
      if(allFavGamesLength < 1){
    console.log(allFavGames)
    console.log("I am empty")
    const placeHolder = document.createElement('div')
    placeHolder.innerHTML = `
    <h2 class='white-text blue center-align welcome'>UH OH! It's Empty!</h2>
    <h4 class='white-text blue center-align middle-text'>You can add games to your favorites over in the Games tabs. Just click the "Favorite" button on the top right of the game card!</h4>
    <h5 class='white-text blue center-align under-welcome'>Go try it!</h5>
    `
    mainDiv().appendChild(placeHolder)
      }else{data.forEach(game => renderFavGameCard(game))}
    })
  }

  // POST Request (FAV) -----------------------------------------------------
  function postFavoriteGame(gameOBJ){
    fetch("http://localhost:3000/favorites",{
      method:'POST',
      headers:{
        "Content-Type":'application/json'
      },
      body: JSON.stringify(gameOBJ)
    })
  }

  // DELETE Request (FAV) --------------------------------------------------
  function deleteFavGame(gameId){
    fetch(`http://localhost:3000/favorites/${gameId}`,{
      method:'DELETE',
      headers:{
        "Content-Type":'application/json'
      }
    })
  }

  // GET For Random Game
  function fetchRandomGame(ranNum){
    fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${ranNum}`, options)
	  .then(response => response.json())
	  .then(data => renderRanGameCard(data))
	  .catch(err => errorRender(err));
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// Page Renders
function errorRender(){
  const card = document.createElement('div')
  card.innerHTML = `
  <h2>OOPS!</h2>
  <h4>Looks like we couldn't retrieve a game... Our bad!</h4>
  <h5>Please refresh the page to try again!</h5>`
  mainDiv.appendChild(card)
}

// Home Page ---------------------------------------------------------------
function renderHomePage(){
  resetMainDiv()
  // h1 text
  const h1 = document.createElement('h1')
  h1.classList.add('white-text', 'blue', 'center-align', 'welcome')
  h1.innerText = "Welcome!"
  // h3 text
  const h3 = document.createElement('h3')
  h3.classList.add('white-text', 'blue', 'center-align', 'under-welcome')
  h3.innerText = "to Free-2-Play Game Sorter & Generator!"
  // h5 text
  const h5 = document.createElement('h5')
  h5.setAttribute("id", "page-description")
  h5.classList.add('white-text', 'blue', 'center-align')
  h5.innerText = "This website is just as the title says, a reposistory of free to play games (with a few added features!). Here on this website you can do a couple of things. We have a few tabs on the top right that all have different functions and below is an explanation of each tab."
  // game text
  const gameDiv = document.createElement('div')
  gameDiv.setAttribute('id', 'gameDiv')
  gameDiv.classList.add('blue', 'white-text')
  gameDiv.innerHTML = `
  <h5 id="welcome-game-tab">- Game Tab</h5>
    <p>A list of all FREE games stored under the api. Features a sorting system and a "Favorite" button</p>
  <h5>- Favorites Tab</h5>
    <p>This tab is where the games you favorited go, use this to save games that you liked or want to remember to play later, or maybe use it as a way to store your favorite free games!</p>
  <h5>- Random Game Generator</h5>
    <p>Below we also have a game generator! Refresh the page and a random game out of all the games we have listed will pop up! This is a one of the cooler features we have, say you're bored of the games you have or need something to pass the time. You can open this page up and BOOM! A random <em>free</em> game! </p>  
  `
// apending
  mainDiv().appendChild(h1)
  mainDiv().appendChild(h3)
  mainDiv().appendChild(h5)
  mainDiv().appendChild(gameDiv)
  mainDiv().addEventListener("click", fetchRandomGame(getRandomInt(519)))
}

// Game Tab ----------------------------------------------------------------
function renderGameTab(){
  resetMainDiv()
  fetchFreeGames()
}

// Favorites Tab -----------------------------------------------------------
function renderFavoritesTab(){
  resetMainDiv()
  fetchFavGames()
}


// Rando game render -------------------------------------------------------
function renderRanGameCard(game){
  const mainCard = document.createElement('div')
  mainCard.classList.add('mainCardDiv')


  const cardImgDiv = document.createElement('div')
  const cardImg = document.createElement('img')
  const imgLink = document.createElement('a')
  imgLink.href = game.game_url
  cardImg.src = game.thumbnail
  cardImg.classList.add('game-thumbnail')
  cardImgDiv.classList.add('game-thumbnail-div')

  const cardName = document.createElement('h4')
  cardName.classList.add("card-title")
  cardName.innerText = `${game.title}`

  const gameInfo = document.createElement('div')
  gameInfo.classList.add('gameInfo')
  gameInfo.innerHTML = `
  <p><b>Platform:</b> ${game.platform} | <b>Genre:</b> ${game.genre}</p>
  <p><b>Release Date:</b> ${game.release_date}</p>
  <h5 class= "description"></b>Description:</b></h5>
  <p>"${game.short_description}"</p>
  <p><b>Developer:</b> ${game.developer} | <b>Publisher:</b> ${game.publisher}</p>
  `
  const favoriteText = document.createElement('h5')
  favoriteText.innerText = "Favorite Game"
  favoriteText.style.float = "right"
  favoriteText.style.paddingRight = "5px"
  favoriteText.style.marginTop = "10px"

  const btn = document.createElement("button")
  btn.classList.add("btn", "waves-effect", "waves-light")
  btn.setAttribute("type", "submit")
  btn.innerHTML = `
  Favorite <i class="material-icons right">add_circle_outline</i>`
  btn.style.float = "right"
  btn.style.marginTop = "15px"
  btn.style.marginRight = '20px'
  btn.style.backgroundColor = "#2196f3"

  btn.addEventListener("click", () => postFavoriteGame(game))

  cardImgDiv.appendChild(imgLink)
  imgLink.appendChild(cardImg)
  mainCard.appendChild(cardImgDiv)
  mainCard.appendChild(btn)
  mainCard.appendChild(gameInfo)
  mainCard.appendChild(cardName)
  mainCard.style.marginBottom = "30px"
  
  mainDiv().appendChild(mainCard)
}


// Game Card Render --------------------------------------------------------

function renderGameCard(game){
  const mainCard = document.createElement('div')
  mainCard.classList.add('mainCardDiv')


  const cardImgDiv = document.createElement('div')
  const cardImg = document.createElement('img')
  const imgLink = document.createElement('a')
  imgLink.href = game.game_url
  cardImg.src = game.thumbnail
  cardImg.classList.add('game-thumbnail')
  cardImgDiv.classList.add('game-thumbnail-div')

  const cardName = document.createElement('h4')
  cardName.classList.add("card-title")
  cardName.innerText = `${game.title}`

  const gameInfo = document.createElement('div')
  gameInfo.classList.add('gameInfo')
  gameInfo.innerHTML = `
  <p><b>Platform:</b> ${game.platform} | <b>Genre:</b> ${game.genre}</p>
  <p><b>Release Date:</b> ${game.release_date}</p>
  <h5 class= "description"></b>Description:</b></h5>
  <p>"${game.short_description}"</p>
  <p><b>Developer:</b> ${game.developer} | <b>Publisher:</b> ${game.publisher}</p>
  `

  cardImgDiv.appendChild(imgLink)
  imgLink.appendChild(cardImg)
  mainCard.appendChild(cardImgDiv)
  addDeleteButton("favorite", "#2196f3", mainCard, game)
  
  mainCard.appendChild(gameInfo)
  mainCard.appendChild(cardName)

  mainDiv().appendChild(mainCard)
}

const addDeleteButton = (text, color, append, game) => {
  const btn = document.createElement("button")
  btn.classList.add("btn", "waves-effect", "waves-light")
  btn.setAttribute("type", "submit")
  btn.innerHTML = `
  ${text} <i class="material-icons right">add_circle_outline</i>`
  btn.style.float = "right"
  btn.style.marginTop = "15px"
  btn.style.marginRight = '20px'
  btn.style.backgroundColor = `${color}`
  btn.addEventListener("click", () => postFavoriteGame(game))
  append.appendChild(btn)
}



// FAVORITE CARDS RENDER----------------------------------------------------

function renderFavGameCard(game){
  const mainCard = document.createElement('div')
  mainCard.classList.add('mainCardDiv')
  mainCard.setAttribute('id',`${game.id}`)
  mainCard.style.marginBottom = "10px"

  const cardImgDiv = document.createElement('div')
  const cardImg = document.createElement('img')
  const imgLink = document.createElement('a')
  imgLink.href = game.game_url
  cardImg.src = game.thumbnail
  cardImg.classList.add('game-thumbnail')
  cardImgDiv.classList.add('game-thumbnail-div')

  const cardName = document.createElement('h4')
  cardName.classList.add("card-title")
  cardName.innerText = `${game.title}`

  const gameInfo = document.createElement('div')
  gameInfo.classList.add('gameInfo')
  gameInfo.innerHTML = `
  <p><b>Platform:</b> ${game.platform} | <b>Genre:</b> ${game.genre}</p>
  <p><b>Release Date:</b> ${game.release_date}</p>
  <h5 class= "description"></b>Description:</b></h5>
  <p>"${game.short_description}"</p>
  <p><b>Developer:</b> ${game.developer} | <b>Publisher:</b> ${game.publisher}</p>
  `




  const btn = document.createElement("button")
  btn.classList.add("btn", "waves-effect", "waves-light")
  btn.setAttribute("type", "submit")
  btn.innerHTML = `
  Delete <i class="material-icons right">delete</i>`
  btn.style.float = "right"
  btn.style.marginTop = "15px"
  btn.style.marginRight = '20px'
  btn.style.backgroundColor = "#f44336"

  btn.addEventListener("click", () => deleteGame(game.id))

  cardImgDiv.appendChild(imgLink)
  imgLink.appendChild(cardImg)
  mainCard.appendChild(cardImgDiv)
  mainCard.appendChild(btn)
  mainCard.appendChild(gameInfo)
  mainCard.appendChild(cardName)
  
  mainDiv().appendChild(mainCard)
}



const deleteGame = game => {
  deleteFavGame(game)
} 
// RANDOM GAME GENERATOR ---------------------------------------------------


// Page reset --------------------------------------------------------------
function resetMainDiv(){
  mainDiv().innerHTML = ""
}

// EventListeners
function attachLogoLink(){
  logo().addEventListener("click", renderHomePage)
}

function attachGamesTabLink(){
  gameTab().addEventListener("click", renderGameTab)
}

function attachFavoritesTabLink(){
  favoritesTab().addEventListener("click", renderFavoritesTab)
}

document.addEventListener("DOMContentLoaded", ()=>{
  renderHomePage()
  attachLogoLink()
  attachGamesTabLink()
  attachFavoritesTabLink()
})
