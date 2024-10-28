"use client";

import SearchInput from "@src/components/SearchInput/SearchInput";
import Spinner from "@src/components/Spinner/Spinner";
import UserInfo from "@src/components/UserInfo/UserInfo";
import useGetUsers, { PER_PAGE } from "@src/hooks/useGetUsers";
import { useMainStore } from "@src/stores/mainStoreProvider";
import { useEffect, useRef } from "react";

/**
 * SearchInput에 입력받은 값을 통해 getUsers를 함
 * @returns JSX.Element
 */
const AllUsers = () => {
  const { searchInput } = useMainStore((s) => s);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUsers({
    props: { q: `${searchInput} in:login`, enabled: !!searchInput },
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    const curObserverRef = observerRef.current;

    if (curObserverRef) {
      observer.observe(curObserverRef);
    }

    return () => {
      if (curObserverRef) {
        observer.unobserve(curObserverRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      <div>
        <SearchInput />
      </div>
      <div>
        {data?.pages.map((page, pageIdx) =>
          page.users.map((user, idx) => (
            <UserInfo index={pageIdx * PER_PAGE + idx} key={user.id} data={user} />
          ))
        )}
      </div>
      <div ref={observerRef} className="h-1"></div>
      {isFetchingNextPage && (
        <div className="h-12 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

const AllUsersPage = () => {
  return <AllUsers />;
};

export default AllUsersPage;
