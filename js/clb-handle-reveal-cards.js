
const moveIconCardRevealContents = function() {

     if (window.matchMedia("(min-width: 769px)").matches) {

          const iconRevealCardContents = document.querySelectorAll('.clb-icon-reveal-card-contents');
          const newContentsArea = document.querySelector('.clb-reveal-contents-area');

          iconRevealCardContents.forEach((cardContent) => {
            newContentsArea.appendChild(cardContent);
          });

     }

}
moveIconCardRevealContents();




const clbShowIconRevealCardContents = function(event) {

     event.preventDefault();
     const fullLink = event.target.closest("a");
     const revealID = fullLink.hash.substring(1);
     console.log( revealID );

     // add "clb-selected-icon-card" class to the card itself
     const parentCard = document.querySelector( '.' + revealID + '.clb-icon-reveal-card' );
     console.log(parentCard);
     parentCard.classList.add("clb-selected-icon-card");
     parentCard.classList.remove("clb-unselected");

     // show the clicked contents
     const revealContents = document.querySelector('#' + revealID);
     revealContents.classList.remove("clb-hide");

     //hide all of the other contents
     hideAllOthers = document.querySelectorAll('.clb-icon-reveal-card-contents');
     hideAllOthers.forEach((hiddenCard) => {
          if( hiddenCard.classList.contains(revealID) ) {
               hiddenCard.classList.add("clb-fulltext-selected");
               return;
          }
          hiddenCard.classList.add("clb-hide");
     });

     // remove "clb-selected-icon-card" class from all other cards
     unSelected = document.querySelectorAll('.clb-icon-reveal-card');
     unSelected.forEach((unSelectedCard) => {
          if( unSelectedCard.classList.contains(revealID) ) { return; }
          unSelectedCard.classList.remove("clb-selected-icon-card");
          unSelectedCard.classList.add("clb-unselected");
     });

}



const activateIconCardReveals = function() {

     console.log('activateIconCardReveals 1048a');

     // loop through page and get all icon reveal cards, add event listener
     const iconRevealCards = document.querySelectorAll('.clb-icon-reveal-card a.clb-icon-card-link');

     iconRevealCards.forEach((iconRevealCard) => {
       iconRevealCard.addEventListener('click', clbShowIconRevealCardContents);
     });


}
activateIconCardReveals();
