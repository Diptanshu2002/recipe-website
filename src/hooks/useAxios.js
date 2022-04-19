import { useState, useEffect } from "react"
import axios from "axios"


export const useAxios = (url , method = 'GET') => {
  const [response, setresponse] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)


  const [data, setData] = useState(null)


  const postData = (postData)=>{
    setData(postData);
  }


  useEffect(() => {
    const controller = new AbortController()

    /* GET REQUEST FROM SEVER */
    const fetchData = async () => {
      setIsPending(true)
      try {
            const res = await axios.get(url, {signal: controller.signal})
            console.log(res.status);
            if(!(res.status === 200 || res.status === 304)) {
                throw new Error(res.statusText)
            }
            setIsPending(false)
            setresponse(res.data)
            setError(null)
      } catch (err) {
            if (err.name === "AbortError") {
                console.log("the fetch was aborted")
                setError('the fetch was aborted')
            } else {
                setIsPending(false)
                setError('Could not fetch the data')
            }
      }
    }

    /* POST REQUEST TO SERVER */
    const postData = async (data) => {
        setIsPending(true)
        try {
              const res = await axios.post(url, {...data})
              console.log(res.data);
              if(!res.status === 201) {
                  throw new Error(res.statusText)
              }
           
              setIsPending(false)
              setresponse(res.data)
              setError(null)
        } catch (err) {
              if (err.name === "AbortError") {
                  console.log("the fetch was aborted")
                  setError('the fetch was aborted')
              } else {
                  setIsPending(false)
                  setError('Could not fetch the data')
              }
        }
      }


    if(method === "GET"){
      fetchData()
    }
    if(method === 'POST' && data){
        postData(data);
    }

    return () => {
      controller.abort()
    }

  }, [url, method, data])

  return { response, isPending, error, postData}
}