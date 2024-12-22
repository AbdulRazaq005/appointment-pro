"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { professionalSignUpSchema } from "@/types/signupTypes";
import axios from "axios";
import { signIn } from "next-auth/react";

export function ProfessionalSignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      profession: {
        specialisation: data.specialization,
        phoneNo: data.phoneNo,
        city: data.city,
        state: data.state,
        fee: Number(data.fee),
        licenseNumber: data.licenseNumber,
      },
    };
    const parseResult = professionalSignUpSchema.safeParse(payload);
    if (!parseResult.success) {
      console.log(parseResult.error);
      setError(parseResult.error.errors.map((e) => e.message).join(", "));
      setIsLoading(false);
    } else {
      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
      } else {
        try {
          const response = await axios.post(
            "/api/signup/professional",
            parseResult.data
          );
          if (!response.data.error) {
            signIn("credentials", {
              email: parseResult.data.email,
              password: parseResult.data.password,
              callbackUrl: "/",
            });
          }
        } catch (error) {
          console.error("Signup error:", error);
          setError("Server error! Please try again later.");
        } finally {
          setIsLoading(false);
        }
      }
    }
  }

  return (
    <Card className="w-full mx-auto px-4">
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl font-bold mb-6">Sign Up for Professionals</h1>
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up as a Public User ?
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="licenseNumber">Specilization</Label>
                <Input id="specialization" name="specialization" required />
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input id="licenseNumber" name="licenseNumber" required />
              </div>

              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fee">Consutation Fee</Label>
                  <Input id="fee" name="fee" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phoneNo">Phone Number</Label>
                  <Input id="phoneNo" name="phoneNo" required />
                </div>
              </div>
            </div>
            <span className="text-red-500">{error}</span>
          </div>
          <CardFooter className="px-0 pt-6">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
