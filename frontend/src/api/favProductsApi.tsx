import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyFavItem = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  //@ts-ignore
  const createMyFavItemRequest = async (data) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/fav`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to add to fav");
    }
  };
  const {
    mutateAsync: addToFav,
    isLoading,
    error,
    reset,
    isSuccess,
  } = useMutation(createMyFavItemRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchAllFavItems");
    },
  });
  if (error) {
    toast.error("Error Adding to Fav");
    reset();
  }
  //
  if (isSuccess) {
    toast.success("Added to Fav");
    reset();
  }
  return {
    addToFav,
    isLoading,
  };
};

//

export const useGetMyFavItems = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyFavItemsRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    //
    const res = await fetch(`${API_BASE_URL}/api/fav`, {
      method: "GET",
      headers: {
        Authorizations: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch from fav");
    }
    //
    const data = await res.json();
    return data;
  };
  const {
    data: favData,
    isLoading,
    error,
  } = useQuery("fetchAllFavItems", getMyFavItemsRequest);
  if (error) {
    console.log("Error while fetching the fav", error);
  }
  return {
    favData,
    isLoading,
  };
};
export const useDeleteMyFavItems = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const deleteMyFavItemRequest = async (id: string) => {
    const accessToken = await getAccessTokenSilently();
    //
    const res = await fetch(`${API_BASE_URL}/api/fav`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to delete the fav item");
    }
  };
  const {
    error,
    reset,
    isSuccess,
    isLoading,
    mutateAsync: deleteFromFav,
  } = useMutation(deleteMyFavItemRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchAllFavItems");
    },
  });
  if (error) {
    toast.success("Error while removing ");
    reset();
  }
  //
  if (isSuccess) {
    toast.success("Removed From fav");
    reset();
  }
  return {
    deleteFromFav,
    isLoading,
  };
};
