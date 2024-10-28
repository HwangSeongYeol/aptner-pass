import { GetUsersParams } from "./useGetUsers";

const QUERY_KEY = {
  GET_USERS: (params?: Omit<GetUsersParams, "enabled">) => ["getUsers", params],
};

export default QUERY_KEY;
