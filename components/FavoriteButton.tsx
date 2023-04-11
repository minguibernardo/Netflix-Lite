import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "../hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {

    const { mutate: mutateFavorite } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();
    const isFavorite = useMemo(()=>{
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId)
   },[currentUser, movieId])

   const toggleFavorites = useCallback( async () => {
   let response;
   if(isFavorite){
    response = await axios.delete('/api/favorite', {data: {movieId}});
   }else{
    response = await axios.post('/api/favorite', {movieId});
   }
   const  updatedFavoriteIds = response?.data?.favoriteIds;
   mutate({
    ...currentUser,
    favoriteIds:updatedFavoriteIds
   });
   mutateFavorite();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorite]);

  const Icon = isFavorite? AiOutlineCheck : AiOutlinePlus
 
  return (
    <div onClick={toggleFavorites} className="flex items-center justify-center w-6 h-6 transition border-2 border-white rounded-full cursor-pointer group/item lg:w-10 lg:h-10 hover:border-natural-300">
        <Icon className="text-white" size={25}/>
    </div>
  );
};
export default FavoriteButton;
