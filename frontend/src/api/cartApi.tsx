import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyCartItem = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  //
  //@ts-ignore
  const createMyCartRequest = async (data) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to add to cart");
    }
  };
  const {
    mutateAsync: addToCart,
    isLoading,
    error,
    reset,
    isSuccess,
  } = useMutation(createMyCartRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchAllCartItems");
    },
  });
  if (error) {
    toast.error("Error Adding To Cart");
    reset();
  }
  if (isSuccess) {
    toast.success("Added To Cart");
    reset();
  }
  return {
    addToCart,
    isLoading,
  };
};

export const useGetCurrentUserCart = () => {
  const { getAccessTokenSilently } = useAuth0();
  //
  const getCurrentUserCartRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch the current user cart");
    }

    const data = await res.json();
    return data;
  };
  const {
    error,
    data: cartData,
    isLoading,
  } = useQuery("fetchAllCartItems", getCurrentUserCartRequest);
  if (error) {
    // toast.error("Error while fetching the cart");
  }
  //
  return {
    isLoading,
    cartData,
  };
};

export const useUpdateMyCart = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const updateCartRequest = async (updateData: {
    id: string;
    quantity: number;
  }) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    if (!res.ok) {
      throw new Error("Failed to update to cart");
    }
  };
  const {
    mutateAsync: updateCart,
    error,
    reset,
    isSuccess,
    isLoading,
  } = useMutation(updateCartRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchAllCartItems");
    },
  });
  if (isSuccess) {
    toast.success("Cart Updated");
    reset();
  }
  //
  if (error) {
    toast.error("Error while Updating");
    reset();
  }
  //
  return {
    updateCart,
    isLoading,
  };
  //
};

//
export const useDeleteFromCart = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const deleteFromCartRequest = async (id: string) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/cart`, {
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
      throw new Error("Failed to delete from cart");
    }
  };
  //
  const {
    mutateAsync: deleteFromCart,
    error,
    isSuccess,
    reset,
    isLoading,
  } = useMutation(deleteFromCartRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchAllCartItems");
    },
  });
  //
  if (isSuccess) {
    toast.success("Deleted from cart successfully");
    reset();
  }
  //
  if (error) {
    toast.error("Error while deleting from the cart");
    reset();
  }
  //
  return {
    isLoading,
    deleteFromCart,
  };
};

//
export const useMarkOrderedFromCart = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const markOrderdFromCartRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/cart/mark-ordered`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    });
    //
    if (!res.ok) {
      throw new Error("Failed to update from cart");
    }
  };
  //
  const {
    mutateAsync: markOrdered,
    error,
    isSuccess,
    isLoading,
    reset,
  } = useMutation(markOrderdFromCartRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchAllCartItems");
    },
  });
  //
  if (error) {
    toast.error("Error updating ");
    reset();
  }
  //
  if (isSuccess) {
  }
  //
  return {
    isLoading,
    markOrdered,
  };
};
