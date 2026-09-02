'use server'
import { cookies } from "next/headers"

export async function handleRefresh(){
    console.log('handleRefresh')
    const cookieStore = await cookies(); // ✅ ADD THIS

    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
        console.log("No refresh token found");
        return null;
    }
    const token=await fetch('http://localhost:8000/api/auth/token/refresh',{
        method: 'POST',
        body:JSON.stringify({
           refresh: refreshToken,
        }),
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
    })
        .then(response => response.json())
        .then((json) =>{
            console.log('Response - Refresh:', json);

            if (json.access){
                cookieStore.set('session_accessToken', json.access, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60,
                    path: '/'
                });
                return json.access;
            }else{
                resetAuthCookies()
            }
        })
        .catch((error)=>{
            console.log('error:',error)
            resetAuthCookies()
        })

    return token



}

export async function handleLogin(userId, accessToken, refreshToken) {
    const cookieStore = await cookies(); // ✅ MUST await

    cookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    });

    cookieStore.set('session_refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    });

    cookieStore.set('session_accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
        path: '/'
    });
}


export async function resetAuthCookies() {
    const cookieStore = await cookies(); // ✅ MUST await

    cookieStore.set('session_userid', '');
    cookieStore.set('session_accessToken', '');
    cookieStore.set('session_refreshToken', '');
}


export async function getUserId() {
    const cookieStore = await cookies(); // ✅ MUST await

    const userId = cookieStore.get('session_userid')?.value;
    return userId ?? null;
}

export async function getAccessToken(){
    const cookieStore=await cookies();
    let accessToken=cookieStore.get('session_accessToken')?.value;
    if(!accessToken){
        const refreshToken = await getRefreshToken();

        if (!refreshToken) return null; 
        accessToken=await handleRefresh();

    }
    return accessToken ?? null;
}
export async function getRefreshToken(){
    const cookieStore=await cookies();
    let refreshToken=cookieStore.get('session_refreshToken')?.value;
    return refreshToken ?? null;
}