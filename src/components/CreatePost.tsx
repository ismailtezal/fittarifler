"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "~/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Textarea } from "./ui/textarea"
import { api } from "~/utils/api"
import { useSession } from "next-auth/react"


const formSchema = z.object({
    title: z.string().min(2, {
        message: "Post başlığı en az 2 karakterde olmalıdır!",
    }).max(30,{message: "Post başlığı en fazla 30 karakterde olmalıdır!",}),
    content: z.string().min(5, {
        message: "Post yazısı en az 5 karakterde olmalıdır!"
    })
})



export function CreatePost() {
    const session = useSession()
    const router = useRouter()

    if (session.status === "unauthenticated") return

    const createPost = api.posts.create.useMutation({

        onSuccess: () => {
            router.push("/blog")
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createPost.mutate(values)
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: ""
        },
    })


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea placeholder="content" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Paylaş</Button>
            </form>
        </Form>
    )

}






