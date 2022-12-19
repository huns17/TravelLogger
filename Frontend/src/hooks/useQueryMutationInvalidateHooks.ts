import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export const useQueryMutationInvalidateHooksDelete = (
  fetchURL?: string,
  queryKey?: string,
  token?: string
) => {
  const queryClient = useQueryClient();

  const addParam = async () => {
    return await axios.delete(fetchURL as string);
  };

  return useMutation(addParam, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export const useQueryMutationInvalidateHooksPost = (
  fetchURL?: string,
  queryKey?: string,
  token?: string
) => {
  const queryClient = useQueryClient();

  const addParam = async (addingParam?: any) => {
    return await axios.post(fetchURL as string, addingParam, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  return useMutation(addParam, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export const useQueryMutationInvalidateHooksPut = (
  fetchURL?: string,
  queryKey?: string
) => {
  const queryClient = useQueryClient();

  const addParam = async (addingParam?: any) => {
    return await axios.put(fetchURL as string, addingParam);
  };

  return useMutation(addParam, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

const useQueryMutationInvalidateHooks = {
  useQueryMutationInvalidateHooksDelete,
  useQueryMutationInvalidateHooksPost,
  useQueryMutationInvalidateHooksPut,
};

export default useQueryMutationInvalidateHooks;
