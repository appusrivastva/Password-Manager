import { AddCard } from "@/components/add-card";
import { AddPassword } from "@/components/add-password";
import { YourCards } from "@/components/your-cards";
import { YourPassword } from "@/components/your-password";
import { Metadata } from "next";
import { clerkClient } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Password - Manager",
  description: "Home page of Password Manager",
};

export default async function Home() {
  const user = await currentUser();
  console.log(user?.privateMetadata);
  return (
    <main className="container mx-auto p-4 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl text-center font-bold text-primary">
            Add a Credit Card
          </h1>
          <AddCard />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl  text-center font-bold text-primary">
            Add a Password
          </h1>
          <AddPassword />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-primary">Your Cards</h1>
          <YourCards
            cards={
              Array.isArray(user?.privateMetadata.card)
                ? user?.privateMetadata.card
                : []
            }
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-primary">Your Passwords</h1>
          <YourPassword
            passwords={
              Array.isArray(user?.privateMetadata.password)
                ? user?.privateMetadata.password
                : []
            }
          />
        </div>
      </div>
    </main>
  );
}
