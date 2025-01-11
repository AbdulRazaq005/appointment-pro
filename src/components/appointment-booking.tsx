"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppointmentForm from "./appointment-form";
import AppointmentList from "./appointment-list";
import { Slot } from "@prisma/client";
import moment from "moment";
import { AppointmentDao } from "@/types/appointmentTypes";
import { displayTimeSlot } from "@/utils/displayUtils";
import { getDisabledDays } from "@/utils/configurationUtils";

export default function AppointmentBooking({
  userId,
  professionalId,
  timeSlots,
  workingDays,
  bookedAppointments,
}: {
  professionalId?: string | null;
  userId?: string | null;
  timeSlots: Slot[];
  workingDays: number[];
  bookedAppointments: AppointmentDao[];
}) {
  const [date, setDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>(
    undefined
  );
  const [appointments, setAppointments] =
    useState<AppointmentDao[]>(bookedAppointments);
  const [bookedSlotIds, setBookedSlotIds] = useState<string[]>([]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedSlot(undefined);
  };

  const handleAppointmentBook = (appointment: AppointmentDao) => {
    setAppointments([...appointments, appointment]);
  };

  useEffect(() => {
    if (userId) {
      setAppointments(
        bookedAppointments.filter(
          (appointment) => appointment.userId === userId
        )
      );
    }
  }, [bookedAppointments, userId]);

  useEffect(() => {
    if (date) {
      setBookedSlotIds(
        bookedAppointments
          .filter((appointment) =>
            moment(date).isSame(moment(appointment.date))
          )
          .map((appointment) => appointment.slotId)
      );
    }
  }, [date, bookedAppointments]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card className="bg-white bg-opacity-80 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Select a Date
            </CardTitle>
          </CardHeader>
          <CardContent style={{ width: "max-content" }}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border"
              numberOfMonths={2}
              fromDate={new Date()}
              toDate={moment().add(45, "day").toDate()}
              disabled={{
                dayOfWeek: getDisabledDays(workingDays),
              }}
            />
          </CardContent>
          {timeSlots?.length > 0 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Select a Time Slot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      disabled={bookedSlotIds.includes(slot.id)}
                      variant={selectedSlot === slot.id ? "default" : "outline"}
                      onClick={() => setSelectedSlot(slot.id)}
                      className="w-full"
                    >
                      {displayTimeSlot(slot)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
      <div className="space-y-6">
        <AppointmentForm
          onBook={handleAppointmentBook}
          selectedDate={date}
          selectedSlot={selectedSlot}
          professionalId={professionalId}
        />
        <AppointmentList appointments={appointments} />
      </div>
    </div>
  );
}
