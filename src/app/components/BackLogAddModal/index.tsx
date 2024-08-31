import { useBackLogFileImport } from "@/lib/hooks/useApi";
import useClickOutside from "@/lib/hooks/useOnClickOutside";
import { Button } from "@mui/material";
import { VscClose } from "@react-icons/all-files/vsc/VscClose";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface BackLogAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const BackLogAddModal = ({ isOpen, onClose }: BackLogAddModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { mutate: uploadBacklogFile, isPending } = useBackLogFileImport();
  const [file, setFile] = useState<File | undefined>();
  useClickOutside(ref, onClose);

  const handleSubmitButtonClick = () => {
    uploadBacklogFile(file!!, {
      onSuccess: () => {
        onClose();
        toast.success("Backlog 데이터가 성공적으로 업로드되었습니다.");
      },
    });
  };

  if (!isOpen) return null;
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
          <p>Backlog 데이터가 담긴 Excel 파일(.xlsx)을 업로드해주세요.</p>
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

export default BackLogAddModal;
