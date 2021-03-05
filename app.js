//Getting UI vars
const UIcontainer = document.querySelector('.container');
const UIseats = document.querySelectorAll('.row .seat:not(.occupied)');
const UIcount = document.getElementById('count');
const UItotal = document.getElementById('total');
const UImovieSelect = document.getElementById('movie');
let UItiketPrice = +UImovieSelect.value;

populateUI();

//save selected movie index and price
function setMovieData (movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
 
  const seatsIndex = [...selectedSeats].map((seat) => { 
  return [...UIseats].indexOf(seat);
  });

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  UIcount.innerText = selectedSeatsCount;
  UItotal.innerText = selectedSeatsCount * UItiketPrice;
}


//Get data from localstorage and populate UI
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats !== null && selectedSeats.length > 0){
    UIseats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected')
      }
    })
  }
  const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));

  if(selectedMovieIndex !== null) {
    UImovieSelect.selectedIndex = selectedMovieIndex; 
  }
}

//Add change event Listener
UImovieSelect.addEventListener('change',(e)=>{
  UItiketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})

//Add Event Listeners
UIcontainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected')
  }
  updateSelectedCount();
})

//Initial count and total set
updateSelectedCount();