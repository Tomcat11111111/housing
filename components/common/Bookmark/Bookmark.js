import { BookmarkIcon } from 'lucide-react';

export default function Bookmark({ isBookmarked, setIsBookmarked }) {
  const handleBookmark = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div onClick={handleBookmark}>
      {isBookmarked ? (
        <BookmarkIcon fill="white" color="white" />
      ) : (
        <BookmarkIcon color="white" />
      )}
    </div>
  );
}
