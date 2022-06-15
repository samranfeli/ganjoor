import {useState,useEffect} from 'react';

import axios from '../../ganjoorAxios';
import { Urls } from '../../urls';
import PoetItem from "./PoetItem";

const PoetsList = () => {
  const [poets,setPoets]= useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    fetchPoetsData();
  },[]);

  const fetchPoetsData = async() => {
    try{
      const response = await axios.get(Urls.getAllPoets);
      setLoading(false);
      setPoets(response.data);
    }catch (err){
      setLoading(false);
      debugger;
    }
  }

  return (
    <section className="py-5">
      <div className="container px-4 mx-auto">
        {loading ? (
          <h1>LOADING...</h1>
        ) : poets.length > 0 ? (
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
