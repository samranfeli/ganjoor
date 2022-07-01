import { useState, useCallback } from "react";

import axios from '../ganjoorAxios';

const useHttp = () => {

    const [loading,setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState();
  
    const sendRequest = useCallback (async(requestConfig,applyData) => {
        setLoading(true);
      try{
        const response = await axios({
          method: requestConfig.method || "get",
          url: requestConfig.url,
          data: requestConfig.data ?requestConfig.data : null 
        });
        setLoading(false);
        applyData(response.data);
      }catch (err){
        setLoading(false);
        setErrorMessage(err.message || "oops, something went wrong!");
      }
    },[]);
      
    return {
        loading,
        errorMessage,
        sendRequest
    }
}

export default useHttp;