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
import axios from "axios";
import { signUpSchema } from "@/types/signupTypes";
import { signIn } from "next-auth/react";

export function PublicSignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    const parseResult = signUpSchema.safeParse(data);
    if (!parseResult.success) {
      setError(parseResult.error.errors.map((e) => e.message).join(", "));
    } else {
      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
      } else {
        try {
          const response = await axios.post("/api/signup", parseResult.data);

          // Redirect to dashboard after successful signup
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl font-bold mb-6">Sign Up for Public Users</h1>

          <Link
            href="/signup/professional"
            className="text-blue-500 hover:underline"
          >
            Sign Up as a Professional ?
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
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
