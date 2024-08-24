import BookmarkHollowIcon from '@icon/BookmarkHollowIcon/BookmarkHollowIcon';

export default function Bookmark({ isBookmarked, setIsBookmarked }) {
  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div onClick={handleBookmark}>
      {/* {isBookmarked ? <BookmarkIcon /> : <BookmarkHollowIcon />} */}
      {isBookmarked ? <p>時薪書籤</p> : <BookmarkHollowIcon />}
    </div>
  );
}
