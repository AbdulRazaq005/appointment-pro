import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const featuredProfessionals = [
  {
    id: "1",
    name: "Dr. Jane Smith",
    specialty: "General Practitioner",
    avatar: "/avatar.jpg",
  },
  {
    id: "2",
    name: "Dr. John Doe",
    specialty: "Dentist",
    avatar: "/avatar.jpg",
  },
  {
    id: "3",
    name: "Dr. Emily Brown",
    specialty: "Psychologist",
    avatar: "/avatar.jpg",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">
              Book Your Next Appointment with Ease
            </h1>
            <p className="text-xl mb-6">
              Connect with top professionals in various fields and schedule your
              appointment hassle-free.
            </p>
            <Link href="/professionals">
              <Button size="lg">Find a Professional</Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/cover.png"
              alt="Appointment booking illustration"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Professionals</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredProfessionals.map((professional) => (
            <Card
              key={professional.id}
              className="bg-white bg-opacity-80 backdrop-blur-lg"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Image
                    src={professional.avatar}
                    alt={professional.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      {professional.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {professional.specialty}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href={`/book?professional=${professional.id}`}>
                  <Button className="w-full">Book Appointment</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
