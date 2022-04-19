import { projectFirestore } from "../../firebase/config";
// STYLES
import "./home.css";

// HOOKS
// import { useFetch } from '../../hooks/useFetch';
// import { useAxios } from '../../hooks/useAxios';
import { useEffect, useState } from "react";

// COMPONENTS
import Recipelist from "../../components/recipe-list/RecipeList";

// HOME FUNCTION
export default function Home() {
  const [response, setresponse] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    async function fetchData() {
      try {
        const response = await projectFirestore.collection("recipes").get();
        if (response.empty) {
          setIsPending(false);
          setError("no data found");
        } else {
          let result = [];
          response.docs.forEach((doc) => {
            result.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setresponse(result);
          setIsPending(false);
        }
      } catch (error) {
        setIsPending(false);
        setError(error);
      }
    }
    fetchData();
  }, []);

  // const {response, isPending, error} = useAxios('http://localhost:3000/recipes');
  // const {data, isPending, error}     = useFetch('http://localhost:3000/recipes')
  return (
    <div className="home">
      {error && <div className="error">{error}</div>}
      {isPending && <div className="loading">Loading data</div>}
      {response && <Recipelist recipes={response} />}
    </div>
  );
}
