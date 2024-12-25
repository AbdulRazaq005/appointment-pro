"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import moment from "moment";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const DAYS_OF_WEEK = [
  { name: "Sunday", value: 0 },
  { name: "Monday", value: 1 },
  { name: "Tuesday", value: 2 },
  { name: "Wednesday", value: 3 },
  { name: "Thursday", value: 4 },
  { name: "Friday", value: 5 },
  { name: "Saturday", value: 6 },
];

interface TimeSlot {
  from: string;
  to: string;
}

export function ConfigurationForm({
  daysOfWeek,
  slots,
}: {
  daysOfWeek: number[];
  slots: TimeSlot[];
}) {
  const [workingDays, setWorkingDays] = useState<number[]>(daysOfWeek);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(slots);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDayToggle = (day: number) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleTimeSlotChange = (
    index: number,
    field: "from" | "to",
    value: string
  ) => {
    setTimeSlots((prev) => {
      const newSlots = [...prev];
      newSlots[index] = { ...newSlots[index], [field]: value };
      return newSlots;
    });
  };

  const addTimeSlot = () => {
    setTimeSlots((prev) => [...prev, { from: "", to: "" }]);
  };

  const removeTimeSlot = (index: number) => {
    setTimeSlots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const configData = {
      workingDays,
      timeSlots: timeSlots.map((slot) => ({
        from: moment(slot.from, "HH:mm").toDate(),
        to: moment(slot.to, "HH:mm").toDate(),
      })),
    };
    if (configData.workingDays.length === 0) {
      alert("Please select at least one day of the week");
      setIsLoading(false);
      return;
    }
    if (configData.timeSlots.length === 0) {
      alert("Please select at least one time slot");
      setIsLoading(false);
      return;
    }

    try {
      axios.post("/api/configuration", {
        daysOfWeek: configData.workingDays,
        timeSlots: configData.timeSlots,
      });
      toast({
        variant: "default",
        title: "Saved!",
        description: "Configurations have been saved successfully.",
      });
    } catch (error) {
      console.error("Configuration save error:", error);
      alert("Failed to save configuration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Set Your Appointment Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Working Days</h3>
              <div className="mt-2 space-y-2">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day.value} className="flex items-center">
                    <Checkbox
                      id={day.name}
                      checked={workingDays.includes(day.value)}
                      onCheckedChange={() => handleDayToggle(day.value)}
                    />
                    <Label htmlFor={day.name} className="ml-2 text-lg">
                      {day.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-medium mb-2">Time Slots</h3>
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    type="time"
                    value={slot.from}
                    onChange={(e) =>
                      handleTimeSlotChange(index, "from", e.target.value)
                    }
                    required
                  />
                  <span>to</span>
                  <Input
                    type="time"
                    value={slot.to}
                    onChange={(e) =>
                      handleTimeSlotChange(index, "to", e.target.value)
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeTimeSlot(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900"
                type="button"
                onClick={addTimeSlot}
              >
                Add Time Slot
              </Button>
            </div>
          </div>
          <CardFooter className="px-0 pt-6">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              variant="default"
            >
              {isLoading ? "Saving..." : "Save Configuration"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
