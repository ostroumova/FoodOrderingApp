import { menuArray } from "./data.js"

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
       handleAddClick(e.target.dataset.add) 
    } 
    else if (e.target.dataset.remove){
       handleRemoveClick(e.target.dataset.remove) 
    }  else if(e.target.id === 'orderBtn'){
        handlePaymentBtn()
    } else if(e.target.id === 'payBtn'){
        e.preventDefault()
        handleCardSubmitionBtn()
    }
})

function handlePaymentBtn(){
    document.getElementById("modal").classList.toggle('hidden')
}


function handleCardSubmitionBtn(){
    document.getElementById("paymentSubmitted").classList.replace("hidden", "flex")
    document.getElementById('checkoutEl').classList.add("hidden")
    document.getElementById('checkoutBtn').classList.add("hidden")
    document.getElementById("modal").classList.toggle('hidden')
    const formData = document.getElementById('payment-form')
    const paymentData = new FormData(formData)
    let name = paymentData.get('cardHolderName')
    
    document.getElementById("paymentSubmitted").innerHTML = 
    `<p>
    Thanks, ${name}! Your order is on its way!
    </p>`
}

let orders = []
function handleAddClick(itemId){
    const addedToBasket = menuArray.filter(function(item){
        return item.id == itemId;
    })[0]
    orders.push(addedToBasket);
    render()
}

function handleRemoveClick(itemId){
let index = orders.findIndex(order => order.id === itemId);
orders.splice(index, 1)   
    render()
}

function renderBasket(){
let basketHtml = ``
let checkoutHtml = ``
     if (orders.length > 0){
        orders.forEach(function(order){
            basketHtml += `
    <div class="basketEl">
        <div class="orderItem">
        <div>${order.name}</div>
        <span data-remove="${order.id}">remove</span>
        </div>
        <div>
        <p>$ ${order.price}</p>
        </div>
    </div>
    `
        })
    
        let sum = 0
        
  
    orders.forEach(function(order){
        sum += order.price
    })

    checkoutHtml = `
    <div class="hidden" id="paymentSubmitted"> 
    </div>
          
          
    <div class="checkoutEl" id="checkoutEl">
    
    <h1 id="basketTitle">Your order</h1>
    <div class="orders"
    <div>${basketHtml}</div>
    </div>
    <div class="divider"></div>
    
    <div id="checkoutBtn">
    <div class="sumEl">
    <div>Total price</div>
    <p>$ ${sum}</p>
    </div>
    <button class="orderBtn" id="orderBtn">Complete order</button>  
    </div>
    `
    return checkoutHtml;
} else {
    return ""
}
}

function getMenuHtml(){    
    let menuHtml = ``
    for (let item of menuArray){
        menuHtml += `
         <div class="menuItem">
           <div class="menuItemSection">
           <div class="itemImg">${item.emoji}</div>
           <div class="itemDetails">
                <h1>${item.name}</h1>
                <p class="ingridientsPrg">${item.ingredients}</p>
                <p>$ ${item.price}</p>
            </div>
            </div>
            
          <button id="addItemBtn" data-add="${item.id}">+</button>
          </div>
          <div class="divider"></div>
          
          <div id="modal" class="modal hidden">
          <p class="modal-title">Enter card details</p1>
          <form id="payment-form">
          <label for="cardHolderName"></label>
          <input type="text" required id="cardHolderName" name="cardHolderName" placeholder="Enter your name">
          
          <label for="cardNumber"></label>
          <input type="text" id="cardNumber" name="cardNumber" required placeholder="Enter card number">
          
          <label for="cardCvv"></label>
          <input type="password" id="cardCvv" name="cardCvv" required placeholder="Enter CVV">
          
          
          <button type="submit" class="payBtn" id="payBtn">Pay</button>
          </form>
          </div>  
           `  
             
    } 
    return menuHtml
}

function render(){
   
    document.getElementById('menu').innerHTML = getMenuHtml()
    document.getElementById('checkout').innerHTML = renderBasket()
          
}

render()