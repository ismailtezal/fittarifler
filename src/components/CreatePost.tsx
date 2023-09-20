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


const formSchema = z.object({
    title: z.string().min(2, {
        message: "Post başlığı en az 2 karakterde olmalıdır!",
    }).max(30,{message: "Post başlığı en fazla 30 karakterde olmalıdır!",}),
    content: z.string().min(5, {
        message: "Post yazısı en az 5 karakterde olmalıdır!"
    }),
    ingredients: z.array(z.string()).min(2,{
        message: "En az 2 adım içermelidir"
    }),
    howtomake: z.array(z.string()).min(2,{
        message: "En az 2 adım içermelidir"
    })
})



export function CreatePost() {
    const router = useRouter()


    const createPost = api.posts.create.useMutation({
        onSuccess: () => {
            router.push("/blog")
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
         createPost.mutate(values);
    } catch (error) {
    
    }
};


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            ingredients:["",""],
            howtomake:["",""],
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
                            <FormLabel>Başlık</FormLabel>
                            <FormControl>
                                <Input placeholder="Başlık" {...field} />
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
                            <FormLabel>İçerik</FormLabel>
                            <FormControl>
                                <Textarea placeholder="İçerik" {...field} />
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






