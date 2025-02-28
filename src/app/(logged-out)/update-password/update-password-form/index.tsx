"use client";

import React from "react";
import { z } from "zod";
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
import { updatePasswordFormActions } from "./actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const formSchema = passwordMatch;

type Props = {
    token: string;
};

const UpdatePasswordForm = ({ token }: Props) => {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            passwordConfirm: "",
        },
    });

    async function handleSubmit(data: z.infer<typeof formSchema>) {
        const response = await updatePasswordFormActions({
            token,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
        });

        if (response?.tokenInValid) {
            window?.location?.reload();
        }

        if (response?.error) {
            form.setError("root", {
                message: response?.message ?? "An error occurred",
            });
        } else {
            toast({
                title: "Password Changed",
                description: "Your password has been successfully changed",
                className: "bg-green-500 text-white",
            });
            form.reset();
        }
    }

    return form.formState.isSubmitted ? (
        <div>
            Your password has been updated.{" "}
            <Link className="underline" href={"/login"}>
                Click here to login to your account
            </Link>
        </div>
    ) : (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <fieldset
                    disabled={form.formState.isSubmitting}
                    className="flex flex-col gap-2"
                >
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
                    <Button type="submit">Update Password</Button>
                </fieldset>
            </form>
        </Form>
    );
};

export default UpdatePasswordForm;
