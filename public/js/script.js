let addIngredientBtn = document.getElementById('ingredientsBtn')
let ingredientList = document.querySelector('.ingredientsList')
let ingredientDiv = document.querySelectorAll('.ingredientDiv')[0]

addIngredientBtn.addEventListener('click',()=>{
    let newIngredientDiv = ingredientDiv.cloneNode(true);
    let input = newIngredientDiv.getElementsByTagName('input')[0];
    input.value='';
    ingredientList.appendChild(newIngredientDiv);
})