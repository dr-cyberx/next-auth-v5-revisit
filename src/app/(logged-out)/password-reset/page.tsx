"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email(),
});

const PasswordReset = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => { };

    return (
        <main className="flex justify-center items-center min-h-screen">
            <Card className="min-w-[350px]">
                <CardHeader>
                    <CardTitle>Password Reset</CardTitle>
                    <CardDescription>
                        Enter your email to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <fieldset
                                disabled={form.formState.isSubmitting}
                                className="flex flex-col gap-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {!!form.formState.errors.root && (
                                    <FormMessage>{form.formState.errors.root.message}</FormMessage>
                                )}
                                <Button type="submit">Submit</Button>
                            </fieldset>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    <div className="text-muted-foreground text-sm">
                        Remember your password? <Link href={"/login"} className="underline">login</Link>
                    </div>
                    <div className="text-muted-foreground text-sm">
                        Don&apos;t have account? <Link href={"/register"} className="underline">Register</Link>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
};

export default PasswordReset;
