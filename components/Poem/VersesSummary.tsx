import React from "react";

import { Verse } from "@/Types";

type Props = {
    verses: Verse[]
}

const VersesSummary: React.FC<Props> = props => {
    const { verses } = props;

    const filteredVerses = verses.filter(verse => verse.verses[0].coupletSummary);

    if (filteredVerses.length === 0) {
        return null;
    }

    return (
        <div className="text-center">
            <h4 className="mt-8 md:mt-10 mb-4 md:mb-6 text-lg font-semibold">برگردان به زبان ساده</h4>
            {filteredVerses.map(verse => <React.Fragment key={verse.coupletIndex} >

                {verse.verses.map(hemistich => <div key={hemistich.id} className="mb-1"> {hemistich.text} </div>)}

                <div className="bg-amber-50 border p-2 mt-2 mb-6 rounded border-amber-100">
                    {verse.verses[0]?.coupletSummary}
                </div>
            </React.Fragment>
            )}
        </div>
    )
}

export default VersesSummary;