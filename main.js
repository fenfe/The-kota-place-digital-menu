class ShoppingCart {
    constructor() {
        // State: Factory default allocation of a structured data matrix inside RAM
        this.items = [];
        this._discount = 0;
    }

    // Ticket SHOP-404 Win: Duplicate-Aware Bulk Quantity Engine
    addItem(itemName, price) {
        let matchedItem = this.items.find(item => item.name === itemName);
        
        if (!matchedItem) {
            // First time adding: Push a fresh, type-safe structured object card into memory
            this.items.push({ name: itemName, price: Number(price), quantity: 1 });
        } else {
            // Duplicate found: Locate the live reference keychain and tick the counter up
            matchedItem.quantity += 1;
        }
    }

    // Ticket SHOP-405 Win: Quantity-Aware Accumulator Engine
    getCartTotal() {
        let grandTotal = 0;
        if(this.items.length === 0){
            return grandTotal;
        }
        this.items.forEach(item => {
            let itemCost = item.price * item.quantity;
            grandTotal += itemCost;
        });
        return grandTotal;
}

    // The Secure Setter Guard Rail Module
    set activeDiscount(num){
        if(num < 0 || num > 100){
            // console.log('Security Alert: Rejected invalid discount amount! ');
            return;
        }
        this._discount = num;
    }
    // Ticket SHOP-403 Win: Dynamic Discount Verification Engine
    applyDiscount(percentage) {
        const originalTotal = this.getCartTotal();

        if (percentage < 0 || percentage > 100) {
            // console.log("Error: Invalid discount percentage requested!");
            return originalTotal;
        }

        const finalTotal = originalTotal * (1 - (percentage / 100));
        return finalTotal;
    }

    // Ticket SHOP-402 Win: Surgical Item Eraser Module
    removeItem(itemName) {
       let matchedItem = this.items.find(item => item .name === itemName);// locate a match in array

    // GUARD RAIL: If the item isn't even in the cart, drop out instantly!
        if(!matchedItem) return;

    // ACTION A: If we have plenty, just drop the count and leave!
    if(matchedItem.quantity > 1){ // and if the matched quantity is more than 1
        matchedItem.quantity -= 1; // decrease it by 1
        return;
    }

    // ACTION B: If we reached this line, it means quantity is exactly 1. Delete it!
    const targetIndex = this.items.findIndex(item => item.name === itemName);
    this.items.splice(targetIndex, 1);
      
    }

    // Ticket SHOP-407 : Implement Total Item-Quantity Accumulator Engine
    getCartItemCount(){
        let totalCartItems = 0;

        this.items.forEach((obj) => {
            totalCartItems += obj.quantity;
        });
        return totalCartItems;
    }
    // Adding the getters and setters
   get itemQuantity(){
        let totalCartItems = 0;
        this.items.forEach((obj) => {
            totalCartItems += obj.quantity;
        })
        return totalCartItems;
    }
      // The Secure Setter Guard Rail Module
      set activeDiscount(num){
        if(num < 0 || num > 100){
            // console.log('Security Alert: Rejected invalid discount amount! ');
            return;
        }
        this._discount = num;
    }
    // Ticket SHOP-408 : Implement Fail-Safe Cart Cleansing Reset Module
    resetCart(){
        if(this.items.length === 0){
            return;
        }
            this.items = [];
    }
    
}

