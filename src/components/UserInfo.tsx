import { useMainStore } from "@src/stores/mainStoreProvider";
import { ProcessedUser } from "@src/types/common";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";

import linkIcon from "@assets/OutlineExternalLink.svg"; // SVG 경로를 설정

interface UserInfoProps {
  index: number;
  data: ProcessedUser;
}

/**
 * ProcessedUser를 렌더링하는 컴포넌트
 */
const UserInfo = ({ index, data }: UserInfoProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const searchInput = useMainStore((s) => s.searchInput); // Zustand에서 searchInput을 가져옴

  // 로그인 이름에서 검색어를 하이라이트 처리
  const getHighlightedLogin = (login: string) => {
    if (!searchInput) return login;

    const parts = login.split(new RegExp(`(${searchInput})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchInput.toLowerCase() ? (
        <mark key={index} className="font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // 즐겨찾기 상태 변경
  const handleBookmark = (e: MouseEvent<HTMLButtonElement>) => {
    setIsBookmarked(!isBookmarked);
    // 북마크 상태를 localStorage 또는 store에 저장하도록 추가 가능
    e.stopPropagation();
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100">
      <span className="w-10 text-center font-semibold">{index + 1}</span>
      <Image
        src={data.avatar_url}
        alt={`${data.login} avatar`}
        width={260}
        height={260}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex items-center gap-4 flex-grow">
        <h2 className="text-lg font-medium mr-auto">{getHighlightedLogin(data.login)}</h2>
        <button
          onClick={handleBookmark}
          className={`px-3 py-1 rounded-lg text-sm font-semibold text-white ${
            isBookmarked ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          {isBookmarked ? "북마크 해제" : "즐겨찾기"}
        </button>
        <Link href={data.html_url} target="_blank" className="flex items-center">
          <Image src={linkIcon} alt="Link to profile" width={24} height={24} className="mr-2" />
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
