/**
 * @description
 * @author lihao
 * @date 2025/5/26 08:16
 */
import {getUserInfo, UserInfoDto} from "../../api/feature/user.ts";
import {createContext, useContext, useEffect, useState} from "react";

interface UserContextType {
    user: UserInfoDto | null;
    error: string | null;
}
const UserContext = createContext<UserContextType>({
    user: null,
    error: null,
});
export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const[user,setUser] = useState<UserInfoDto | null>(null);
    const[error,setError] =  useState<string | null>(null);
    useEffect(() => {
        const getUser = async () => {
            try{
                const data = await getUserInfo();
                setUser(data.data);
                if(!data.success){
                    setError(data.message);
                }
            }catch (err){
                setError('用户信息获取失败');
                console.log(err);
            }
        };
        getUser()
    }, []);
    return (
        <UserContext.Provider value={{ user,error}}>
            {children}
        </UserContext.Provider>
    );
}
export const useUser = () => useContext(UserContext);