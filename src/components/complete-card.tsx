import { MoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TaskCardProps {
  id: string;
  taskName: string;
  startDate: string;
  endDate: string;
  progress: number;
  statistics: string;
  teamLead: string;
  teamMembers: Array<{
    value: string;
    role: string;
  }>;
  completed?: boolean;
}

export function CompleteTaskCard({
  id,
  taskName,
  startDate,
  endDate,
  progress,
  statistics,
  teamLead,
  teamMembers,
  completed,
}: TaskCardProps) {
  const statusColors = {
    blue: "text-blue-500",
    green: "text-emerald-500",
    red: "text-red-500",
    purple: "text-purple-500",
  };

  const progressBarColors = {
    blue: "bg-blue-500",
    green: "bg-emerald-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
  };

  return (
    <Link to={`/dashboard/project/tasks/${id}`} className="-mr-2 -mt-2">
      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-md font-medium">{taskName}</h3>
          <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {startDate} - {endDate}
        </p>
        <div className="mt-4 space-y-4">
          <article className="text-right mb-2">
            <span
              className={`text-sm font-medium  ${
                statusColors[statistics === "Ongoing" ? "blue" : "green"]
              }`}
            >
              {progress}%
            </span>
          </article>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full ${
                progressBarColors[statistics === "Ongoing" ? "blue" : "green"]
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {teamMembers.map((member, i) => (
                <Avatar key={i} className="border-2 border-white h-7 w-7">
                  <AvatarImage src="" alt={member.value} />
                  <AvatarFallback>{member.value[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div
              className={`p-2 rounded-full bg-gradient-to-r from-white/50 via-${
                progressBarColors[statistics === "Ongoing" ? "blue" : "green"]
              }/10 to-white/50`}
            >
              <p
                className={`${
                  statusColors[statistics === "Ongoing" ? "blue" : "green"]
                } text-sm`}
              >
                {completed ? "Completed" : statistics}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
