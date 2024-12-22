import { PublicSignupForm } from "@/components/public-signup-form";

export default function PublicSignupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-2xl font-bold mb-6">Sign Up as a Public User</h1> */}
      <PublicSignupForm />
    </div>
  );
}
