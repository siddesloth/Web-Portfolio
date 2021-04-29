var currentOpen = 0; //Gives the modal number of the currently open modal, 0 if none open
var elementsVisible = []; //Stores how many 'clickable' elements are in the open modal
//Opens the popup-modal with the associated ID number
$('button.button-open').click(function(event){
    var id = event.target.id; //Gets the button ID
    var numericId = id.substr(id.length - 1); // Uses the button ID to get the modal number
    openArea(numericId); //Opens says modal
});
//Closes the popup-modal with the associated ID number
$('button.button-close').click(function(event){
    var id = event.target.id;
    var numericId = id.substr(id.length - 1);
    closeArea(numericId);
});
//Closes the popup-modal with which the overlay is associated
$('div.overlay-close').click(function(event){
    var id = event.target.id;
    var numericId = id.substr(id.length - 1);
    closeArea(numericId);
});
//Opens the chosen popup-modal
function openArea(area){
    $('#modal-' + area).removeClass('hidden');
    $('#modal-' + area).attr('aria-modal', true);
    $('#modal-overlay-' + area).addClass('backdrop-active');
    var elementFind = document.getElementById('modal-overlay-' + area);
    elementsVisible = elementFind.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
    currentOpen = area;
    focusAndDisableTab(area);
}
//Closes the chosen popup-modal
function closeArea(area){
    $('#modal-' + area).addClass('hidden');
    $('#modal-' + area).attr('aria-modal', false);
    $('#modal-overlay-' + area).removeClass('backdrop-active');
    elementsVisible = [];
    currentOpen = 0;
    focusOnOriginalElement(area);
}
//Focuses on the now visible popup-modal
function focusAndDisableTab(area){
    $('#modal-close-' + area).focus();
};
//Focuses on the button that opened the popup-modal after it closes
function focusOnOriginalElement(area){
    $('#modal-open-button-' + area).focus();
}
//Disables tabbing & allows escape key to close the popup-modal
document.addEventListener('keydown', function(objEvent) {
    if(currentOpen != 0){
        let isTabPressed = objEvent.key === 'Tab' || objEvent.keyCode === 9;

        if (!isTabPressed) { //If tab isn't pressed then exit function
            return;
        }

        if (objEvent.shiftKey) { // if shift key pressed for shift + tab combination
            if(elementsVisible.length > 1){ //If more than one element in active modal
                if(document.activeElement === elementsVisible[0]){ //If element is first element
                    objEvent.preventDefault(); //Prevent tab
                    elementsVisible[elementsVisible.length - 1].focus(); //Focus on last element of modal
                }
            } else {
                objEvent.preventDefault(); //Prevent shift+tab as only one element in modal
            }
        } else { // if tab key is pressed
            if(elementsVisible.length > 1){ //If more than one element in active modal
                if(document.activeElement === elementsVisible[elementsVisible.length - 1]){ //If last element is the active element
                    objEvent.preventDefault(); //Prevent tab
                    elementsVisible[0].focus(); //Focus on first element of modal
                }
            } else {
                objEvent.preventDefault(); //Prevent tab as only one element in modal
            }
        }
    }
});