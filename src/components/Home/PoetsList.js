import {useState,useEffect} from 'react';

import { Urls } from '../../urls';
import PoetItem from "./PoetItem";
import useHttp from '../../hooks/use-http';

const PoetsList = () => {
  const [poets,setPoets]= useState([]);
  const {loading, errorMessage,sendRequest} = useHttp();

  useEffect(()=>{
    sendRequest({
      url:Urls.getAllPoets
    }
    ,
    setPoets);
  },[sendRequest]);
  
  if (errorMessage){
    return <h2>{errorMessage}</h2>
  }

  return (
    <section className="py-5">
      <div className="container px-4 mx-auto">
        {loading ? (
          <h1>LOADING...</h1>
        ) : poets?.length > 0 ? (
          <div className="flex flex-wrap justify-center">
            {poets.map((item) => (
              <PoetItem key={item.name} item={item} />
            ))}
          </div>
        ) : (
          <h2>there is no result</h2>
        )}
      </div>
    </section>
  );
};

export default PoetsList;
