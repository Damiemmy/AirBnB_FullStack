"use client"
import apiService from "@/services/ApiService"
import { useEffect } from "react"
import { getUserId } from "@/app/lib/action"
import UserLoginModal from "@/hooks/UseLoginModal"
const FavoriteButton = ({ id, is_favorite, markFavorite,loadingFavorite }) => {
    const openLoginModal=UserLoginModal()
  
     
/*
    const toggleFavorite = async (e) => {
        e.stopPropagation()

        try {
            const response = await apiService.post(
                `/api/properties/${id}/toggle_favorite/`,{}
            )
            markFavorite(response.is_favourite)
        

        } catch (error) {
            console.error(error)
        }
    }
*/ 
    

/*    const toggleFavorite = async (e) => {
    e.stopPropagation();

    try {
        const response = await apiService.post(
            `/api/properties/${id}/toggle_favorite/`, {}
        );

        // call parent with id and new value
        markFavorite(id, response.is_favourite); // <-- note id passed here
    } catch (error) {
        console.error(error);
    }
    };
*/
const toggleFavorite = async (e) => {
    e.stopPropagation();
    const userId=await getUserId()
    if(!userId){
        return openLoginModal.openModal()
    }
    
    try {
        const response = await apiService.post(
            `/api/properties/${id}/toggle_favorite/`, {}
        );

        // call parent with id and new value
        markFavorite(id, response.is_favourite); // <-- note id passed here
    } catch (error) {
        console.error(error);
    }
};

    return (
        <button
            onClick={toggleFavorite}
            disabled={loadingFavorite === id}
             className={`absolute top-2 right-2 ${loadingFavorite === id ? "opacity-50" : ""}`}
        >
            {is_favorite ? (
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="text-[#ff385c] size-6">

                    <path strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935
                          0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733
                          C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9
                          12s9-4.78 9-12Z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="size-6 text-white">

                    <path strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935
                          0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733
                          C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9
                          12s9-4.78 9-12Z" />
                </svg>
            )}
        </button>
    )
}

export default FavoriteButton

// "use client"

// import { useState } from "react"
// import apiService from "@/services/ApiService"

// const FavoriteButton = ({ id, is_favorite, markFavorite }) => {

//     const [favorite, setFavorite] = useState(is_favorite)

//     const toggleFavorite = async (e) => {
//         e.stopPropagation()

//         // 1️⃣ Optimistic UI update
//         const newValue = !favorite
//         setFavorite(newValue)

//         try {
//             // 2️⃣ Call API
//             const response = await apiService.post(
//                 `/api/properties/${id}/toggle_favorite/`
//             )

//             // 3️⃣ Sync with parent if needed
//             if (markFavorite) {
//                 markFavorite(response.is_favourite)
//             }

//         } catch (error) {

//             // 4️⃣ Revert UI if API fails
//             setFavorite(!newValue)

//             console.error("Favorite failed:", error)
//         }
//     }

//     return (
//         <button
//             onClick={toggleFavorite}
//             className="absolute top-2 right-2"
//         >
//             {favorite ? (
//                 <svg xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     className="text-[#ff385c] size-6"
//                 >
//                     <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
//                 </svg>
//             ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="size-6"
//                 >
//                     <path strokeLinecap="round" strokeLinejoin="round"
//                         d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//                     />
//                 </svg>
//             )}
//         </button>
//     )
// }

// export default FavoriteButton