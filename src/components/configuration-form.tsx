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

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface TimeSlot {
  from: string;
  to: string;
}

export function ConfigurationForm() {
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { from: "", to: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDayToggle = (day: string) => {
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
      timeSlots,
    };

    try {
      // Here you would typically send the data to your API
      console.log("Professional configuration data:", configData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // alert("Configuration saved successfully!");
    } catch (error) {
      console.error("Configuration save error:", error);
      // alert("Failed to save configuration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Your Working Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Working Days</h3>
              <div className="mt-2 space-y-2">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day} className="flex items-center">
                    <Checkbox
                      id={day}
                      checked={workingDays.includes(day)}
                      onCheckedChange={() => handleDayToggle(day)}
                    />
                    <Label htmlFor={day} className="ml-2">
                      {day}
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
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeTimeSlot(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addTimeSlot}>
                Add Time Slot
              </Button>
            </div>
          </div>
          <CardFooter className="px-0 pt-6">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Configuration"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
