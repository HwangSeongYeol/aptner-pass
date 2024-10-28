"use client";

import { SearchInput } from "@src/components/SearchInput";
import UserInfo from "@src/components/UserInfo";
import useGetUsers from "@src/hooks/useGetUsers";
import { useMainStore } from "@src/stores/mainStoreProvider";

/**
 * SearchInput에 입력받은 값을 통해 getUsers를 함
 * @returns JSX.Element
 */
const AllUsers = () => {
  const { searchInput } = useMainStore((s) => s);
  const { data } = useGetUsers({ params: { q: searchInput } });
  return (
    <div>
      <h1>all-users</h1>
      <div>
        <SearchInput />
      </div>
      <div>{data?.map((item) => <UserInfo key={item.id} data={item} />)}</div>
    </div>
  );
};

const AllUsersPage = () => {
  return <AllUsers />;
};

export default AllUsersPage;
