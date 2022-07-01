import React,{ useState, useEffect} from "react";
import { Link,useLocation } from "react-router-dom";
import parse,{domToReact} from 'html-react-parser';

import useHttp from "../hooks/use-http";
import { Urls } from "../urls";

const PoemDetail = ()=>{
    const location = useLocation();
    const [poemDetail,setPoemDetail]= useState(undefined);
    const {loading,errorMessage,sendRequest:fetchPoetsData} = useHttp()
    
    useEffect(()=>{
      fetchPoetsData({url:`${Urls.getPageByUrl}?url=${location.pathname}`},setPoemDetail);
    },[fetchPoetsData,location.pathname]);
  
    const parseOptions = {
      replace: ({ attribs, children }) => {
        if (!attribs) {
          return;
        }
        if (attribs.href && attribs.href[0] !== "#") {
          return (<Link to={attribs.href}>{domToReact(children, parseOptions)}</Link>)
        }
      }
    };
    
    if (errorMessage){
      return <h2>{errorMessage}</h2>
    }
    
    return <div className="container mx-auto px-4">
         {loading ? (
          <h1>LOADING...</h1>
        ) : poemDetail ? (
            <div className="poem-details-html">
              {parse(poemDetail?.htmlText,parseOptions)}
            </div>
        ) : (
          <h2>there is no result</h2>
        )}
    </div>;
}

export default PoemDetail;