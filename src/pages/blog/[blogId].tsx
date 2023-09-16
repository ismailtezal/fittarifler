import { useRouter } from 'next/router';

const Blog = () => {
  const router = useRouter();
  const { blogId } = router.query;

  return <div>{blogId}</div>;
};

export default Blog;
