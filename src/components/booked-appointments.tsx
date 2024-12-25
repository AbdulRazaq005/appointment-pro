"use client";

import { format } from "date-fns";
import { AppointmentDao } from "@/types/appointmentTypes";
import { Role } from "@prisma/client";
import { displayTimeSlot } from "@/utils/displayUtils";

export function BookedAppointments({
  appointments = [],
  role,
}: {
  appointments: AppointmentDao[];
  role: Role;
}) {
  return (
    <div className="space-y-4">
      {appointments.length === 0 && (
        <h1 className="text-gray-600 text-lg">No appointments booked yet.</h1>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {appointments.map((appointment, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:justify-between items-start p-0 rounded-md bg-white"
          >
            {role === Role.PROFESSIONAL ? (
              <div className="m-4 text-gray-800">
                <p className="font-bold text-gray-800">{appointment.name}</p>
                {appointment.email}
              </div>
            ) : (
              <div className="m-4">
                <p className="font-bold text-gray-800">
                  {appointment.professional?.name}
                </p>
                <p className="text-gray-600">
                  {appointment.professional?.specialisation}
                  <br />
                  {appointment.professional?.city},{" "}
                  {appointment.professional?.state}
                  <br />
                  {/* Fee: $ {appointment.professional?.fee} */}
                </p>
              </div>
            )}
            <div className="text-sm text-gray-600 flex flex-col justify-start place-items-end m-4">
              <p>{format(appointment.date, "PPP")}</p>
              <p className="my-1">{displayTimeSlot(appointment.slot)}</p>
              <span className="bg-green-300 p-1 rounded-md text-xs font-semibold text-green-800 ml-auto mr-0">
                Confirmed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
