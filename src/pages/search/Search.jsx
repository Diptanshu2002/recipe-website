import './search.css';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
// import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/recipe-list/RecipeList'



const Search = () => {
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get('q');

    const url = 'http://localhost:3000/recipes?q=' + query;
    const {response, isPending, error} = useAxios(url);
    // const {data, isPending, error} = useFetch(url);
    // console.log(data);

    return (
        <div>
            <h2 className='page-title'>Recipes Including "{query}"</h2>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {response && <RecipeList recipes={response} />}
        </div>
    );
}

export default Search;
