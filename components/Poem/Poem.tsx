import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { Verse } from "@/Types";

type Props = {
    verses: Verse[]
}

const Poem: React.FC<Props> = props => {
    const { verses } = props;

    const [selectedText, setSelectedText] = useState<string>();
    const [tooltipPosition, setTooltipPosition] = useState<[number, number] | undefined>();

    const tooltipRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    const handleClick = (e: any) => {
        if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
            setSelectedText('');
        }
    }

    const mouseUpHandle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        const wrapperPos = wrapperRef.current!.getBoundingClientRect();

        setTooltipPosition([event.clientX - wrapperPos.x - 60, event.clientY - wrapperPos.y]);

        if (!window.getSelection) {
            return;
        }
        const text = window.getSelection()?.toString()?.trim();

        if (text) {
            setSelectedText(text);
        }
    }

    const touchEndHandle = (event: React.TouchEvent<HTMLDivElement>) => {
        if (!window.getSelection) {
            return;
        }

        const text = window.getSelection()?.toString()?.trim();

        if (text && selectedText !== text.trim()) {
            setSelectedText(text);

            const wrapperPos = wrapperRef.current!.getBoundingClientRect();
            setTooltipPosition([event.changedTouches[0].clientX - wrapperPos.x - 60, event.changedTouches[0].clientY - wrapperPos.y]);
        } 
    }

    return (
        <div className="relative" ref={wrapperRef}>
            {!!selectedText && !!tooltipPosition && (
                <div
                    ref={tooltipRef}
                    className="search-links-tooltip bg-black/70 absolute z-50 rounded mt-10 md:mt-4"
                    style={{ left: tooltipPosition[0], top: tooltipPosition[1] }}
                >
                    <Link 
                        target="_blank" 
                        href={`https://vajehyab.com/?q=${selectedText}`} 
                        className="inline-block p-2 text-white hover:bg-black rounded transition-all"
                    >
                        لغتنامه 
                    </Link>
                    
                    <Link 
                        target="_blank" 
                        href={`/search?s=${selectedText}`} 
                        className="inline-block p-2 text-white hover:bg-black rounded transition-all"
                    >
                        جستجو
                    </Link>

                </div>
            )}
            <div
                onMouseUp={mouseUpHandle} onTouchEnd={touchEndHandle}
                onContextMenu={e => { e.preventDefault() }}
            >
                {verses.map(verse => <React.Fragment key={verse.coupletIndex} >

                    {verse.verses[0].versePosition === -1 ? (
                        <p className="my-3 sm:my-6 leading-6 sm:leading-8 text-justify">
                            {verse.verses[0]?.text}
                        </p>
                    ) : verse.verses[0].versePosition === 2 || verse.verses[0].versePosition === 3 ? (
                        <div className="text-center mb-3 sm:mb-6 text-base sm:text-lg">
                            {verse.verses.map(hemistich => <div key={hemistich.id} className="text-bold"> {hemistich.text} </div>)}
                        </div>
                    ) : (
                        <div
                            className="sm:flex sm:justify-center mb-2 sm:mb-4 sm:flex-wrap"
                        >
                            {verse.verses.map(hemistich => <div key={hemistich.id} className={`sm:px-8 grow-0 shrink-0 basis-2/4 ${hemistich.versePosition === 0 ? "text-right sm:text-left" : "text-left sm:text-right"}`}> {hemistich.text} </div>)}
                        </div>
                    )}

                </React.Fragment>
                )}
            </div>
        </div>
    )
}

export default Poem;