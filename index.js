
// node getters
const mainDiv = () => document.getElementById('main')
const gameTab =  () => document.getElementById('gametab')
const logo = () => document.getElementById('logo')
const favoritesTab = () => document.getElementById("favorites")
const sortByTab = () => document.getElementById("sortby")


  const allFreeGames = []
  const allFavGames = []
  const sortedFreeGames = []

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
      console.log(data)
      allFreeGames[0].forEach(game => renderGameCard(game))
    })
    .catch(err => console.error(err));
  }

  // GET Request (Genre & Platform & SortBy)
  function fetchFreeGamesGenreAndPlatform(genre, platform){
    fetch(`https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${genre}&platform=${platform}`, options)
    .then(response => response.json())
    .then(data => {
      sortedFreeGames.unshift(data)
      console.log(sortedFreeGames)

      sortedFreeGames[0].forEach(game => renderSortedGameCard(game))
      
    })
    .catch(err => console.error(err));
  }
  

  // Finish GET ------------------------------------------------------------
  function fetchFavGames(){
    fetch("http://localhost:3000/favorites")
    .then(res => res.json())
    .then(data => {
      allFavGames.splice(0, 1, data)
      let allFavGamesLength = allFavGames[0].length
      if(allFavGamesLength < 1){
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

  const h2 = document.createElement('h2')
  h2.innerText = "OOPS!"
  const h4 = document.createElement('h4')
  h4.innerText = "Looks like we couldn't retrieve a game... Our bad!"
  const h5 = document.createElement('h5')
  h5.innerText = "Please refresh the page to try again!"
  
  h2.classList.add('white-text', 'red', 'center-align', 'welcome')
  h4.classList.add('white-text', 'red', 'center-align',)
  h5.classList.add('white-text', 'red', 'center-align')

  h2.style.marginBottom = '0px'
  h2.style.paddingBottom = '5px'

  h4.style.marginTop = '0px'
  h4.style.marginBottom = '0px'
  h4.style.paddingBottom = '5px'


  h5.style.borderBottomLeftRadius = "25px"
  h5.style.borderBottomRightRadius = "25px"
  h5.style.marginBottom = "50px"
  h5.style.marginTop = '0px'
  h5.style.paddingBottom = '5px'

  card.appendChild(h2)
  card.appendChild(h4)
  card.appendChild(h5)

  mainDiv().appendChild(card)
}

// Home Page ---------------------------------------------------------------
function renderHomePage(){
  resetMainDiv()
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
  <h5>- Sort By Tab</h5>
    <p>A way to sort through every game. Using this feature you can sort using the games genres, you can also sort by which platform the game is available on (Note that this is optional).</p>
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
// Sort By Tab
function renderSortByTab(){
  resetMainDiv()
  const submitDiv = document.createElement('div') 
  submitDiv.setAttribute('id', 'form-div')
  submitDiv.style.marginTop = '30px'

  const form = document.createElement('form')
  form.setAttribute('id', 'game-sortBy')
  form.setAttribute('action', '') 
  form.setAttribute('method', 'GET')

  const inputGenre = document.createElement('input')
  inputGenre.setAttribute('id', 'genre')
  inputGenre.setAttribute('type', 'text')
  inputGenre.setAttribute('name', 'genre')
  inputGenre.setAttribute('placeholder', 'Type In A Genre')

  const inputPlatform = document.createElement('input')
  inputPlatform.setAttribute('id', 'platform')
  inputPlatform.setAttribute('type', 'text')
  inputPlatform.setAttribute('name', 'platform')
  inputPlatform.setAttribute('placeholder', `Type In A Platform (type "all" if you aren't looking for a specific platform)`)

  const inputSubmit = document.createElement('input')
  inputSubmit.setAttribute('type', 'submit')
  inputSubmit.setAttribute('value', 'Sort')
//------------------------
  const helpToolDiv = document.createElement('div')
  helpToolDiv.classList.add('tooltip')
  helpToolDiv.innerText = `Help! I don't know how to sort!`

  const helpTool = document.createElement('span')
  helpTool.classList.add('tooltiptext')
  helpTool.innerText = "There is a LARGE list of genres, thankfully we have them compiled for you right here! ____________________________________________________________________________ mmorpg, shooter, strategy, moba, racing, sports, social, sandbox, open-world, survival, pvp, pve, pixel, voxel, zombie, turn-based, first-person, third-Person, top-down, tank, space, sailing, side-scroller, superhero, permadeath, card, battle-royale, mmo, mmofps, mmotps, 3d, 2d, anime, fantasy, sci-fi, fighting, action-rpg, action, military, martial-arts, flight, low-spec, tower-defense, horror, mmorts ____________________________________________________________________________  Also here are the available platforms: pc, browser, or all "
  
  helpToolDiv.appendChild(helpTool)
//----------------------------
  form.addEventListener('submit', e => {
    e.preventDefault()
    console.log(inputGenre.value)
    console.log(inputPlatform.value)
    fetchFreeGamesGenreAndPlatform(inputGenre.value, inputPlatform.value)
    renderSortByTab()
  })


  form.appendChild(inputGenre)
  form.appendChild(inputPlatform)
  form.appendChild(inputSubmit)
  
 submitDiv.appendChild(form)
 mainDiv().appendChild(submitDiv)
 mainDiv().appendChild(helpToolDiv)
}
  
// Rando game render -------------------------------------------------------
function renderRanGameCard(game){
  const mainCard = document.createElement('div')
  if(game.title === undefined){
    errorRender()
  }else{
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
// Sort card render ---------------------------------------------------
function renderSortedGameCard(game){
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

function attachSortByTabLink(){
  sortByTab().addEventListener('click',renderSortByTab)
}

document.addEventListener("DOMContentLoaded", ()=>{
  renderHomePage()
  attachLogoLink()
  attachGamesTabLink()
  attachFavoritesTabLink()
  attachSortByTabLink()
})
