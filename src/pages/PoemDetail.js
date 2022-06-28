import { useState, useEffect ,useCallback} from "react";
import { Link,useLocation } from "react-router-dom";
import parse from 'html-react-parser';

import axios from "../ganjoorAxios";
import { Urls } from "../urls";

const PoemDetail = ()=>{
    const location = useLocation();
    const [poemDetail,setPoemDetail]= useState(undefined);
    const [loading,setLoading] = useState(true);
    
    const fetchPoetsData = useCallback( async() => {
      try{
        const response = await axios.get(`${Urls.getPageByUrl}?url=${location.pathname}`);
        setLoading(false);
        setPoemDetail(response.data);
      }catch (err){
        setLoading(false);
      }
    },[location.pathname]);
    
    useEffect(()=>{
      fetchPoetsData();
    },[fetchPoetsData]);
  

    useEffect(()=>{
      console.log("LOADED")
    },[]);

    
    return <div className="container mx-auto px-4">
         {loading ? (
          <h1>LOADING...</h1>
        ) : location.pathname ? (
            <div>
                <div>
                    {poemDetail?.poetOrCat?.cat.children.map(item=><Link className="block" key={item.fullUrl} to={item.fullUrl}>{item.title}</Link>)}
                </div>
                {parse(poemDetail?.htmlText)}
               {/* <h2>{poetDetail.poet.name}</h2>
                <div>
                    {poetDetail.poet.description}
                </div>
                <hr/> */}
            </div>
        ) : (
          <h2>there is no result</h2>
        )}
    </div>;
}

export default PoemDetail;