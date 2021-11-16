const express=require('express');
const router=express.Router();
const recipeController=require('../controllers/recipeController');

router.get('/',recipeController.homepage);
router.get('/categories',recipeController.exploreCategories)
router.get('/category/:id',recipeController.categoryRecipes)
router.get('/recipe/:id',recipeController.recipeDetails)
router.post('/search',recipeController.searchRecipe)
router.get('/submit-recipe',recipeController.submitRecipePage)
router.post('/submit-recipe',recipeController.submitRecipeData)

module.exports=router;