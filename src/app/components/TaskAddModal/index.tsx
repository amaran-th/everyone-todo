import { QueryKeys } from "@/data/queryKey";
import { useBackLogFileImport } from "@/lib/hooks/useApi";
import useClickOutside from "@/lib/hooks/useOnClickOutside";
import { TaskStatus } from "@/types/dto/task.dto";
import { Button } from "@mui/material";
import { VscClose } from "@react-icons/all-files/vsc/VscClose";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface TaskAddModalProps {
  openedTaskGroup: TaskStatus|null;
  onClose: () => void;
}
const TaskAddModal = ({ openedTaskGroup, onClose }: TaskAddModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { mutate: uploadTaskFile, isPending } = useBackLogFileImport();
  const queryClient = useQueryClient()
  const [file, setFile] = useState<File | undefined>();
  useClickOutside(ref, onClose);

  const handleSubmitButtonClick = () => {
    uploadTaskFile(file!!, {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries({queryKey:QueryKeys.TASKS(openedTaskGroup!!)})
        toast.success(`Task 데이터가 성공적으로 ${openedTaskGroup}에 업로드되었습니다.`);
      },
    });
  };

  if (!openedTaskGroup) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm">
      <div
        ref={ref}
        className="bg-white shadow-md border border-border rounded-md flex-1 w-full max-w-[700px] flex-col gap-4 p-4 pb-8 flex"
      >
        <div className="w-full flex-1 justify-end flex">
          <button onClick={onClose}>
            <VscClose
              style={{ width: "32px", height: "32px" }}
              className="text-comment"
            />
          </button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p>Task 데이터가 담긴 Excel 파일(.xlsx)을 업로드해주세요.</p>
          <input
            type="file"
            accept=".xlsx"
            multiple={false}
            onChange={(e) => setFile(e.target.files?.[0])}
            className="border-2 border-border rounded-md p-2 "
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitButtonClick}
            disabled={isPending}
          >
            업로드
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskAddModal;
