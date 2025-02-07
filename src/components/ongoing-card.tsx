import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface TaskCardProps {
  id: string;
  taskName: string;
  description: string;
  startDate: string;
  teamLead: string;
  endDate: string;
  progress: number;
  progressColor: string;
  progressColorText: string;
  teamMembers: Array<{ value: string; role: string }>;
}

export function OngoingTaskCard({
  id,
  taskName,
  description,
  startDate,
  teamLead,
  endDate,
  progress,
  progressColor,
  progressColorText,
  teamMembers,
}: TaskCardProps) {

  const progressBarColors = {
    blue: "bg-blue-500",
    green: "bg-emerald-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
  };

  const barColor = progressBarColors[progressColor as keyof typeof progressBarColors] || "bg-blue-500";


  return (
    <Link
       to={`/dashboard/project/tasks/${id}`}
      className="-mr-2 -mt-2"
    >
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">{taskName}</h3>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-2 text-[13px] text-gray-500">{description}</p>
      <div className="mt-4 text-sm space-y-2">
        <div className="flex justify-between text-gray-500">
          <span className="text-xs">Created</span>
          <span className="text-blue-500 font-medium text-[13px]">{startDate}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span  className="text-xs">Team Lead</span>
          <span className="text-blue-600 font-medium text-[13px]">{teamLead}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span  className="text-xs">Deadline</span>
          <span className="text-red-500 font-medium text-[13px]">{endDate}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <text className="text-sm font-medium">Team</text>
          <div className="flex -space-x-2">
          {teamMembers.map((member, i) => (
              <Avatar key={i} className="border-2 border-white h-7 w-7">
                <AvatarFallback>{member.value[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>        
      </div>
      <section className=" mt-3">
        <article className="text-right mb-2">
        <span className={cn("text-sm font-medium", progressColorText)}>{progress}%</span>
        </article>
      <div className="h-1.5  w-full bg-gray-200 rounded-full">
          <div
           className={cn("h-1.5 rounded-full", barColor)}
           style={{ width: `${progress}%` }}
          />
        </div>
        
      </section>
      
    </div>
    </Link>
  );
}
