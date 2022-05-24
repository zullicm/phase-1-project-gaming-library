
// node getters
const mainDiv = () => document.getElementById('main')
const gameTab =  () => document.getElementById('gametab')
const logo = () => document.getElementById('logo')
const favoritesTab = () => document.getElementById("favorites")
const generatorTab = () => document.getElementById("generator")

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
  h5.innerText = "This website is just as the title says, a reposistory of free to play games (with a few added features!). Here on this website you can do a couple of things. We have a few tabs on the top right that all have different functions and below is an explination of each tab."
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

  const h1 = document.createElement('h1')
  h1.innerText = "TBD This is a test of rendering the games tab"
  mainDiv().appendChild(h1)
}

// Favorites Tab -----------------------------------------------------------
function renderFavoritesTab(){
  resetMainDiv()

  const h1 = document.createElement('h1')
  h1.innerText = "TBD This is a test of rendering the favorites tab"
  mainDiv().appendChild(h1)
}

// Generator Tab -----------------------------------------------------------
function renderGeneratorTab(){
  resetMainDiv()

  const h1 = document.createElement('h1')
  h1.innerText = "TBD This is a test of rendering the generator tab"
  mainDiv().appendChild(h1)
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

document.addEventListener("DOMContentLoaded", ()=>{
  renderHomePage()
  attachLogoLink()
  attachGamesTabLink()
  attachFavoritesTabLink()
  attachGeneratorTabLink()
})