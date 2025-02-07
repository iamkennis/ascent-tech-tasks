import { CirclePlus } from "lucide-react";
import { TaskCard } from "@/components/tasks-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OngoingTaskCard } from "@/components/ongoing-card";
import { CompleteTaskCard } from "@/components/complete-card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tasksCollection } from "@/services/firebase";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const navigate = useNavigate();
  const [allTasks, setAllTasks] = useState<any>([]);
  const [filteredTasks, setFilteredTasks] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  
  
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  
  const fetchAllTasks = async (): Promise<void> => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(tasksCollection);
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllTasks(tasks);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllTasks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTasks(allTasks);
    } else {
      const filtered = allTasks?.filter((task:any) =>
        task?.taskName.toLowerCase()?.includes(searchQuery.toLowerCase())
       
      );
      setFilteredTasks(filtered);
    }
  }, [searchQuery, allTasks]);

  const filteredTodoTasks = allTasks?.filter((task: any) =>
    task.statistics === "Todo" &&
    (!searchQuery ||
      task.taskName?.toLowerCase()?.includes(searchQuery.toLowerCase()))
  );
  
  const filteredOngoingTasks = allTasks?.filter((task: any) =>
    task.statistics === "Ongoing" &&
    (!searchQuery ||
      task.taskName?.toLowerCase()?.includes(searchQuery.toLowerCase()))
  );
  
  const filteredCompleteTasks = allTasks?.filter((task: any) =>
    task.statistics === "Complete" &&
    (!searchQuery ||
      task.taskName?.toLowerCase()?.includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return <div>Loading task...</div>;
  }

  return (
    <main>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Project</h1>
        <Button
          className="bg-[#002B19] rounded-[8px] focus-visible:ring-0 focus-visible:ring-offset-0"
          onClick={() => navigate(`/dashboard/project/tasks/add`)}
        >
          <CirclePlus className="mr-2 h-10 w-10" />
          Add Tasks
        </Button>
      </div>
      <Tabs defaultValue="todo">
        <TabsList className="bg-transparent">
          <TabsTrigger
            value="todo"
            className="text-gray-500 font-bold data-[state=active]:bg-[#0D1B1E] data-[state=active]:text-white rounded-lg h-[37px] w-[118px]"
          >
            To Do
          </TabsTrigger>
          <TabsTrigger
            value="ongoing"
            className="text-gray-500 font-bold data-[state=active]:bg-[#0D1B1E] data-[state=active]:text-white rounded-lg h-[37px] w-[118px]"
          >
            On Going
          </TabsTrigger>
          <TabsTrigger
            value="complete"
            className="text-gray-500 font-bold data-[state=active]:bg-[#0D1B1E] data-[state=active]:text-white rounded-lg h-[37px] w-[118px]"
          >
            Complete
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todo" className="mt-6">
      {filteredTodoTasks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTodoTasks.map((task: any, i: number) => (
            <TaskCard key={i} {...task} />
          ))}
        </div>
      ) : (
        <div>No tasks found.</div>
      )}
    </TabsContent>

    <TabsContent value="ongoing" className="mt-6">
      {filteredOngoingTasks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredOngoingTasks.map((task: any, i: number) => (
            <OngoingTaskCard key={i} {...task} />
          ))}
        </div>
      ) : (
        <div>No tasks found.</div>
      )}
    </TabsContent>

    <TabsContent value="complete" className="mt-6">
      {filteredCompleteTasks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCompleteTasks.map((task: any, i: number) => (
            <CompleteTaskCard key={i} {...task} />
          ))}
        </div>
      ) : (
        <div>No tasks found.</div>
      )}
    </TabsContent>
      </Tabs>
    </main>
  );
}
