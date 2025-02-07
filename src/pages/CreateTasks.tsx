import { TaskForm } from "@/components/task-form";
import { tasksCollection } from "@/services/firebase";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateTasks() {
    const navigate = useNavigate()
    const handleCreateTask = async (data:any) => {
        try {

          await addDoc(tasksCollection, data);
          toast.success("Task created successfully!");
          navigate(-1); 
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
          console.error('Error creating task:', error);
        }
      };

  return (
    <div>
      <TaskForm
        onSubmit={(data) => {
          handleCreateTask(data)
        }}
      />
    </div>
  );
}
