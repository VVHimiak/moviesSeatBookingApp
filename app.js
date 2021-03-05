//Getting UI vars
const UIcontainer = document.querySelector('.container');
const UIseats = document.querySelectorAll('.row .seat:not(.occupied)');
const UIcount = document.getElementById('count');
const UItotal = document.getElementById('total');
const UImovieSelest = document.getElementById('movie');
let UItiketPrice = +UImovieSelest.value;

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

//Add change event Listener
UImovieSelest.addEventListener('change',(e)=>{
  UItiketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})

//Add Event Listeners
UIcontainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected')
  }
  updateSelectedCount()
})
