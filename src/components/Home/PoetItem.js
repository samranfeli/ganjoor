import { Link } from "react-router-dom";
const PoetItem = (props) => {
  return (
    <Link to={props.item.fullUrl} className="block p-4 w-32 text-center">
      <div
        className="avatar w-20 h-20 bg-cover mr-auto ml-auto bg-center rounded-full border border-slate-300"
        style={{
          backgroundImage: `url("https://api.ganjoor.net${props.item.imageUrl}")`,
        }}
      />
      <h3 className="mt-2 text-gray-600 text-sm">{props.item.name}</h3>
    </Link>
  );
};

export default PoetItem;
