import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

const loginSchema = z.object({
    username: z
        .string()
        .min(8, {
            message: "Username must be at least 8 characters",
        })
        .max(40, {
            message: "Username cannot be more than 40 characters",
        }),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters",
        })
        .max(40, {
            message: "Password cannot be more than 8 characters",
        }),
});

export default function Login() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values);
    }
    return (
        <main className="p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field}></Input>
                                </FormControl>
                                <FormDescription>
                                    This is your display name
                                </FormDescription>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field}></Input>
                                </FormControl>
                                <FormDescription>
                                    This is your associated password
                                </FormDescription>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    ></FormField>
                    <Button>Login</Button>
                </form>
            </Form>
        </main>
    );
}
