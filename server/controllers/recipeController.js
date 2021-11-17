require('../models/database')
const Category = require('../models/category')
const recipe = require('../models/recipe')

exports.homepage=async(req,res)=>{
    try {
        
        const categories= await Category.find({}).limit(5)
        const latest= await recipe.find({}).sort({id:-1}).limit(5);
        const latestRecipe=latest;
        res.render('index',{title:'Dishkoo - Home',categories,latestRecipe});
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}

exports.exploreCategories=async(req,res)=>{
    try {
        const categories=await Category.find({})
        res.render('categories',{title:'explore',categories})
    } catch (error) {
        
    }
}

exports.categoryRecipes=async(req,res)=>{
    try {
        const categoryName=req.params.id;
        let recipes=await recipe.find({category:categoryName})
        res.render('categoryRecipes',{title:`${categoryName} Recipes`,categoryName,recipes})
    } catch (error) {
        res.send({message:error.message})
    }
}

exports.recipeDetails=async(req,res)=>{
    try {
        const id=req.params.id;
        const recipeDet=await recipe.findById(id)
        res.render('recipe',{title:recipeDet?`${recipeDet.name}`:'Dishkoo',recipeDet})
    } catch (error) {
        res.send({message:error.message})
    }
}

exports.searchRecipe=async(req,res)=>{
    try {
        const {searchTerm}=req.body
        const recipes=await recipe.find( {$text: { $search: searchTerm, $diacriticSensitive: true } } )
        res.render('search',{title: 'search',recipes});
    } catch (error) {
        res.send({message:error.message})
    }
}

exports.submitRecipePage=async(req,res)=>{
    try {
        const infoErrorObj = req.flash('infoError')
        const infoSubmitObj = req.flash('infoSubmit')
        res.render('submitRecipe',{title: 'Submit-recipe',infoErrorObj,infoSubmitObj})
    } catch (error) {
        res.send({message:error.message})
    }
}

exports.submitRecipeData = async(req,res)=>{
    try {

        let imageUploadFile, uploadPath, newImageName;

        if(!req.files || Object.keys(req.files).length===0){
            console.log('No Files uploaded.');
        }
        else{
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;

            uploadPath = require('path').resolve('./')+'/public/uploads/'+newImageName;
            console.log('path', uploadPath,req.files.image);

            imageUploadFile.mv(uploadPath,(err)=>{
                if(err) return res.status(500).send(err);
            })
        }


        const newRecipe = new recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
        })

        await newRecipe.save();

        req.flash('infoSubmit','Form submitted successfully.')
        res.redirect('submit-recipe');
    } catch (error) {
        req.flash('infoError',error.message)
        res.redirect('submit-recipe');
    }
}

