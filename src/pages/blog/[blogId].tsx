import { useRouter } from 'next/router';
import { useMemo } from 'react';
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
        <div>
          <h1 className='text-4xl font-extrabold'>{data.title}</h1>
        </div>
      )}
    </div>
  );
};

export default Blog;
