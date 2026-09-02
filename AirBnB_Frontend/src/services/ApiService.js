import { getAccessToken } from "@/app/lib/action";

const apiService = {
    
    get: async (url) => {
       
        console.log("get", url);

        try {
            const token = await getAccessToken()
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                       
                    },
                }
            );

            const json = await response.json();
            console.log("json", json);
            console.log("TOKEN:", token)

            return json;

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    },

    post: async (url, data) => {
        const token = await getAccessToken()
        console.log("=================================");
        console.log("POST REQUEST TO:", url);
        console.log("TOKEN BEING SENT:", token);
        console.log("=================================");


        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                        
                    },
                    body: data
                }
            );

            const json = await response.json();
            console.log("json", json);
           

            return json;

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    },
    // For unauthenticated requests
    postWithoutToken: async (url, data) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const json = await response.json();
            console.log(json)
            return json;
        } catch (error) {
            throw error;
        }
    }
    
};

export default apiService;
