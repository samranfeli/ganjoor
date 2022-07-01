import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { Urls } from "../urls";

const PoetDetail = () => {
  const params = useParams();
  const [poetDetail, setPoetDetail] = useState(undefined);

  const {errorMessage,sendRequest:fetchPoetsData,loading} = useHttp(); 

  useEffect(() => {
    fetchPoetsData({url:`${Urls.getPoetDetails}?url=/${params.poetUrl}`},setPoetDetail);
  }, [fetchPoetsData,params.poetUrl]);

  if (errorMessage){
    return <h2>{errorMessage}</h2>
  }
  
  return (
    <div className="container mx-auto px-4">
      {loading ? (
        <h1>LOADING...</h1>
      ) : poetDetail ? (
        <div>
          <div className="py-6 md:py-10">
            <img
              src={"https://api.ganjoor.net" + poetDetail.poet.imageUrl}
              alt={poetDetail.poet.name}
              className="w-24 h-24 object-cover rounded-full border border-slate-300 mx-auto"
            />
            <h2 className="pt-5 font-semibold text-center">
              {poetDetail.poet.name}
            </h2>
          </div>
          <p className="mb-10 text-justify md:leading-7">
            {poetDetail.poet.description}
          </p>
          <ul className="list-none text-center">
            {poetDetail.cat.children.map((item) => (
              <li key={item.id} className="mb-4">
                <Link
                  to={item.fullUrl}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1 rounded-md inline-block transition-all"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>there is no result</h2>
      )}
    </div>
  );
};

export default PoetDetail;