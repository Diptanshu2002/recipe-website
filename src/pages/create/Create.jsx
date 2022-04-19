import './create.css'

import { useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
// import { useFetch } from '../../hooks/useFetch';
// import { useAxios } from '../../hooks/useAxios';

export default function Create () {
    
    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [newIngredient , setnewIngredient] = useState('');
    const [ingredients , setingredients] = useState([]);

    const ingredientInput = useRef(null);
    const history = useHistory();

    const [response, setresponse] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    
    //const {postData, response, isPending, error} = useAxios('http://localhost:3000/recipes' , 'POST');
    // const {postData, data, isPending, error} = useFetch('http://localhost:3000/recipes' , 'POST');
    
    async function handleSubmit(e){
        setIsPending(true)
        e.preventDefault();
        const doc = {
                title,
                method,
                cookingTime : cookingTime + ' minutes',
                ingredients
            }
        try {
            const response = await projectFirestore.collection('recipes').add(doc);
            setresponse(response.id);
            setIsPending(false)
            setTimeout(() => {
                history.push('/')
            }, 2000);

        }catch (error) {
            setIsPending(false);
            setError(error.message)
        }
        
    }


    function addIng(e){
        e.preventDefault();
        const ing = newIngredient.trim();

        if(ing && !ingredients.includes(ing)){
            setingredients((prev)=>([...prev , ing]));
        }

        ingredientInput.current.focus();
        setnewIngredient('');
    }



    return (
        <div className='create'>
            <h2 className='page-title'>Add a New Recipe</h2>


            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe Title</span>
                    <input 
                        type="text"
                        onChange={(e)=>{setTitle(e.target.value)}}
                        value = {title}
                        placeholder = 'Biriyani'
                        required
                         />
                </label>


                {/* ingredients */}
                <label>
                    <span>Recipe ingredients</span>
                    <div className='ingredients'>
                        <input 
                            type="text"
                            onChange={(e)=>setnewIngredient(e.target.value)}
                            value = {newIngredient}   
                            ref = {ingredientInput} 
                        />
                        <button className='btn' onClick={addIng} >add</button>
                    </div>
                </label>
                        <p className='list'> current ingredients:  
                        {ingredients && ingredients.map((ingredient)=>(<em key={ingredient}>{ingredient}</em>))}
                        </p>


                <label>
                    <span>Recipe Method</span>
                    <textarea 
                        onChange={(e)=>{setMethod(e.target.value)}}
                        value = {method}
                        required
                    />
                </label>


                <label>
                    <span>Cooking Time (minutes):</span>
                    <input type="number"
                        onChange={(e)=>setCookingTime(e.target.value)}
                        value = {cookingTime}
                        required
                    />
                </label>

                <button className='btn' type='submit'>Submit</button>
            </form>
            {isPending && <div className='notice'>data saving to database</div>}
            {error && <div className='notice'>data failed to saved</div>}
            {response && <div className='notice'>data saved</div>}
        </div>
    );
}

