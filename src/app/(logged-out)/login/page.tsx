"use client";

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
import { passwordSchema } from "@/validation/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginWithCredentials } from "./action";
import { useRouter } from "next/navigation";

const formschema = z.object({
	email: z.string().email(),
	password: passwordSchema,
});

const Login: React.FC = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof formschema>>({
		resolver: zodResolver(formschema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (data: z.infer<typeof formschema>) => {
		const response = await loginWithCredentials({
			email: data.email,
			password: data.password,
		});

		if (response?.error) {
			form.setError("root", {
				message: response.message,
			});
		} else {
			router.push("/my-account");
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
						<CardTitle>Login</CardTitle>
						<CardDescription>Login to your account.</CardDescription>
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
									{!!form.formState.errors.root && (
										<FormMessage>
											{form.formState.errors.root.message}
										</FormMessage>
									)}
									<Button type="submit">Submit</Button>
								</fieldset>
							</form>
						</Form>
					</CardContent>

					<CardFooter className="flex-col gap-2">
						<div className="text-muted-foreground text-sm">
							Don&apos;t have account? <Link href={"/register"} className="underline">Register</Link>
						</div>
						<div className="text-muted-foreground text-sm">
							Forgot password? <Link href={"/password-reset"} className="underline">Reset my password</Link>
						</div>
					</CardFooter>
				</Card>
			)}
		</main>
	);
};

export default Login;
