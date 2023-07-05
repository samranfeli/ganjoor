import Link from 'next/link';

import {Recitation} from '../../Types';

type Props = {
    recitations: Recitation[]
}

const Recitation : React.FC<Props> = props => {
    const {recitations} = props;

    if (recitations.length === 0){
        return null;
    }

    return(
        <div className='text-center'>
            <h4 className="mt-8 md:mt-10 mb-4 md:mb-6 text-lg font-semibold">خوانش ها</h4>
            {recitations.map(recitation => <div className='mb-4 md:mb-8' key={recitation.id}>

            
            <audio controls className='w-full max-w-2xl mx-auto' preload="none" title={recitation.audioTitle}>  
                <source src={recitation.mp3Url} type="audio/mpeg" title={`${recitation.audioTitle} به خوانش ${recitation.audioArtist}`} />  
                مرورگر شما از پخش خوانش این شعر پشتیبانی نمیکند.
            </audio>  
                <h5 className='mt-2'>
                    <span className='ml-2'> {recitation.audioTitle} به خوانش </span>

                    {recitation.audioArtistUrl ? (
                        <Link href={recitation.audioArtistUrl} className="text-sky-400"> {recitation.audioArtist} </Link>
                    ) : (
                        <span> {recitation.audioArtist} </span>
                    )}
                </h5>

            </div>)}
        </div>
    )
}

export default Recitation;