
// node getters
const mainDiv = () => document.getElementById('main')
const gameTab =  () => document.getElementById('gametab')
const logo = () => document.getElementById('logo')
const favoritesTab = () => document.getElementById("favorites")


// Fetch Requests ----------------------------------------------------------

  // GET Request (ALL)------------------------------------------------------
  function fetchFreeGames(){
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      'X-RapidAPI-Key': ''
    }
  };

 fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=alphabetical', options)
    .then(response => response.json())
    .then(data => {
      data.forEach(game => renderGameCard(game))
    })
    .catch(err => console.error(err));
  }
  // Finish GET ------------------------------------------------------------
  function fetchFavGames(){
    fetch("http://localhost:3000/favorites")
    .then(res => res.json())
    .then(data => {
      data.forEach(game => renderFavGameCard(game))
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
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      'X-RapidAPI-Key': ''
    }
  };
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
  h1.innerText = "Welcome!"
  h1.style.marginBottom = "0"
  h1.classList.add("center-align")
  h1.classList.add('white-text')
  h1.classList.add('blue')
  h1.style.borderTopLeftRadius = "25px"
  h1.style.borderTopRightRadius = "25px"
  // h3 text
  const h3 = document.createElement('h3')
  h3.innerText = "to Free-2-Play Game Sorter & Generator!"
  h3.style.marginTop = "0"
  h3.style.paddingBottom = "10px"
  h3.classList.add("center-align")
  h3.classList.add('white-text')
  h3.classList.add('blue')
  h3.style.borderBottomLeftRadius = "25px"
  h3.style.borderBottomRightRadius = "25px"
  // h5 text
  const h5 = document.createElement('h5')
  h5.innerText = "This website is just as the title says, a reposistory of free to play games (with a few added features!). Here on this website you can do a couple of things. We have a few tabs on the top right that all have different functions and below is an explanation of each tab."
  h5.style.paddingTop = "10px"
  h5.style.paddingBottom = "13px"
  h5.style.paddingBlock = "20px"
  h5.style.paddingLeft = "75px"
  h5.style.paddingRight = "75px"
  h5.classList.add("center-align")
  h5.classList.add('white-text')
  h5.style.marginTop = "100px"
  h5.style.marginBottom = "0"
  h5.classList.add('blue')
  h5.style.borderTopLeftRadius = "25px"
  h5.style.borderTopRightRadius = "25px"
// game text
const gameDiv = document.createElement('div')
gameDiv.classList.add('blue')
gameDiv.classList.add('white-text')
gameDiv.style.paddingRight = "20px"
gameDiv.style.paddingLeft = "20px"
gameDiv.style.paddingBottom = "10px"
gameDiv.style.paddingTop = "10px"
gameDiv.style.marginTop = "0"
gameDiv.style.borderBottomLeftRadius = "25px"
gameDiv.style.borderBottomRightRadius = "25px"
gameDiv.innerHTML = `
<h5>- Game Tab</h5>
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

// Generator Tab -----------------------------------------------------------
// function renderGeneratorTab(){
//   resetMainDiv()

// }
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

  btn.addEventListener("click", () => favoriteGame(game))

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

  btn.addEventListener("click", () => favoriteGame(game))

  cardImgDiv.appendChild(imgLink)
  imgLink.appendChild(cardImg)
  mainCard.appendChild(cardImgDiv)
  mainCard.appendChild(btn)
  mainCard.appendChild(gameInfo)
  mainCard.appendChild(cardName)

  
  mainDiv().appendChild(mainCard)
}



const favoriteGame = game => {
  postFavoriteGame(game)
} 

 
  // const form = document.createElement('form')
  // form.style.float = "right"

  // const favButton = document.createElement('button')
  // favButton.setAttribute('type', 'submit') 
  // favButton.style.float = "right" 
  // favButton.style.paddingTop = "4px"
  // favButton.style.marginTop = "9px"
  // favButton.style.marginRight = "5px"
  // favButton.style.borderRadius = "100px"

  // const favoriteIcon = document.createElement('i')
  // favoriteIcon.classList.add("material-icons")
  // favoriteIcon.innerText = "add_circle_outline"

  // favButton.appendChild(favoriteIcon)

  
  // const input = document.createElement("input")
  // input.setAttribute('type', "hidden")
  // input.setAttribute("id", `${game.id}`)
  // input.setAttribute("thumbnail", `${game.title}`)
  // input.setAttribute("title", `${game.thumbnail}`)
  // input.setAttribute("short_description", `${game.short_description}`)
  // input.setAttribute("game_url", `${game.game_url}`)
  // input.setAttribute("genre", `${game.genre}`)
  // input.setAttribute("platform", `${game.platform}`)
  // input.setAttribute("publisher", `${game.publisher}`)
  // input.setAttribute("developer", `${game.developer}`)
  // input.setAttribute("release_date", `${game.release_date}`)
  // input.setAttribute("freetogame_profile_url", `${game.freetogame_profile_url}`)
  
  
  // form.appendChild(input)
  // form.appendChild(favButton)
  
  // form.addEventListener("submit", console.log("hi"))
  // console.log(form)
  
  



  // let gameObj = {
  //   "id": game.id,
  //   "title": game.title,
  //   "thumbnail": game.thumbnail,
  //   "short_description": game.short_description,
  //   "game_url": game.game_url,
  //   "genre": game.genre,
  //   "platform": game.platform,
  //   "publisher": game.publisher,
  //   "developer": game.developer,
  //   "release_date": game.release_date,
  //   "freetogame_profile_url": game.freetogame_profile_url
  // }

// FAVORITE CARDS RENDER----------------------------------------------------

function renderFavGameCard(game){
  const mainCard = document.createElement('div')
  mainCard.classList.add('mainCardDiv')
  mainCard.setAttribute('id',`${game.id}`)

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


mainDiv().addEventListener("click", fetchRandomGame(getRandomInt(519)))


document.addEventListener("DOMContentLoaded", ()=>{
  renderHomePage()
  attachLogoLink()
  attachGamesTabLink()
  attachFavoritesTabLink()
})
