import { useRouter } from "next/router";
import {useEffect} from 'react';

import UserInformation from "@/components/User/UserInformation";
import { useAppSelector } from "@/hooks/use-store";
import { UserData } from "@/Types";

const Profile : React.FC = () => {
    const userData: UserData | undefined = useAppSelector(state => state.userData);

    const router = useRouter();
    
    useEffect(() => {

        if (typeof window !== "undefined" && !localStorage?.getItem("G-sessionId")){
            router.push('/');
        }
        
    }, [userData?.user.id]);

    return (
        <div className="py-4 md:py-12">
            <UserInformation />
        </div>
    )
}

export default Profile;