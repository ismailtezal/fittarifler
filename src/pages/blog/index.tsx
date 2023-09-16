import { Inter } from "next/font/google";
import { Separator } from "~/components/ui/separator";
import { api } from "~/utils/api";


const inter = Inter({subsets:['latin']})

export default function Blogs() {
  const { data } = api.posts.getPostsByUserId.useQuery();

  return (
    <div style={inter.style} className="flex-grow gap-2 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
      <div className="flex flex-wrap gap-2">
        {data?.map((post) => {
          return (
            <div
              className="bg-green-400 rounded-md w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/5"
              key={post.id}
            >
              <div className="p-4 flex flex-col justify-center">
                <div className="h-48 bg-green-300 mb-1 rounded-md"></div>
                <div className="font-extrabold text-xl mb-2">{post.title}</div>
                <Separator className="bg-green-200"/>
                <div className="mt-1">{post.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
