import { TaskForm } from "@/components/task-form";
import { fetchTaskById, updateTask } from "@/services/firebase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditTasks() {
    const [task, setTask] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const { taskId } = useParams();
    const navigate = useNavigate()
  
  useEffect(() => {
    const getTask = async () => {
      setLoading(true);
      const fetchedTask = await fetchTaskById(taskId as string);
      setTask(fetchedTask);
      setLoading(false);
    };

    getTask();
  }, []);

  if (loading) {
    return <div>Loading task...</div>;
  }

  const handleOnSubmit = async (data:any) => {
    try {
        if (task && task.id) {
            await updateTask(task.id, data);
            toast.success("Task updated successfully");
            setTask(data);
            navigate(-1); 
        }
      
    } catch (error) {
        console.error("Error updating task in onSubmit:", error);
        toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
};

  return (
    <div>
      <TaskForm
        initialValues={task}
        onSubmit={(values) => {
            handleOnSubmit(values)
        }}
      />
    </div>
  );
}
