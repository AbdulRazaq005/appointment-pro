"use client";

import { useState } from "react";
// import { format } from 'date-fns'
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppointmentForm from "./appointment-form";
import AppointmentList from "./appointment-list";

export type Appointment = {
  id: string;
  date: Date;
  time: string;
  name: string;
  email: string;
  professionalId?: string;
};

const timeSlots = ["09:00", "11:00", "13:00", "15:00", "17:00"];

export default function AppointmentBooking({
  professionalId,
}: {
  professionalId?: string;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedTime(undefined);
  };

  const handleAppointmentBook = (appointment: Omit<Appointment, "id">) => {
    const newAppointment = {
      ...appointment,
      id: Math.random().toString(36).substr(2, 9),
      professionalId,
    };
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card className="bg-white bg-opacity-80 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Select a Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card className="bg-white bg-opacity-80 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Select a Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className="w-full"
                >
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <AppointmentForm
          onBook={handleAppointmentBook}
          selectedDate={date}
          selectedTime={selectedTime}
        />
        <AppointmentList
          appointments={appointments.filter(
            (a) => a.professionalId === professionalId
          )}
        />
      </div>
    </div>
  );
}
