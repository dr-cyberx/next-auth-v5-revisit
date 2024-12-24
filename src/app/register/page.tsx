"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
    passwordConfirm: z.string(),
});

const RegisterPage: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => { };

    return (
        <main className="flex justify-center items-center min-h-screen">
            <Card className="min-w-[350px]">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Register for a new account.</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}></form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    );
};

export default RegisterPage;
