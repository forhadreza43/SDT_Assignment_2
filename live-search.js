const url = "https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p";

const searchBar = document.getElementById("search-bar");
const resultsContainer = document.getElementById("results-container");
const playerUnavailableTxt = document.getElementById("player-unavailable-txt");
let playerList;
let searchValue;
let playersReturnedOnSearch;


const fetchPlayers = async () => {
  try{
   const response = await fetch(url);
   playerList = await response.json();

   localStorage.setItem("playerdata", JSON.stringify(playerList));
   localStorage.setItem("cacheTimestamp", Date.now()); 

   renderPlayers(playerList.player);
  } catch (error) {
   playerUnavailableTxt.innerHTML =
     "An error occurred while fetching player. <br /> Please try again later.";
   playerUnavailableTxt.style.display = "block";
   console.error(error);
 }
};


const renderPlayers = (players) => {
 resultsContainer.innerHTML = "";
 playerUnavailableTxt.style.display = "none"; 
 playersReturnedOnSearch = []; 

 players.forEach((player) => {
  if (player.strThumb !== null){
   resultsContainer.innerHTML += `
     <div class="player-cards">
        <img class = "player-image" src="${player.strThumb}" alt="" />
                <div class = "player-info">
                    <h5>Name: ${player.strPlayer}</h5>
                    <h5>Origin: ${player.strNationality}</h5>
                    <h5>Team: ${player.strTeam}</h5>
                    <h5>Sports: ${player.strSport}</h5>
                    <h5>Gender: ${player.strGender}</h5>
                    <p>Bio: ${player.strDescriptionEN.slice(0,100)}</p>
                </div>
                <div class="social-media">
                    <a target="_blank" href="${player.strFacebook}"><i class="fab fa-facebook-f fs-4 text-info"></i></a>
                    <a target="_blank" href="${player.strTwitter}"><i class="fab fa-twitter fs-4 text-info"></i></a>
                </div>
                <div class="button-container">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="populateModal('${player.strPlayer}', '${player.strNationality}', '${player.strTeam}', '${player.strSport}', '${player.strGender}', '${player.strDescriptionEN}')">Details</button>
                    <button onclick="handleAddToCart('${player.strPlayer}','${player.strThumb}')">Add to Cart</button>
                </div> 
     </div>
   `;

   playersReturnedOnSearch.push(player);
  }
  });
};



fetchPlayers();



searchBar.addEventListener("input", (event) => {
 searchValue = event.target.value.trim().toLowerCase();


 const filteredPlayers = playerList.player.filter((player) =>
   player.strPlayer.toLowerCase().includes(searchValue),
 );
 renderPlayers(filteredPlayers);

 if (playersReturnedOnSearch.length <= 0) {
   playerUnavailableTxt.style.display = "block"; 
 }
});

const handleAddToCart = (name, profile) =>{
    const cart = document.getElementById('group-main-container');
    const div = document.createElement('div');
    div.classList.add('group-member')
    div.innerHTML = `
        <h3>${name}</h3>
        <img class="profile-image" src="${profile}" alt="" />
    `;
    cart.appendChild(div);

    const cartCount = document.getElementById('count').innerText;
    const count = parseInt(cartCount);
    const newCount = count + 1;
    document.getElementById('count').innerText = newCount;
}

