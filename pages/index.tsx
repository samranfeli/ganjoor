
interface Poet {
birthPlace: string;
birthPlaceLatitude: number;
birthPlaceLongitude: number;
birthYearInLHijri:number;
deathPlace:string;
deathPlaceLatitude: number;
deathPlaceLongitude: number;
deathYearInLHijri: number;
description?:string;
fullUrl:string;
id:number;
imageUrl:string;
name:string;
nickname:string;
pinOrder:number;
published:boolean;
rootCatId:number;
validBirthDate:boolean;
validDeathDate:boolean;
}

type Props = {
    poets: Poet[];
};

const Home:React.FC<Props> = props => {

  return (
    <main>
      {props.poets?.map(x => <div key={x.id}>{x.name}<br/></div>)}
    </main>
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