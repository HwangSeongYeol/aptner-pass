import { GetUsersParams } from "./useGetUsers";

const QUERY_KEY = {
  GET_USERS: (params?: GetUsersParams) => ["getUsers", params],
};

export default QUERY_KEY;
