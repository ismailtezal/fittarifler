import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import { Inter } from "next/font/google"


const inter = Inter({subsets:['latin']})

export const Navbar: React.FC = () => {
    const session = useSession()
    const router = useRouter()
    return (

        <nav style={inter.style} className="border-b flex bg-green-400 shadow-sm">
            <ul className="flex w-screen justify-between p-5">
                <li onClick={() => router.push("/") } className="text-3xl  font-extrabold hover:cursor-pointer">
                    Fit Tarifler
                </li>
                <li className="flex gap-2">
                    {session.data?.user ? <Button variant={"outline"} onClick={() => router.push("/blog/create-post")}>Post Oluştur</Button> : null}
                    {!session.data?.user ? <Button onClick={() => signIn()}>Giriş Yap</Button> : <Button onClick={() => signOut()}>Çıkış Yap</Button> }
                </li>
            </ul>

        </nav >
    )
}
