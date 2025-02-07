import {
  ArrowLeft,
  Calendar,
  Flag,
  Target,
  Clock,
  BarChart,
  Phone,
  MessageCircleMore,
  MoreHorizontal,
  ChevronDown,
  PencilLine,
  ChevronLeft,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import {  fetchTaskById } from "@/services/firebase";
import {  Key, useEffect, useState } from "react";


export default function TaskDetailsPage() {
  const [task, setTask] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { taskId } = useParams();


  useEffect(() => {
    const getTask = async () => {
      setLoading(true);
      const fetchedTask = await fetchTaskById(taskId as string);
      setTask(fetchedTask);
      setLoading(false);
    };

    getTask();
  }, []);

  const items = [
    {
      label: "Task Name",
      value: task?.taskName || "N/A", 
      icon: Target,
      bgColor: "bg-[#F5F1FF]",
    },
    {
      label: "Starting Date",
      value: task?.startDate || "N/A", 
      icon: Calendar,
      bgColor: "bg-[#FEF4EB]",
    },
    {
      label: "Ending Date",
      value: task?.endDate || "N/A", 
      icon: Clock,
      bgColor: "bg-[#EBF0FE]",
    },
    {
      label: "Statistic",
      value: task?.statistics || "N/A", 
      icon: BarChart,
      bgColor: "bg-[#FFF4D8]",
    },
    {
      label: "Priority",
      value: task?.priority || "N/A", 
      icon: Flag,
      bgColor: "bg-[#F2F5F1]",
    },
  ];

  if (loading) {
    return <div>Loading task...</div>;
  }

  // console.log(task,"TASK")
  
 
  return (
    <div className=" bg-gray-50 p-3">
      <header className="mb-6 flex items-center justify-between">
        <button
          onClick={() => window.history.back()}
          className="flex items-center font-bold text-md text-gray-700"
        >
          <ChevronLeft className="mr-2 h-6 w-6" />
          Back
        </button>
        <Button
          variant="default"
          className="bg-[#002B19]"
          onClick={() => navigate(`/dashboard/project/tasks/edit/${taskId}`)}
        >
          <PencilLine className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </header>

     {task?.length > 0 ?  <div>Task not found.</div> : <> <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {items?.map((item, index) => (
          <Card
            key={index}
            className={`${item.bgColor} border-none p-3 flex items-center gap-2 sm:gap-3 w-md`}
          >
            <div className="bg-white p-1.5 sm:p-2 rounded-lg border border-black">
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-medium">
                {item.label}
              </span>
              <span className="text-[14px]  text-gray-500">
                {item.value}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center cursor-pointer gap-1">
            <h2 className="mb-4 text-sm font-medium">Team Members</h2>
            <ChevronDown className="w-5 h-5 -mt-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid xs:grid-cols-1 smgrid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           
              {task?.teamMembers?.map((member: { avatar: any; value: string; bgColor: any; role: any; }, i: Key | null | undefined) => (
                <Card
                  key={i}
                  className="xs:w-sm sm:w-full rounded-lg border-0 shadow-sm relative"
                >
                  <CardContent className="flex flex-col items-center p-4 sm:p-6">
                    <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.value || "User"} />
                      <AvatarFallback>{member.value ? member.value.substring(0, 2) : "U"}</AvatarFallback>
                    </Avatar>
                    <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5 absolute top-2 right-2 sm:right-3 text-gray-500 hover:text-gray-700 cursor-pointer" />
                    <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-medium">
                      {member.value || "Team Member"}
                    </h3>
                    <div
                      className={`${member.bgColor || "bg-gray-100"} px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mt-1.5 sm:mt-2`}
                    >
                      <p className="text-[10px] sm:text-xs font-normal text-gray-700">
                        {member.role || "Member"}
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-4 flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-6 w-10 sm:h-7 sm:w-12 p-0 bg-black hover:bg-black text-white rounded-md"
                      >
                        <Phone className="h-4 w-4 sm:h-6 sm:w-6" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-6 w-10 sm:h-7 sm:w-12 p-0 rounded-md"
                      >
                        <MessageCircleMore className="h-4 w-4 sm:h-6 sm:w-6" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="mt-8">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center cursor-pointer gap-1">
            <h2 className="mb-4 text-sm font-medium">Note</h2>
            <ChevronDown className="w-5 h-5 -mt-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="border-0 shadow-none bg-inherit">
              <CardContent className="p-4">
                <ul className="list-inside space-y-3 text-sm text-gray-600">
                {task?.notes?.map((note: { value: string },i:number) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                      {note.value}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="mt-8">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center cursor-pointer gap-1">
            <h2 className="mb-4 text-sm font-medium">Feedback</h2>
            <ChevronDown className="w-5 h-5 -mt-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="border-0 shadow-none bg-inherit">
              <CardContent className="p-4">
                <ul className="list-inside space-y-3 text-sm text-gray-600">
                {task?.feedbacks?.map((item: { value: string }, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                      {item.value}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-sm font-medium">Meeting</h2>
        <p className="text-sm text-gray-600">{task?.meetings}</p>
      </div> </> }
    </div>
  );
}
