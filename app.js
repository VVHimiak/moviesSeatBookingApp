console.log('hellp');

//Getting UI vars
const UIcontainer = document.querySelector('.container');
const UIseats = document.querySelectorAll('.row.seat:not(.occupied)');
const UIcount = document.getElementById('count');
const UItotal = document.getElementById('total');
const UImovieSelest = document.getElementById('movie');
let UItiketPrice = +UImovieSelest.value;

//Update total and count
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  UIcount.innerText = selectedSeatsCount;
  UItotal.innerText = selectedSeatsCount * UItiketPrice;

}
//Add change event Listener
UImovieSelest.addEventListener('change',(e)=>{
  UItiketPrice = +e.target.value;
  updateSelectedCount();
})

//Add Event Listeners
UIcontainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected')
  }
  updateSelectedCount()
})
