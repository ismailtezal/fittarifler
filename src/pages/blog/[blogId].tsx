import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Separator } from '~/components/ui/separator';
import { api } from '~/utils/api';

const Blog = () => {
  const router = useRouter();
  const { blogId } = useMemo(() => {
    const id = router.query?.blogId?.toString();
    return { blogId: id };
  }, [router.query?.blogId]);


  const { data } = api.posts.getPostById.useQuery({
    id: blogId
  });

  return (
    <div>
      {data && (
        <div className='flex flex-col gap-5 p-5'>
          <div className='w-full bg-green-300 ring-4 ring-green-600 flex justify-center items-center h-96 border'>Yemek Resmi</div>
          <div><Separator></Separator></div>
          <div><h1 className='text-4xl font-extrabold'>{data.title}</h1></div>
          <div>
            {data.title} Malzemeleri
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
