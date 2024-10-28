import { useQuery } from "@tanstack/react-query";
import QUERY_KEY from "./queryKeys";
import axiosInstance from "@src/utils/axios";
import { ProcessedUser, User } from "@src/types/common";
import { AxiosResponse } from "axios";

export interface GetUsersParams {
  q: string;
  sort?: "followers" | "repositories" | "joined";
  order?: "desc" | "asc";
  per_page?: number;
  page?: number;
}

export interface GetUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
}

const useGetUsers = ({ params }: { params: GetUsersParams }) => {
  const query = useQuery({
    queryKey: QUERY_KEY.GET_USERS(params),
    queryFn: async ({ signal }) => {
      const { data }: AxiosResponse<GetUsersResponse> = await axiosInstance.get("/search/users", {
        params: { ...params, per_page: params.per_page ?? 20 },
        signal,
      });
      const result = data.items.map(
        (item) =>
          ({
            avatar_url: item.avatar_url,
            html_url: item.html_url,
            id: item.id,
            login: item.login,
          }) as ProcessedUser
      );
      return result;
    },
    enabled: !!params.q,
  });
  return query;
};

export default useGetUsers;
