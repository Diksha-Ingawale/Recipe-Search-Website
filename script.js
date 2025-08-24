/*const searchbox=document.querySelector('.searchbox');
const searchbtn=document.querySelector('.searchbtn');
const recipecontainer=document.querySelector('.recipe-container');
const recipedetailscontent=document.querySelector('.recipe-details-content');
const recipeclosebtn=document.querySelector('.recipe-closebtn');



function to get recipes
const fetchrecipes=async (query)=>{
    
    recipecontainer.innerHTML="<h2>fetching recipes...</h2>";

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();

    recipecontainer.innerHTML="";

    response.meals.forEach(meal => {
       const recipediv = document.createElement('div');
       recipediv.classList.add('recipe');
       recipediv.innerHTML=`

       <img src="${meal.strMealThumb}">
       <h3>${meal.strMeal}</h3>
       <p><span>${meal.strArea}</span> Dish</p>
      
       `
       const button=document.createElement('button');
       button.textContent="View Recipe";
       recipediv.appendChild(button);

        // add event listener to recipe button

        button.addEventListener('click',()=>{
            openrecipepopup(meal);
        });



       recipecontainer.appendChild(recipediv);
    });
   
}

const openrecipepopup=(meal)=>{

    recipedetailscontent.textContent= `

    <h2>${meal.strMeal}</h2>
    
    `
    recipedetailscontent.parentElement.style.display="block";
}

searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchinput=searchbox.value.trim();
    fetchrecipes(searchinput);
    //console.log("button clicked");
})*/

const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipedetailscontent = document.querySelector('.recipe-details-content');
const recipeclosebtn = document.querySelector('.recipe-closebtn');

// Function to get recipes
const fetchrecipes = async (query) => {
    recipecontainer.innerHTML = "<h2>Fetching recipes...</h2>";

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipecontainer.innerHTML = "";

    if (!response.meals) {
        recipecontainer.innerHTML = "<h2>No recipes found for your search.</h2>";
        return;
    }

    response.meals.forEach(meal => {
        const recipediv = document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
        `;
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipediv.appendChild(button);

        // Add event listener to recipe button
        button.addEventListener('click', () => {
            openrecipepopup(meal);
        });

        recipecontainer.appendChild(recipediv);
    });
};

const openrecipepopup = (meal) => {
    recipedetailscontent.innerHTML = `
        <button class="recipe-closebtn"><i class="fa fa-times"></i></button>
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Ingredients</h3>
        <ul>
            ${Object.keys(meal).filter(key => key.startsWith('strIngredient') && meal[key]).map(key => 
                `<li>${meal[key]} - ${meal[`strMeasure${key.slice(13)}`]}</li>`).join('')}
        </ul>
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    `;
    recipedetailscontent.parentElement.style.display = "block";

    // Add event listener to the close button inside the recipe details popup
    const recipeCloseBtn = recipedetailscontent.querySelector('.recipe-closebtn');
    recipeCloseBtn.addEventListener('click', () => {
        recipedetailscontent.parentElement.style.display = "none";
    });
};

// Event listener for the search button
searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    fetchrecipes(searchinput);
});



