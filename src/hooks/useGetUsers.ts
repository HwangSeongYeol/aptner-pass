import { InfiniteData, QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import QUERY_KEY from "./queryKeys";
import axiosInstance from "@src/utils/axios";
import { ProcessedUser, User } from "@src/types/common";
import { AxiosError, AxiosResponse } from "axios";

export const PER_PAGE = 20;

export interface GetUsersParams {
  q: string;
  sort?: "followers" | "repositories" | "joined";
  order?: "desc" | "asc";
  per_page?: number;
  enabled?: boolean;
}

export interface GetUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
}

interface GetUsersResult {
  users: ProcessedUser[];
  nextPage: number;
  totalCount: number;
}

/**
 * GitHub 사용자 검색을 위한 React Query 훅입니다.
 * 이 훅은 사용자의 검색 결과를 페이지네이션하여 가져옵니다.
 *
 * @param params - 검색에 사용되는 파라미터
 * @param params.q - 검색어 쿼리
 * @param params.sort - 정렬 기준 (followers | repositories | joined)
 * @param params.order - 정렬 순서 (desc | asc)
 * @param params.per_page - 한 페이지당 항목 수 (기본값: 20)
 * @param params.page - 현재 페이지 번호
 * @param params.enabled - 쿼리 활성화 여부
 *
 * @returns useInfiniteQuery의 결과를 포함하는 객체
 * - data: 검색된 사용자 목록과 추가 정보
 * - isLoading: 쿼리가 로딩 중인지 여부
 * - isError: 쿼리 에러 여부
 * - fetchNextPage: 다음 페이지를 가져오는 함수
 * - hasNextPage: 다음 페이지가 존재하는지 여부
 * - totalCount: 검색된 사용자 총 수
 *
 * @example
 * const { data, fetchNextPage, hasNextPage } = useGetUsers({
 *   params: { q: 'username in:login', sort: 'followers' },
 * });
 *
 * // 다음 페이지를 가져오려면
 * if (hasNextPage) {
 *   fetchNextPage();
 * }
 *
 * @see [GitHub API Docs](https://docs.github.com/ko/rest/search/search?apiVersion=2022-11-28#search-users)
 */

const useGetUsers = ({ props }: { props: GetUsersParams }) => {
  const { enabled = false, ...params } = props;
  const query = useInfiniteQuery<
    GetUsersResult,
    AxiosError,
    InfiniteData<GetUsersResult>,
    QueryKey,
    number // pageParam
  >({
    queryKey: QUERY_KEY.GET_USERS(params),
    queryFn: async ({ signal, pageParam = 1 }) => {
      const { data }: AxiosResponse<GetUsersResponse> = await axiosInstance.get("/search/users", {
        params: { ...params, per_page: params.per_page ?? 20, page: pageParam },
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
      return {
        users: result,
        nextPage: pageParam + 1,
        totalCount: data.total_count,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.users.length > 0 ? lastPage.nextPage : undefined;
    },
    enabled,
    retry: (failureCount, error) => {
      if (error.response?.status === 403) {
        const message = "API rate limit exceeded. No retries will be attempted.";
        console.error(message);
        alert(message);
        return false; // 재시도하지 않음
      }
      return failureCount < 3; // 최대 3회까지 재시도
    },
  });

  return query;
};

export default useGetUsers;
