"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
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
import { passwordMatch } from "@/validation/passwordMatchSchema";
import { registerUser } from "./actions";
import Link from "next/link";

const formSchema = z
	.object({
		email: z.string().email(),
	})
	.and(passwordMatch);

const RegisterPage: React.FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			passwordConfirm: "",
		},
	});

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		const response = await registerUser(data);

		if (response?.error) {
			form.setError("email", {
				message: response?.message,
			});
		}
	};

	return (
		<main className="flex justify-center items-center min-h-screen">
			{form.formState.isSubmitSuccessful ? (
				<Card className="min-w-[350px]">
					<CardHeader>
						<CardTitle>Your account has been created</CardTitle>
					</CardHeader>

					<CardContent>
						<Button asChild>
							<Link href={"/login"}>Login to your account</Link>
						</Button>
					</CardContent>
				</Card>
			) : (
				<Card className="min-w-[350px]">
					<CardHeader>
						<CardTitle>Register</CardTitle>
						<CardDescription>Register for a new account.</CardDescription>
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
												<FormLabel>Confirm password</FormLabel>
												<FormControl>
													<Input {...field} type="password" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button type="submit">Submit</Button>
								</fieldset>
							</form>
						</Form>
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<div className="text-muted-foreground text-sm">
							Already have account? <Link href={"/login"} className="underline">Login</Link>
						</div>
					</CardFooter>
				</Card>
			)}
		</main>
	);
};

export default RegisterPage;
