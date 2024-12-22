// // app/api/saveSchedule/route.ts

// export async function POST(req: Request) {
//     try {
//       // Parse the incoming request body
//       const { daysOfWeek, timeSlots }: { daysOfWeek: string[], timeSlots: string[] } = await req.json();

//       // Validate the data
//       if (!Array.isArray(daysOfWeek) || !Array.isArray(timeSlots)) {
//         return new Response(
//           JSON.stringify({ message: 'Both daysOfWeek and timeSlots must be arrays' }),
//           { status: 400 }
//         );
//       }

//       if (daysOfWeek.length === 0 || timeSlots.length === 0) {
//         return new Response(
//           JSON.stringify({ message: 'Days of week and time slots cannot be empty' }),
//           { status: 400 }
//         );
//       }

//       // Save the schedule (this would normally be done in a database)
//       const schedule = { daysOfWeek, timeSlots, createdAt: new Date() };

//       // For now, we're saving it in memory, but you can save to a DB here
//       global.schedules = global.schedules || []; // Using global object for simplicity
//       global.schedules.push(schedule);

//       return new Response(
//         JSON.stringify({ message: 'Schedule saved successfully', schedule }),
//         { status: 201 }
//       );
//     } catch (error) {
//       console.error('Error:', error);
//       return new Response(
//         JSON.stringify({ message: 'Internal server error' }),
//         { status: 500 }
//       );
//     }
//   }
