import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Skeleton } from 'antd';

type Mesra = {
    id: number;
    coupletIndex: number;
    text: string;
}

type RandomResponse = {
    fullUrl: string;
    fullTitle: string;
    verses: Mesra[];
    sections: {
        poetId: number
    }[]
}

const Random: FC = () => {

    const [randomResponse, setRandomResponse] = useState<RandomResponse | undefined>();

    const [loading, setLoading] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState<string>("");

    const fetchRandomPoem = async () => {
        setLoading(true);
        setRandomResponse(undefined);
        setErrorMessage("");
        try {
            const response = await fetch(`https://api.ganjoor.net/api/ganjoor/poem/random`);

            const responseData = await response?.json();

            setRandomResponse({
                fullUrl: responseData.fullUrl,
                verses: responseData.verses,
                sections: responseData.sections,
                fullTitle: responseData.fullTitle
            });

            setLoading(false);

        } catch (err) {
            setLoading(false);
            setErrorMessage("متاسفانه درخواست شما با خطا روبرو شد!");
        }

    };

    useEffect(() => {
        fetchRandomPoem();
    }, []);

    let randomBeit: Mesra[] | undefined = undefined;

    if (randomResponse?.verses.length) {

        const beitsArray: { coupletIndex: number, beits: Mesra[] }[] = [];

        for (const verse of randomResponse.verses) {
            if (beitsArray.find(item => item.coupletIndex === verse.coupletIndex)) {
                const updatingItem = beitsArray.find(item => item.coupletIndex === verse.coupletIndex);
                updatingItem?.beits.push(verse);
            } else {
                beitsArray.push({
                    coupletIndex: verse.coupletIndex!,
                    beits: [verse]
                })
            }
        }
        const randomBeitIndex = Math.floor(Math.random() * beitsArray.length);
        if (beitsArray.length) {
            randomBeit = beitsArray[randomBeitIndex].beits;
        }
    }

    if(errorMessage){
        return(
            <div className="py-4 md:py-8 main-content-height-mobile md:main-content-height-desktop flex flex-col justify-between text-center">
                <div />
                <div className="items-center text-rose-500">
                    {errorMessage}
                </div>

                <div>
                    <span onClick={() => { fetchRandomPoem() }} className="cursor-pointer text-sky-500 md:hover:text-gray-500">تلاش دوباره  <i className={`zmdi zmdi-refresh mr-2 align-middle text-2xl w-4 ${loading ? "animate-spin" : ""}`} title="بیتی دیگر" /></span>
                </div>                
            </div>
        )
    }

    return (
        <div className="py-4 md:py-8 main-content-height-mobile md:main-content-height-desktop flex flex-col justify-between">
            <div />

            <div className="md:flex md:justify-between md:w-3/5 md:mx-auto">
                {randomBeit ? (
                    <>
                        {randomBeit.map(verseItem => <span className="block text-center mb-2 animate-fade-in md:text-xl" key={verseItem.id}>{verseItem.text}</span>)}
                    </>
                ) : (
                    <>
                        <Skeleton active paragraph={{ rows: 0 }} title={{ width: '100%' }} className="px-4" />
                        <Skeleton active paragraph={{ rows: 0 }} title={{ width: '100%' }} className="px-4" />
                    </>
                )}
            </div>

            <div className="text-center text-sm md:text-base">
                {randomResponse ? (
                    <Link href={randomResponse?.fullUrl || "#"} className="text-sky-500 md:hover:text-gray-500 mb-4 inline-block animate-fade-in" >{randomResponse?.fullTitle || " "}</Link>
                ) : (
                    <Skeleton.Input active size="small" className="mb-2" />
                )}

                <div>
                    <span onClick={() => { fetchRandomPoem() }} className="cursor-pointer text-sky-500 md:hover:text-gray-500">بیتی دیگر <i className={`zmdi zmdi-refresh mr-2 align-middle text-2xl w-4 ${loading ? "animate-spin" : ""}`} title="بیتی دیگر" /></span>
                </div>
            </div>
        </div>
    )
}

export default Random;