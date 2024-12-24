"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AppointmentDao,
  createAppointmentSchema,
} from "@/types/appointmentTypes";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

type AppointmentFormProps = {
  onBook: (appointment: AppointmentDao) => void;
  selectedDate: Date | undefined;
  selectedSlot: string | undefined;
  professionalId?: string | null;
};

export default function AppointmentForm({
  onBook,
  selectedDate,
  selectedSlot,
  professionalId,
}: AppointmentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedSlot && name && email && professionalId) {
      const payload = {
        professionalId,
        name,
        email,
        date: selectedDate,
        slotId: selectedSlot,
      };
      const parseResult = createAppointmentSchema.safeParse(payload);
      if (!parseResult.success) {
        console.error(
          "appointmentSchema validation error: ",
          parseResult.error
        );
        return;
      }
      const result = await axios.post(
        "/api/book/" + professionalId,
        parseResult.data
      );
      if (result.data.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.data.error,
        });
        return;
      }
      onBook(result.data.data);
      setName("");
      setEmail("");
      toast({
        title: "Booked!",
        description: "Your appointment has been booked successfully.",
      });
    }
  };

  // const handleSubmit = useCallback(
  //   async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (selectedDate && selectedSlot && name && email && professionalId) {
  //       const payload = {
  //         professionalId,
  //         name,
  //         email,
  //         date: selectedDate,
  //         slotId: selectedSlot,
  //       };
  //       const parseResult = createAppointmentSchema.safeParse(payload);
  //       if (!parseResult.success) {
  //         console.error(
  //           "appointmentSchema validation error: ",
  //           parseResult.error
  //         );
  //         return;
  //       }
  //       const actionResult = await bookAppointment(parseResult.data);
  //       if (!actionResult.error && actionResult.data) {
  //         onBook(actionResult.data);
  //         setName("");
  //         setEmail("");
  //         toast({
  //           title: "Booked!",
  //           description: "Your appointment has been booked successfully.",
  //         });
  //       }
  //     }
  //   },
  //   [selectedDate, selectedSlot, name, email, professionalId, onBook]
  // );

  return (
    <Card className="bg-white bg-opacity-80 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Book an Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white bg-opacity-50 backdrop-blur-sm"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white bg-opacity-50 backdrop-blur-sm"
            />
          </div>
          <Button
            type="submit"
            disabled={!selectedDate || !selectedSlot}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Book Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
