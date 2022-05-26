
// node getters
const mainDiv = () => document.getElementById('main')
const gameTab =  () => document.getElementById('gametab')
const logo = () => document.getElementById('logo')
const favoritesTab = () => document.getElementById("favorites")
const generatorTab = () => document.getElementById("generator")
const ok = logo

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
      console.log(data)
      data.forEach(game => renderGameCard(game))
    })
    .catch(err => console.error(err));
  }
  // Finish GET ------------------------------------------------------------
  function fetchFavGames(){
    fetch("http://localhost:3000/favorites")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      data.forEach(game => renderFavGameCard(game))
    })
  }

  // POST Request (FAV) -----------------------------------------------------
  // function postFavoriteGame(gameOBJ){
  //   fetch("http://localhost:3000/favorites",{
  //     method:'POST',
  //     headers:{
  //       "Content-Type":'application/json',
  //       "Accept": 'application/json'
  //     },
  //     body: JSON.stringify(gameOBJ)
  //   })
  // }

// Page Renders
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

<h5>- Game Generator Tab</h5>
<p>I personally think this is the coolest feature. Under this tab at the click of a button you can bring up a random game from the storage. This feature is great for when you're bored, or just looking for something new. And the best part is every game is free!</p>  
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
  renderFavButton()
}

// Favorites Tab -----------------------------------------------------------
function renderFavoritesTab(){
  resetMainDiv()
  fetchFavGames()
}

// Generator Tab -----------------------------------------------------------
function renderGeneratorTab(){
  resetMainDiv()

  const h1 = document.createElement('h1')
  h1.innerText = "TBD This is a test of rendering the generator tab"
  mainDiv().appendChild(h1)
}
// Render fav button -------------------------------------------------------
const renderFavButton = () =>{
  
  const form = document.createElement('form')
  const favButton = document.createElement('button')
  favButton.setAttribute('type', 'submit')  
  const favoriteIcon = document.createElement('i')
  favoriteIcon.classList.add("material-icons")
  favoriteIcon.innerText = "add_circle_outline"
  favButton.appendChild(favoriteIcon)
  form.appendChild(favButton)
  form.style.float = "right"
  form.style.paddingRight = "5px"
  form.style.paddingTop = "5px"
  return form
}
// Game Card Render --------------------------------------------------------

function renderGameCard(game){
  const gameOBJ = game
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

  const favoriteText = document.createElement('p')
  favoriteText.innerText = "Favorite Game"
  favoriteText.style.float = "right"
  favoriteText.style.paddingRight = "5px"

  const renderButton = renderFavButton()

  cardImgDiv.appendChild(imgLink)
  imgLink.appendChild(cardImg)
  mainCard.appendChild(cardImgDiv)
  mainCard.appendChild(renderButton)
  mainCard.appendChild(favoriteText)
  mainCard.appendChild(gameInfo)
  mainCard.appendChild(cardName)
  mainDiv().appendChild(mainCard)
}

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

  cardImgDiv.appendChild(imgLink)
  imgLink.appendChild(cardImg)
  mainCard.appendChild(cardImgDiv)
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

function attachGeneratorTabLink(){
  generatorTab().addEventListener("click", renderGeneratorTab)
}
// function attachFavoriteButton(){
// renderGameCard(game).addEventListener("submit",postFavoriteGame(gameOBJ))
// }


document.addEventListener("DOMContentLoaded", ()=>{
  renderHomePage()
  attachLogoLink()
  attachGamesTabLink()
  attachFavoritesTabLink()
  attachGeneratorTabLink()
  // attachFavoriteButton()
})

