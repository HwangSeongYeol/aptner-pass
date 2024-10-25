"use client";

import { SearchInput } from "@/components/SearchInput";
import useGetUsers from "@/hooks/useGetUsers";
import { useMainStore } from "@/stores/mainStoreProvider";

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
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

const AllUsersPage = () => {
  return <AllUsers />;
};

export default AllUsersPage;
