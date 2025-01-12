import { CheckoutSessionData } from "@/utils/Types";
import { useAuth0, User } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyUserRequest = async (user: CheckoutSessionData) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    //
    if (!res.ok) {
      throw new Error("Failed to create the user");
    }
    //
  };
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    reset,
    isSuccess,
  } = useMutation(createMyUserRequest);
  if (isError) {
    toast.error("Error while creating the user");
    reset();
  }
  if (isSuccess) {
    toast.success("User Created Successfully");
  }
  return {
    createUser,
    isLoading,
  };
};

const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async () => {
    try {
      // Wait for the access token
      const accessToken = await getAccessTokenSilently();

      const res = await fetch(`${API_BASE_URL}/api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to get the user");
      }

      return await res.json(); // Return the user data
    } catch (error) {
      throw error;
    }
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);

  if (error) {
    // toast.error(error.toString());
  }

  return {
    currentUser,
    isLoading,
  };
};

const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyUserRequest = async (updatedUserData: CheckoutSessionData) => {
    const accessToken = await getAccessTokenSilently();
    const req = await fetch(`${API_BASE_URL}/api/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });
    //
    if (!req.ok) {
      throw new Error("Error while updating the user");
    }
  };
  //
  const {
    mutateAsync: updateUser,
    isLoading,
    error,
    reset,
    isSuccess,
  } = useMutation(updateMyUserRequest);
  if (isSuccess) {
    toast.success("Updated Successfully");
    reset();
  } else if (error) {
    toast.error(error.toString());
    reset();
  }
  return {
    isLoading,
    updateUser,
  };
};

const useGetAllUsers = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllUsersRequest = async (): Promise<User[]> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/user/get-all-users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to create the user");
    }
    const data: User[] = await res.json();
    return data;
  };
  //
  const {
    data: allUsers,
    isLoading,
    isError,
    isSuccess,
  } = useQuery("fetchAllUsers", getAllUsersRequest);
  return {
    allUsers,
    isLoading,
    isError,
    isSuccess,
  };
};

export { useCreateMyUser, useGetMyUser, useUpdateMyUser, useGetAllUsers };
