//STYLES
import './recipeList.css'
//
import { Link } from 'react-router-dom';

// COMPONENTS
// RECIPE-LIST FUNCTION 
export default function Recipelist({ recipes }){

    if(recipes.length === 0){
        return <div className='error'>No recipes to load...</div>
    }
    return (
        <div className='recipe-list' >
            {recipes.map((recipe)=>(
                    <Link to={'/recipes/'+recipe.id} style = {{textDecoration:'none'}} key={recipe.id} >
                        <div  className = 'card'>
                            <h3>{recipe.title}</h3>
                            <p className='' > {recipe.cookingTime} to make</p>
                            <div>{recipe.method.substring(0,80)}...</div>
                        </div>
                    </Link>
            ))}
        </div>
    );
}

