import useDebounce from "@/lib/hooks/useDebounce";
import { useState } from "react";

const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>("");
  useDebounce(() => {}, 300, keyword);
  return <div>aaa</div>;
};

export default SearchBar;
