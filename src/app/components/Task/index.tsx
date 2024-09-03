import { QueryKeys } from "@/data/queryKey";
import { useAppSelector } from "@/lib/hooks/redux";
import { useTodoDelete, useTodoUpdate } from "@/lib/hooks/useApi";
import useContextMenu, { ContextMenuItem } from "@/lib/hooks/useContextMenu";
import { TaskResponseDto } from "@/types/dto/task.dto";
import { Draggable } from "@hello-pangea/dnd";
import { Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { Form, useFormik } from "formik";
import { Dispatch, RefObject, SetStateAction, useRef } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

class Values {
  title: string;
  description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}

const validationSchema = Yup.object({
  title: Yup.string().required("제목은 비워둘 수 없습니다."),
  description: Yup.string().required("내용은 비워둘 수 없습니다."),
});

interface TaskProps {
  task: TaskResponseDto;
  index: number;
  scrollContainerRef: RefObject<HTMLElement>;
  isModifying: boolean;
  setModifyingTask: Dispatch<SetStateAction<number>>;
}

const Task = ({
  task,
  index,
  scrollContainerRef,
  isModifying,
  setModifyingTask,
}: TaskProps) => {
  const auth = useAppSelector((state) => state.auth.value);
  const standardContainerRef = useRef<HTMLElement | null>(null);
  const { values, handleSubmit, handleChange, touched, errors, resetForm } =
    useFormik({
      onSubmit: handlFormikSubmit,
      initialValues: new Values(task.title, task.description),
      validationSchema: validationSchema,
    });

  const queryClient = useQueryClient();
  const { mutate: deleteTask } = useTodoDelete();
  const { mutate: updateTask } = useTodoUpdate();

  const {
    contextMenuRef,
    contextMenuState,
    handleContextMenu,
    handleMenuItemClick,
  } = useContextMenu();

  const handleRightClick = (event: React.MouseEvent) => {
    const menuItems: ContextMenuItem[] = [
      {
        label: "수정",
        action: () =>
          handleMenuItemClick(() => {
            setModifyingTask(task.todo_id);
          }),
      },
      {
        label: "삭제",
        action: () =>
          handleMenuItemClick(() => {
            deleteTask(
              { todo_id: task.todo_id },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: QueryKeys.TASKS(task.status),
                  });
                },
              }
            );
          }),
      },
    ];

    handleContextMenu(
      event,
      menuItems,
      scrollContainerRef.current!!,
      standardContainerRef.current!!
    );
  };
  function handlFormikSubmit(values: Values) {
    updateTask(
      {
        todo_id: task.todo_id,
        title: values.title,
        description: values.description,
      },
      {
        onSuccess: () => {
          resetForm();
          toast.success("Task가 성공적으로 수정되었습니다.");
          queryClient.invalidateQueries({
            queryKey: QueryKeys.TASKS(task.status),
          });
          setModifyingTask(-1);
        },
      }
    );
  }

  if (
    auth.user_id > 0 &&
    (task.owner_id === auth.user_id || task.owner_id === null)
  )
    return (
      <>
        {isModifying ? (
          <form
            className="w-full bg-white rounded-md border border-border shadow-md flex flex-col gap-4 p-2"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <TextField
                className="!font-bold "
                variant="standard"
                name="title"
                value={values.title}
                onChange={handleChange}
                error={touched.title && !!errors.title}
                helperText={touched.title && errors.title}
              />
              <TextField
                className="[&_textarea]:text-comment [&_textarea]:text-sm"
                variant="standard"
                name="description"
                multiline={true}
                value={values.description}
                onChange={handleChange}
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
              />
            </div>
            <Button type="submit" variant="contained" size="small">
              수정
            </Button>
          </form>
        ) : (
          <Draggable
            key={task.todo_id}
            draggableId={task.todo_id.toString()}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                ref={(node) => {
                  provided.innerRef(node);
                  standardContainerRef.current = node;
                }}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={classNames(
                  "w-full bg-white rounded-md border border-border shadow-md transition-colors hover:bg-border touch-none p-2",
                  snapshot.isDragging && "bg-border"
                )}
                onContextMenu={handleRightClick}
                style={{
                  ...provided.draggableProps.style,
                  zIndex: snapshot.isDragging ? 1000 : "auto",
                  transform: snapshot.isDragging
                    ? provided.draggableProps.style?.transform
                    : "none", // 드래그 중이 아닐 때는 이동이 없도록
                }}
              >
                <div className="flex w-full">
                  <p className="font-bold flex-grow truncate">{task.title}</p>
                  {task.owner_id > 0 && (
                    <p className="text-primary text-xs">@{task.owner_name}</p>
                  )}
                </div>
                <p
                  className="text-comment text-sm text-ellipsis overflow-hidden"
                  style={{ WebkitLineClamp: 2 }}
                >
                  {task.description}
                </p>
              </div>
            )}
          </Draggable>
        )}
        {contextMenuState.isOpen && (
          <div
            ref={contextMenuRef}
            className="fixed rounded bg-white border border-border shadow z-50"
            style={{ top: contextMenuState.y, left: contextMenuState.x }}
          >
            {contextMenuState.menuItems.map((item) => (
              <div
                key={item.label}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => item.action()}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </>
    );
  return (
    <div
      className={classNames(
        "select-none w-full bg-white rounded-md border border-border shadow-md p-2 transition-colors hover:bg-border touch-none"
      )}
    >
      <div className="flex w-full">
        <p className="font-bold flex-grow truncate">{task.title}</p>
        {task.owner_id > 0 && (
          <p className="text-primary text-xs">@{task.owner_name}</p>
        )}
      </div>
      <p
        className="text-comment text-sm text-ellipsis overflow-hidden"
        style={{ WebkitLineClamp: 2 }}
      >
        {task.description}
      </p>
    </div>
  );
};

export default Task;
