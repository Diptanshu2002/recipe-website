import './recipe.css';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  { projectFirestore } from '../../firebase/config'
import trashCan from '../../img/trashCan.svg'
// import { useFetch } from '../../hooks/useFetch';


export default function Recipe () {

    const { id } = useParams();
    const history = useHistory();

    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    // const { data : recipe , isPending, error } = useFetch(`http://localhost:3000/recipes/${id}`)
    
    /*
    useEffect(()=>{
        setIsPending(true);
        async function fetchData(){
            try{
                const response = await projectFirestore.collection('recipes').doc(id).get();
                if(response.exists){
                    setRecipe({id:response.id, ...response.data()});
                    setIsPending(false);
                    
                }else{
                    setError('no data found');
                    setIsPending(false);
                }
            }catch(error){
                setError(error);
                setIsPending(false);
            }}
        fetchData();
        },[id])
    */
        useEffect(()=>{
            setIsPending(true);
            async function fetchData(){

                    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot(

                        (response)=>{
                            if(response.exists){
                                setRecipe({id:response.id, ...response.data()});
                                setIsPending(false);
                                
                            }else{
                                setError('no data found');
                                setIsPending(false);
                            }
                        },

                        (error)=>{
                            setError(error);
                            setIsPending(false);
                        }
                    ); 

                    return () => unsub(); 
                }
            fetchData();
            },[id])
    
    /* delete the recipe */
    async function handleClick(id){
        try {
            await projectFirestore.collection('recipes').doc(id).delete().then(()=>{
                history.push('/');
            })
            
        } catch (error) {
            console.log(error); 
        }
    }

    /* update the recipe */
    function handleClickUpdate(){
        projectFirestore.collection('recipes').doc(id).update({
            title:'biriyani'
        })
    }

    return (
        <div className='recipe'>
                {error && <h1> {error} </h1>}
                {isPending && <h1>Loading...</h1>}
                {recipe && (
                <>
                    <h2 className='page-title' >{recipe.title}</h2>
                    <p>Takes {recipe.cookingTime} to cook.</p>
                    <ul>
                        {recipe.ingredients && (recipe.ingredients.map((ingredient)=>(<li key={ingredient}>{ingredient}</li>)))}
                    </ul>
                    <p className='method'>{recipe.method}</p>
                    <img src={trashCan} alt="" onClick={()=>{handleClick(recipe.id)}}/>
                    <button onClick={handleClickUpdate} >update me</button>
                </>
                )}
        </div>
    );
}
