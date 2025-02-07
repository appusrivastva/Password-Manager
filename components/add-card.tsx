"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addCard } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be at least 16 digits." })
    .max(19, { message: "Card number cannot exceed 19 digits." })
    .regex(/^\d+$/, { message: "Card number must contain only digits." }),

  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Expiry date must be in MM/YY format",
  }),

  cvv: z
    .string()
    .min(3, { message: "CVV must be at least 3 digits." })
    .max(4, { message: "CVV cannot exceed 4 digits." })
    .regex(/^\d+$/, { message: "CVV must contain only digits." }),
});




export function AddCard() {
  const router=useRouter()
  const user = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Card submitted:", values);
    if (user.user) {
      addCard(values.cardNumber, values.expiryDate, values.cvv, user?.user?.id);
      toast.success("Card Added!")
      form.reset()
      router.refresh()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 5678 9012 3456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Add Card
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
