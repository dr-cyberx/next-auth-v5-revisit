"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { passwordSchema } from '@/validation/passwordSchema'
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const formschema = z.object({
	email: z.string().email(),
	password: passwordSchema,
});

const Login: React.FC = () => {
	const form = useForm<z.infer<typeof formschema>>({
		resolver: zodResolver(formschema),
		defaultValues: {
			email: '',
			password: '',
		}
	});

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
				</Card>
			)}
		</main>
	)
}

export default Login