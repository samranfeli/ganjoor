
import Link from 'next/link';
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setUserData } from "@/store/userSlice";
import { UserData } from '@/Types';

const Login:React.FC = () => {
    const dispatch = useAppDispatch();

    let user: UserData['user'] | undefined;

    let ganjoorSessionId : string | undefined;

    if (typeof window !== "undefined"){
        ganjoorSessionId = localStorage?.getItem("G-sessionId") || undefined;
        user = useAppSelector(state => state.userData?.user);
    }
    useEffect(() => {

        if (ganjoorSessionId && !user) {
            getUserData(ganjoorSessionId);
        }

    }, [user,ganjoorSessionId]);

    const getUserData = async (id: string) => {
        const response = await fetch(`https://api.ganjoor.net/api/users/relogin/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response?.json();

        localStorage.setItem("G-sessionId", responseData.sessionId);
        dispatch(setUserData(responseData));

    }

    const logout = () => {
        localStorage.removeItem("G-sessionId");
        dispatch(setUserData(undefined));
    }

    return (
        <div>
            {user?(
                <>
                    <Link href='/profile' className='text-white hover:text-amber-400 transition-all ml-6'> پروفایل کاربری </Link>
                    <button type='button' className='text-white hover:text-amber-400 transition-all border-0 vazir' onClick={logout}> خروج </button>
                </>
            ):(
                <Link href='/login' className='text-white hover:text-amber-400 transition-all'>ورود</Link>                
            )}
        </div>
    )
}

export default Login;