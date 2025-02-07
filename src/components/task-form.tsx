import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronDown, Calendar, CirclePlus } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import DatePicker from "@/components/date-picker";
import { useEffect, useState } from "react";

interface TaskFormValues {
  taskName: string;
  description: string;
  teamLead: string;
  progress: number;
  startDate: Date;
  endDate: Date;
  teamMembers: any;
  notes: { value: string }[];
  feedbacks: { value: string }[];
  meetings: Date;
  priority: string;
  statistics: string;
}

interface TaskFormProps {
  initialValues?: TaskFormValues;
  onSubmit: (data: TaskFormValues) => void;
}

export function TaskForm({ initialValues, onSubmit }: TaskFormProps) {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [meetingsDate, setMeetingsDate] = useState<Date | undefined>();
 
  const { register, control, handleSubmit, setValue, watch } =
    useForm<TaskFormValues>({
      defaultValues: initialValues || {
        taskName: "",
        description: "",
        teamLead: "",
        progress: 0,
        startDate: undefined,
        endDate: undefined,
        teamMembers: [{ value: "", role: "" }],
        notes: [{ value: "" }],
        feedbacks: [{ value: "" }],
        meetings: undefined,
        priority: "",
        statistics: "",
      },
    });
  useEffect(() => {
    if (startDate) {
      setValue("startDate", startDate);
    }
  }, [startDate, setValue]);

  useEffect(() => {
    if (endDate) {
      setValue("endDate", endDate);
    }
  }, [endDate, setValue]);

  useEffect(() => {
    if (meetingsDate) {
      setValue("meetings", meetingsDate);
    }
  }, [meetingsDate, setValue]);

  const renderFieldArray = (
    name: "teamMembers" | "notes" | "feedbacks",
    label: string
  ) => {
    const { fields, append } = useFieldArray({ control, name });

    return (
      <Collapsible className="w-full" defaultOpen>
        <div className="flex items-center gap-4">
          <Label className="text-sm font-medium">{label}</Label>
          <CollapsibleTrigger>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-2">
          <div className="rounded-md border bg-white divide-y">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center">
                <Input
                  {...register(`${name}.${index}.value` as any)}
                  className="border-0 rounded-none capitalize focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
                  placeholder={`Enter ${name}`}
                />
               {name === "teamMembers" && <Input
                  {...register(`${name}.${index}.role` as any)}
                  className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
                  placeholder="Role"
                />}
                {index === fields.length - 1 &&
                (name === "teamMembers" || name === "notes") ? (
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs text-blue-500 font-normal mr-2"
                    onClick={() => append({ value: "", role: "" })}
                  >
                    + Add
                  </Button>
                ) : (
                  index === fields.length - 1 && (
                    <Button
                      variant="link"
                      className="h-auto p-0 text-xs text-blue-500 font-normal mr-2"
                      onClick={() => append({ value: "" })}
                    >
                      <CirclePlus />
                    </Button>
                  )
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <section
      className="min-h-screen bg-[#F8F8F8]"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <header className="px-4 pb-6 pt-3">
        <button
          onClick={() => window.history.back()}
          className="flex items-center font-bold text-md text-gray-700"
        >
          <ChevronLeft className="mr-2 h-6 w-6" />
          Back
        </button>
      </header>
      <section className="px-4 md:px-6 space-y-4">
        <div className="grid grid-cols-1 xl:grid-cols-6 items-start gap-4 md:gap-6">
          <div className="md:col-span-3 space-y-2">
            <Label
              htmlFor="taskName"
              className="text-sm font-medium text-green-600"
            >
              Task Name
            </Label>
            <Input id="taskName" {...register("taskName")} className="h-10" />
          </div>
          <div className="md:col-span-3 space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-yellow-600"
            >
              Description
            </Label>
            <Input id="description" {...register("description")} className="h-10" />
          </div>
          <div className="md:col-span-3 space-y-2">
            <Label
              htmlFor="teamLead"
              className="text-sm font-medium text-purple-600"
            >
              Team Lead
            </Label>
            <Input id="teamLead" {...register("teamLead")} className="h-10" />
          </div>
          <div className="md:col-span-3 space-y-2">
            <Label
              htmlFor="progress"
              className="text-sm font-medium text-cyan-600"
            >
              Progress (%)
            </Label>
            <Input 
              id="progress" 
              {...register("progress", { valueAsNumber: true })} 
              type="number"
              min={0}
              max={100}
              className="h-10" 
            />
          </div>
          <div className="md:col-span-6 flex flex-col md:flex-row gap-4">
            <div className="space-y-2 w-full max-w-full">
              <Label className="text-sm font-medium text-blue-500">
                Starting Date
              </Label>

              <DatePicker
                field={{
                  value: watch("startDate"),
                  onChange: (date: Date) => {
                    setStartDate(date);
                    setValue("startDate", date);
                  },

                  name: "startDate",
                }}
                placeholder="Select a date"
                icon={<Calendar className="text-blue-500 w-5 h-5" />}
                className="h-10"
              />
            </div>
            <div className="space-y-2 w-full max-w-full">
              <Label className="text-sm font-medium text-red-500">
                Ending Date
              </Label>

              <DatePicker
                field={{
                  value: watch("endDate"),
                  onChange: (date: Date) => {
                    setEndDate(date);
                    setValue("endDate", date);
                  },
                  name: "endDate",
                }}
                placeholder="Select a date"
                icon={<Calendar className="text-red-500 w-5 h-5" />}
                className="h-10"
              />
            </div>
          </div>
        </div>
        {renderFieldArray("teamMembers", "Team Members")}
        <Collapsible className="w-full" defaultOpen>
          <div className="flex items-center gap-4">
            <Label className="text-sm font-medium">Statistics</Label>
            <CollapsibleTrigger>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-2">
            <Input {...register("statistics")} className="h-10" />
          </CollapsibleContent>
        </Collapsible>
        {renderFieldArray("notes", "Notes")}
        {renderFieldArray("feedbacks", "Feedback")}
        <Collapsible className="w-full" defaultOpen>
          <div className="flex items-center gap-4">
            <Label className="text-sm font-medium">Priority</Label>
            <CollapsibleTrigger>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-2">
            <div className="rounded-md border bg-white divide-y">
              <div className="flex items-center">
                <Input
                  {...register("priority")}
                  className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
                />
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs text-blue-500 font-normal mr-2"
                >
                  <CirclePlus />
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible className="w-full" defaultOpen>
          <div className="flex items-center gap-4">
            <Label className="text-sm font-medium">Meetings (Optional)</Label>
            <CollapsibleTrigger>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-2">
            <div className="rounded-md border bg-white divide-y">
              <div className="flex items-center">
              <DatePicker
                  field={{
                    value: watch("meetings"),
                    onChange: (date: Date) => {
                      setMeetingsDate(date);
                      setValue("meetings", date);
                    },
                    name: "meetings",
                  }}
                  meetings={true}
                  placeholder={watch("meetings") || "Select a date"}
                  icon={<CirclePlus className="text-blue-500 w-5 h-5" />}
                  className="flex-1"
                />

                
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        
        <Button className="w-md bg-[#002B19] px-8 focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleSubmit(onSubmit)}>
          Save
      </Button>
      </section>
    </section>
  );
}
