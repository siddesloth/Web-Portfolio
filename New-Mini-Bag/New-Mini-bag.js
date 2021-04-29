$('#addToCartButton').click(function(){
    if(document.querySelector('#checkout-shoe-care') === null){
        $('.mini-bag-content.width100').append('<div id="checkout-shoe-care" class="checkout-shoe-care--container"><div class="checkout-shoe-care--image"><img class="checkout-shoe-care--image-block" src="https://clarks.scene7.com/is/image/Pangaea2Build/ir-ss21-shoe-care-cart-test-wk08?fmt=pjpeg&wid=400" alt="clarks shoe care products"></div><div class="checkout-shoe-care--inner"> <div class="checkout-shoe-care--text-container"> <p class="checkout-shoe-care--text">Shoe care now avaliable online.</p></div><p class="checkout-shoe-care--text-margin"><a href="/Shoe-Care-Products/c/99?MID=FED056" class="checkout-shoe-care--text-link">Shop Shoe Care</a></p></div></div>');
    }
});