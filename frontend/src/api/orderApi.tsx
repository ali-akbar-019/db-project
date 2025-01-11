const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import { Order } from "@/utils/Types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchOrders = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/orders/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    return res.json();
  };

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery(["myOrders"], fetchOrders);

  if (error) {
    toast.error("Error fetching orders");
  }

  return { orders, isLoading, error };
};

export const useGetAllOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchAllOrders = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch all orders");
    }

    return res.json();
  };

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery(["allOrders"], fetchAllOrders);

  if (error) {
    toast.error("Error fetching all orders");
  }

  return { orders, isLoading, error };
};

export const useUpdateOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateOrderStatusRequest = async ({
    orderId,
    status,
  }: {
    orderId: string;
    status: string;
  }) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/order`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, status }),
    });

    if (!res.ok) {
      throw new Error("Failed to update order status");
    }

    return res.json();
  };

  const {
    mutateAsync: updateOrderStatus,
    isLoading,
    error,
    reset,
    isSuccess,
  } = useMutation(
    (data: { orderId: string; status: string }) =>
      updateOrderStatusRequest(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allOrders");
        queryClient.invalidateQueries("currentUserOrders");
        toast.success("Order status updated successfully");
        reset();
      },
      onError: (error: Error) => {
        toast.error(error.message || "Error updating order status");
        reset();
      },
    }
  );

  return { updateOrderStatus, isLoading, error, reset, isSuccess };
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (checkoutSessionData: any) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/order/checkout-session`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutSessionData),
    });

    if (!res.ok) {
      throw new Error("Failed to create checkout session");
    }

    return res.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
  } = useMutation(
    (checkoutSessionData) => createCheckoutSessionRequest(checkoutSessionData),
    {
      onSuccess: (data) => {
        window.location.href = data.url;
      },
      onError: (error: Error) => {
        toast.error(error.message || "Error creating checkout session");
      },
    }
  );

  return { createCheckoutSession, isLoading, error };
};
export const useCreateNewOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createNewOrderRequest = async (checkoutSessionData: any) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/order`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutSessionData),
    });

    if (!res.ok) {
      throw new Error("Failed to create checkout session");
    }

    return res.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
  } = useMutation(
    (checkoutSessionData) => createNewOrderRequest(checkoutSessionData),
    {
      onSuccess: (data) => {
        toast.success("Order created Successfully");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Error creating checkout session");
      },
    }
  );

  return { createCheckoutSession, isLoading, error };
};

export const useGetOrderById = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getOrderByIdRequest = async (id: string): Promise<Order> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/order/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch order");
    }

    return res.json();
  };

  const {
    mutateAsync: getOrderById,
    isError,
    reset,
    isLoading,
  } = useMutation(getOrderByIdRequest);
  if (isError) {
    toast.error("Error to fetch");
    reset();
  }
  return {
    getOrderById,

    isLoading,
  };
};

export const useGetCurrentUserOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getCurrentUserOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/order/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    return res.json();
  };

  const { data, error, isLoading } = useQuery<Order[], Error>(
    "currentUserOrders",
    getCurrentUserOrdersRequest,
    {
      refetchInterval: 5000,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};