// ======================================================================
// INTEGRATION SANDBOX (Wired outside the class for browser event hooks)
// ======================================================================
// For html nav buttons
document.getElementById('kotaBtn').addEventListener('click' , function(){
        document.getElementById('kotas').scrollIntoView({ behavior: 'smooth' });
})
document.getElementById('burgerBtn').addEventListener('click' , function(){
    document.getElementById('burgers').scrollIntoView({ behavior: 'smooth' });
})
document.getElementById('sidesBtn').addEventListener('click' , function(){
    document.getElementById('sides').scrollIntoView({ behavior: 'smooth' });
})
// For targeting all article btns and numeric quantity spans
const minusButtons = document.querySelectorAll('.minus');
const plusButtons = document.querySelectorAll('.plus');
const quantityDisplay = document.querySelectorAll('.quantity');
// Footer
const whatappCheckout = document.getElementById('whatsapp-submit-btn');//grab btn
whatappCheckout.addEventListener('click', function (){
        // 1. THE GUARD RAIL
    if(myCart.items.length === 0){
        alert('Your cart is empty!! Add some delicious kotas first.');
        return;
    }
    
    // 2. THE INITIAL FORMATTING TEXT TEMPLATE
        let messageText = "*🔥 NEW ORDER VIA @Mickies-The-kota-place * \n\n";
        myCart.items.forEach(item => {// go through every obj inside items array 
            messageText += `• ${item.quantity}x ${item.name} - R${item.price * item.quantity}  \n`;
        }) 
            // 1. WELD THE TOTAL AND INSTRUCTIONS INTO THE MASTER PAYLOAD
            messageText += `\n-------------------------------------------\n`;
            messageText += `💰 *Grand Total: R${myCart.getCartTotal()}-00*\n`;
            messageText += `---------------------------------------\n\n`;
            messageText += `📍 *Please reply with your name and delivery address / collection time:*`;

            // 2. CONVERT TEXT INTO A SECURE, WEB-SAFE COMPRESSED DATA STREAM
        let encodedText = encodeURIComponent(messageText);

            // 3. LAUNCH THE WHATSAPP CLOUD API CHANNEL IN A BRAND-NEW VIEWPORT TAB
            window.open(`https://wa.me/27609085060?text=${encodedText}`, '_blank');
        // messageTotal = `\n The Total for your order = R ${myCart.getCartTotal()}-00 `
        // console.log(messageText + messageTotal)

        // console.log(` The total for your order = R ${myCart.getCartTotal()}-00`)
})
const displayTotal = document.getElementById('total-price-view') 

// Adding click events and tracking the + quantity 
plusButtons.forEach(function(btn, index) {
    btn.addEventListener('click', function() {
    let currentNum = Number(quantityDisplay[index].textContent);// target
    let updatedQuantity = currentNum + 1; // update
    quantityDisplay[index].textContent = updatedQuantity; // display

    let name = btn.getAttribute('data-name');
    let price = btn.getAttribute('data-price');

    myCart.addItem(name, price);
    console.log("Central RAM Database State:", myCart.items);
    updateInterfaceView();
    });
});


// Adding click events and tracking the - quantity 
minusButtons.forEach(function(btn, index) {
    btn.addEventListener('click', function() {
        let currentNum = Number(quantityDisplay[index].textContent);
        let updatedQuantity = currentNum - 1;
        if(currentNum > 0){
            quantityDisplay[index].textContent = updatedQuantity;

              // 1. Extract the unique name string metadata attribute from the DOM element node
              let name = btn.getAttribute('data-name');

              // 2. PIPE DIRECTLY INTO BACKEND SURGICAL ERASER MODULE
              myCart.removeItem(name);
  
              // 3. (Optional placeholder for now) Run view updates here next!
              console.log("Central RAM Database State After Minus:", myCart.items);
              updateInterfaceView();

        }
    })

})

console.log(whatappCheckout);
// Targeting footer interactivity


const myCart = new ShoppingCart();

const setTest = new ShoppingCart();
setTest.activeDiscount = 500;
// console.log("Discount after hack attempt:", setTest._discount);
setTest.activeDiscount = 20; 
// console.log("Discount after valid assignment:", setTest._discount);

// ======================================================================
// CORE INTERFACE RE-RENDERING ENGINE
// ======================================================================
function updateInterfaceView() {
    // 1. Grab the live total calculation straight from backend RAM memory
    const grandTotal = myCart.getCartTotal();
    
    // 2. Dynamically re-assign the text content layer of the HTML total bar element node
    displayTotal.textContent = `Total: R${grandTotal}-00`;
}




const items = [{ id: 1, quantity: 5 }, { id: 2, quantity: 10 }];

// 1. Find the index
const index = items.findIndex(item => item.id === 1); // Returns 0

// 2. Use the index to access the property
if (index !== -1) {
  console.log(items[index].quantity); // Returns 5
}




//   kota names
// main character
// grootman
// 