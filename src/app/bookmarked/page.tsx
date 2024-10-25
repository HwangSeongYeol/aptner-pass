/**
 * localStorage에 bookmarked된 정보를 저장하고 map을 통해 노출
 * GitHub API에 쿼리를 다시 보내기 위해 localStorage에 최소화된 정보를 저장하였으나,
 * GitHub 검색 API의 쿼리 길이 제한 사항으로 인해 직접적인 문자열 길이 제한이 존재.
 * 제한 사항은 최대 256자의 검색 쿼리 문자열이 허용되며, 이를 초과하면 요청이 실패할 수 있음.
 * (참조: https://docs.github.com/ko/rest/search/search?apiVersion=2022-11-28#limitations-on-query-length)
 * 따라서, 쿼리 길이 제한을 피하기 위해 localStorage에 user정보를 최소화해서 저장하도록 구현.
 * @returns JSX.Element
 */
const Bookmarked = () => {
  return (
    <div>
      <h1>bookmarked</h1>
      <div></div>
    </div>
  );
};

const BookmarkedPage = () => {
  return <Bookmarked />;
};

export default BookmarkedPage;
