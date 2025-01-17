"use client";

import React from "react";
import { z } from "zod";
import { passwordSchema } from "@/validation/passwordSchema";
import { passwordMatch } from "@/validation/passwordMatchSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { changePassword } from "./actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z
    .object({
        currentPassword: passwordSchema,
    })
    .and(passwordMatch);

const ChangePasswordForm = () => {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            password: "",
            passwordConfirm: "",
        },
    });

    async function handleSubmit(data: z.infer<typeof formSchema>) {
        const response = await changePassword({
            currentPassword: data.currentPassword,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
        });

        if (response?.error) {
            form.setError("root", {
                message: response?.message ?? "An error occurred",
            });
        } else {
            toast({
                title: "Password Changed",
                description: "Your password has been successfully changed",
                className: 'bg-green-500 text-white'
            })
            form.reset();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <fieldset
                    disabled={form.formState.isSubmitting}
                    className="flex flex-col gap-2"
                >
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password Confirm</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {!!form.formState.errors.root?.message && (
                        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
                    )}
                    <Button type="submit">Change Password</Button>
                </fieldset>
            </form>
        </Form>
    );
};

export default ChangePasswordForm;
