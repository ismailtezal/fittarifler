import { Inter } from "next/font/google";
import { Separator } from "~/components/ui/separator";
import { api } from "~/utils/api";

const inter = Inter({ subsets: ['latin'] });

export default function Blogs() {
  const { data } = api.posts.getPostsByUserId.useQuery();

  return (
    <div style={inter.style} className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data?.map((post) => {
          return (
            <div
              className="hover:bg-green-500 shadow-md hover:cursor-pointer transition-colors duration-400 bg-green-400 rounded-md"
              key={post.id}
            >
              <div className="p-4 flex flex-col justify-center">
                <div className="h-48 bg-green-300 mb-1 rounded-md flex items-center justify-center">
                  Onuru Sikim
                </div>
                <div className="font-extrabold text-xl mb-2">{post.title}</div>
                <Separator className="bg-green-200" />
                <div className="mt-1">{post.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
