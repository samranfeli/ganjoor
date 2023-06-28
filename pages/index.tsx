
import { Poet } from "../Types";
import PoetListItem from '../components/Poet/PoetListItem';

type Props = {
    poets: Poet[];
};

const Home:React.FC<Props> = props => {

  return (
      <div className="flex flex-wrap justify-center py-6">
        {props.poets?.map(poet => <PoetListItem poet={poet} key={poet.id}/>)}
      </div>
  )
}

export async function getStaticProps() {
 
    const poetsResponse = await fetch('https://api.ganjoor.net/api/ganjoor/poets');
    const poets = await poetsResponse.json();

    return {
        props: { poets: poets },
    };
}


export default Home;