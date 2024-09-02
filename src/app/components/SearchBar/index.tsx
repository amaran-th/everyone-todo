import { QueryKeys } from "@/data/queryKey";
import useDebounce from "@/lib/hooks/useDebounce";
import { TaskStatus } from "@/types/dto/task.dto";
import { Input } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ keyword, setKeyword }: SearchBarProps) => {
  const queryClient = useQueryClient();
  useDebounce(
    () => {
      Object.values(TaskStatus).forEach((status) =>
        queryClient.invalidateQueries({ queryKey: QueryKeys.TASKS(status) })
      );
    },
    300,
    keyword
  );
  return (
    <div className="flex justify-center">
      <Input
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        fullWidth
        placeholder="기본 제목 검색, ‘@사용자ID’로 소유주 검색"
        className="my-4 max-w-[540px] before:hidden after:hidden border border-comment rounded-full px-4 py-2 focus::border-primary"
      />
    </div>
  );
};

export default SearchBar;
