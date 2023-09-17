import { Inter } from "next/font/google";
import Link from "next/link";
import { Separator } from "~/components/ui/separator";
import { api } from "~/utils/api";


export default function Blogs() {
  const { data } = api.posts.getAllPosts.useQuery();

  const filteredData = data?.map((post) => {
    return {
      ...post,
      content: post.content.slice(0, 50) 
    };
  });

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredData?.map((post) => {
          return (
            <Link key={post.id} href={`blog/${post.id}`}>
              <div
                className="hover:bg-green-500 shadow-md hover:cursor-pointer transition-colors duration-400 bg-green-400 rounded-md"
              >
                <div className="p-4 flex flex-col justify-center">
                  <div className="h-48 bg-green-300 mb-1 rounded-md flex items-center justify-center ">
                    Yemek Resmi
                  </div>
                  <div className="font-extrabold text-xl mb-2 overflow-hidden whitespace-nowrap text-ellipsis">{post.title}</div>
                  <Separator className="bg-green-200 " />
                  <div className="mt-1 overflow-hidden whitespace-nowrap text-ellipsis">{post.content}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>

  );
}
