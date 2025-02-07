import { MoreHorizontal, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TaskCardProps {
  id: string;
  taskName: string;
  startDate: string;
  endDate: string;
  statistics: "Ongoing" | "Completed" | "Todo";
  teamMembers: Array<{
    value: string;
  }>;
}

export function TaskCard({
  id,
  taskName,
  startDate,
  endDate,
  statistics,
  teamMembers,
}: TaskCardProps) {
  
  const statusColors = {
    Ongoing: "bg-[#0FC06B]",
    Completed: "bg-[#1D7575]",
    Todo: "bg-[#850018]",
    default: "bg-[#474747]",
  };

  const textStatusColors = {
    Ongoing: "text-[#0FC06B]",
    Completed: "text-[#1D7575]",
    Todo: "text-[#850018]",
    default: "text-[#474747]",
  };
  const iconStatusColors = {
    Ongoing: "border-[#0FC06B]",
    Completed: "border-[#1D7575]",
    Todo: "border-[#850018]",
    default: "border-[#474747]",
  };

  const timeLeft = new Date(endDate).getTime() - new Date(startDate).getTime() > 0 
  ? `${Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days remaining`
  : 'Deadline passed';

  return (
    <Link
      to={`/dashboard/project/tasks/${id}`}
      className="-mr-2 -mt-2"
    >
      <div className="rounded-[12px] border bg-white p-4 h-[158px]">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-medium">{taskName}</h3>

          <MoreHorizontal className={`h-5 w-5 ${textStatusColors[statistics]}`} />
        </div>
        <p className={`mt-1 text-sm ${textStatusColors[statistics]}`}>{timeLeft}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center -space-x-4">
          {teamMembers.map((member, i) => (
              <Avatar key={i} className="border-2 border-white">
                <AvatarImage src="" alt={member.value} />
                <AvatarFallback>{member.value[0]}</AvatarFallback>
              </Avatar>
            ))}
            <div className="pl-6">
              <Button
                variant="outline"
                size="icon"
                className={`h-8 w-8 rounded-full ${iconStatusColors[statistics]} border-2 border-dashed`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div
            className={`w-6 h-6 rounded-full ${statusColors[statistics]} flex items-center justify-center`}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div> 
        </div>
      </div>
    </Link>
  );
}





{/* <div
className={`w-6 h-6 rounded-full ${statusColors[status]} flex items-center justify-center`}
>
<svg
  className="w-4 h-4 text-white"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M5 13l4 4L19 7"
  />
</svg>
</div>  */}