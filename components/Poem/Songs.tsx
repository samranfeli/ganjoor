import Link from 'next/link';
import React, { Fragment } from 'react';
import { Row, Col } from 'antd';

import { Song } from '../../Types';

type Props = {
    songs: Song[]
}

const Songs: React.FC<Props> = props => {
    const { songs } = props;

    if (songs.length === 0) {
        return null;
    }

    return (
        <div className='text-center px-2 md:px-4 bg-rose-50 border border-rose-200 pt-2 md:pt-6 mt-6 md:mt-10 rounded'>

            <h4 className="mb-2 text-lg font-semibold">آهنگ ها</h4>
            <p className='mb-2 md:mb-6'>
                این شعر را چه کسی در کدام آهنگ خوانده است؟
            </p>

            {songs.map(song => <Fragment key={song.id}>
                {song.trackUrl ? <Link href={song.trackUrl} target='_blank' className='group mb-4 md:mb-8 bg-white flex justify-between items-center mb-3 rounded py-3 px-4 text-right shadow hover:shadow-lg transition-all' >
                    <Row align={'middle'} gutter={[10, 10]}>
                        <Col>
                            <i className="zmdi zmdi-collection-music ml-2 text-3xl align-middle" /> <i> <b> "{song.trackName}" </b> </i>
                        </Col>
                        <Col>
                            {!!song.artistName && <> با صدای <b className='mx-1'> {song.artistName} </b> </>} {song.albumName && <span> (آلبوم {song.albumName})</span>}
                        </Col>
                    </Row>
                    <i className="zmdi zmdi-chevron-left mr-2 align-middle text-2xl w-4 group-hover:-ml-1 transition-all" />
                </Link> : null}
            </Fragment>)}
        </div>
    )
}

export default Songs;