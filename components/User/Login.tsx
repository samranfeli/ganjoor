
import Link from 'next/link';
import { useCallback, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setUserData } from "@/store/userSlice";

const Login:React.FC = () => {
    const dispatch = useAppDispatch();

    let ganjoorSessionId : string | undefined;

    const user = useAppSelector(state => state.userData?.user);

    if (typeof window !== "undefined"){
        ganjoorSessionId = localStorage?.getItem("G-sessionId") || undefined;
    }

    const getUserData = useCallback(async (id: string) => {
        const response = await fetch(`https://api.ganjoor.net/api/users/relogin/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response?.json();

        localStorage.setItem("G-sessionId", responseData.sessionId);
        dispatch(setUserData(responseData));

    },[]);

    useEffect(() => {

        if (ganjoorSessionId && !user) {
            getUserData(ganjoorSessionId);
        }

    }, [user,ganjoorSessionId,getUserData]);



    const logout = () => {
        localStorage.removeItem("G-sessionId");
        dispatch(setUserData(undefined));
    }

    return (
        <div>
            {user?(
                <>
                    <Link href='/profile' className='text-sm md:text-base text-white md:hover:text-amber-400 transition-all ml-6'>                         
                         <span className='hidden md:inline-block'> پیشخوان کاربر  </span>
                         <i className="text-3xl zmdi zmdi-account md:hidden align-middle" />
                    </Link>

                    <button type='button' className='text-sm md:text-base text-white md:hover:text-amber-400 transition-all border-0 vazir' onClick={logout}>
                         
                         <span className='hidden md:inline-block'> خروج   </span>
                         <i className="text-3xl zmdi zmdi-power md:hidden align-middle" />
                    </button>
                </>
            ):(
                <Link href='/login' className='text-sm md:text-base text-white md:hover:text-amber-400 transition-all'>
                    
                    <span className='hidden md:inline-block'> ورود </span>
                    <i className=" text-3xl zmdi zmdi-account md:hidden align-middle" />
                </Link>                
            )}
        </div>
    )
}

export default Login;