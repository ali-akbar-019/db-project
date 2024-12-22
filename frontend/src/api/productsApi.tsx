import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateNewProduct = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  //
  const createNewProductRequest = async (newProduct: any) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/product`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    //
    if (!res.ok) {
      throw new Error("Error while creating new product");
    }
  };
  //
  const {
    mutateAsync: createProduct,
    error,
    reset,
    isSuccess,
    isLoading,
  } = useMutation(createNewProductRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchAllProducts");
    },
  });
  if (isSuccess) {
    toast.success("Successfully Added Product");
    reset();
  }
  //
  if (error) {
    toast.error("Error while adding product");
    reset();
  }
  //
  return {
    createProduct,
    isLoading,
  };
  //
};

export const useGetAllProduct = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getAllProductsRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Error while fetching the products");
    }
  };
  //
  const {
    data: allProducts,
    isLoading,
    error,
  } = useQuery("fetchAlProducts", getAllProductsRequest);
  if (error) {
    toast.error("Error while fetching the products ");
  }
  //
  return {
    allProducts,
    isLoading,
  };
};

//
export const useUpdateProduct = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  //
  const updateProductRequest = async (updatedProduct: any) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      //
      body: JSON.stringify(updatedProduct),
    });
    //
    if (!res.ok) {
      throw new Error("Error while updating the product");
    }
  };
  //
  const {
    mutateAsync: updateProduct,
    error,
    isLoading,
  } = useMutation(updateProductRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchAllProducts");
    },
  });
  //
  if (error) {
    toast.error("Error while fetching the products");
  }
  return {
    isLoading,
    updateProduct,
  };
};

export const useDeleteProduct = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const deleteProductrRequest = async (id: string) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
  };
  //
  const {
    mutateAsync: deleteProduct,
    error,
    isSuccess,
    reset,
    isLoading,
  } = useMutation(deleteProductrRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchAllProducts");
    },
  });
  if (error) {
    toast.error("Error while deleting the product");
  }
  if (isSuccess) {
    toast.success("Successfully deleted the product");
    reset();
  }
  //
  return {
    deleteProduct,
    isLoading,
  };
};
export const useGetSingleProduct = (id: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const getSingleProductRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
  };
  const { data: singleProduct, isLoading } = useQuery(
    ["singleProduct", id],
    getSingleProductRequest,
    {
      enabled: !!id,
      onError: (error: Error) => {
        toast.error(error.message || "Error fetching the product");
      },
    }
  );
  return {
    isLoading,
    singleProduct,
  };
};

export const useUploadFile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const uploadFileRequest = async (formData: FormData) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/products/upload-file`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    if (!res.ok) {
      throw new Error("Error Adding the image");
    }
    //
    return res.json();
  };
  const {
    mutateAsync: uploadFile,
    error,
    isSuccess,
    isLoading,
    reset,
  } = useMutation(uploadFileRequest);
  if (error) {
    toast.error("Error while adding the image");
    reset();
  }
  if (isSuccess) {
    toast.success("Image Added");
    reset();
  }
  //
  return {
    isLoading,
    uploadFile,
  };
};

//
export type SearchState = {
  page: number;
  sortOption: string;
  searchQuery?: string;
};
export const useSearchProducts = (searchState: SearchState) => {
  const params = new URLSearchParams();

  //
  if (searchState.searchQuery != undefined) {
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("sortOption", searchState.sortOption);

    const createSearchRequest = async () => {
      const res = await fetch(
        `${API_BASE_URL}/api/products/search/?${params.toString()}`
      );
      if (!res.ok) {
        throw new Error("Failed to get restraunt data");
      }
      return res.json();
    };
    //
    const {
      data: results,
      isLoading,
      error,
    } = useQuery(["searchProduct", searchState], createSearchRequest, {
      keepPreviousData: true,
      onError: (error) => console.error("Search Request Failed", error),
    });
    return {
      results,
      isLoading,
      error,
    };
  }
};
