import axios from "axios";
import { useQuery } from "react-query";

export const useQueryComplicatedFetchHooks = (
  onSuccess?: (ar: any) => void,
  onError?: (ar: any) => void,
  fetchURL?: string,
  refetchInterval?: number,
  refetchOnWindowFocus?: boolean,
  queryName?: string,
  cacheTime?: number,
  enableFetch?: boolean,
  token?: string
) => {
  const {
    data: data,
    isFetching: isFetching,
    refetch: refetch,
    isError: isError,
  } = useQuery(
    queryName as string,
    async () => {
      const response = await axios.get(fetchURL as string, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      if (!data) {
        return;
      } else if (data) {
        return data;
      }
    },
    {
      onSuccess,
      onError,
      refetchInterval: refetchInterval,
      refetchOnWindowFocus: refetchOnWindowFocus,
      cacheTime: cacheTime,
      enabled: enableFetch,
    }
  );

  return { data, isFetching, isError, refetch };
};

export const useQuerySimpleFetchHooks = (
  onSuccess?: (ar: any) => void,
  onError?: (ar: any) => void,
  fetchURL?: string,
  refetchInterval?: number | false,
  refetchOnWindowFocus?: boolean,
  queryName?: string,
  cacheTime?: number,
  enableFetch?: boolean
) => {
  return useQuery(
    queryName as string,
    async () => {
      const response = await axios.get(fetchURL as string);
      const data = response.data;
      if (!data) {
        return;
      } else if (data) {
        return data;
      }
    },
    {
      onSuccess,
      onError,
      refetchInterval: refetchInterval,
      refetchOnWindowFocus: refetchOnWindowFocus,
      cacheTime: cacheTime,
      enabled: enableFetch,
    }
  );
};

export const useQueryHeaderFetchHooks = (
  onSuccess?: (ar: any) => void,
  onError?: (ar: any) => void,
  refetchInterval?: number,
  refetchOnWindowFocus?: boolean,
  queryName?: string,
  cacheTime?: number,
  fetchFnName?: ({
    skip,
    limit,
    sortInfo,
    groupBy,
    filterValue,
  }: any) => Promise<{ data: any; count: any }>
) => {
  const {
    data: data,
    isFetching: isFetching,
    refetch: refetch,
    isError: isError,
  } = useQuery(queryName!, fetchFnName!, {
    onSuccess,
    onError,
    refetchInterval: refetchInterval,
    refetchOnWindowFocus: refetchOnWindowFocus,
    cacheTime: cacheTime,
  });

  return { data, isFetching, isError, refetch };
};

const useQueryHooks = {
  useQueryComplicatedFetchHooks,
  useQuerySimpleFetchHooks,
  useQueryHeaderFetchHooks,
};

export default useQueryHooks;
