const searchBox = document.querySelector(".searchBox");
const searchbtn = document.querySelector(".searchbtn");
const recipeContainar = document.querySelector(".recipe-containar");
const recipeDetailsContent = document.querySelector(".recipe-details-content")
const recipeCloseBtn = document.querySelector(".recipe-close-btn")


const fetchRecipes =  async (query)=>{
    recipeContainar.innerHTML=" <h2>Fetching recipes.....</h2>";
   const data = await fetch(` https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
   const respons = await data.json();
   
   
    recipeContainar.innerHTML="";
   respons.meals.forEach(meal => {

    console.log(meal);
     const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `<img src = ${meal.strMealThumb}> 

      <h3>${meal.strMeal}</h3>
      <p><span>${meal.strArea}</span> Dish</p>
      <p>Belong to <span>${meal.strCategory}</span> Cetegory</p>`;

      const button = document.createElement("button");
      button.textContent = "view recipe";
      recipeDiv.appendChild(button);
      recipeContainar.appendChild(recipeDiv);

      button.addEventListener("click",()=>{
        openRecipepopup(meal);
      })
    });
}

  const fetchIngredients = (meal)=>{
         let ingredientsList = "";
         for(let i =1 ; i<=20; i++){
          const ingredients = meal[`strIngredient${i}`];

          if(ingredients){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredients}</li>`
          }
          else{
            break;
          }
         }

         return ingredientsList;
  }

  const openRecipepopup = (meal)=>{
    recipeDetailsContent.innerHTML = `
     <h2>class ="recipeName">${meal.strMeal}</h2>
     <h3>ingredents :</h3>
     <ul class = "ingredientsList">${fetchIngredients(meal)}</ul>

     <div>
            <h3>instruction</h3>
            <p class = "recipeInstruction">${meal.strInstructions}</p>
        </div>

    `
    
    recipeDetailsContent.parentElement.style.display ="block";
    
  }
recipeCloseBtn.addEventListener("click",()=>{
  recipeDetailsContent.parentElement.style.display="none";
})
searchbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});
