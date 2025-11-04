'use client'
import s from './PostsList.module.scss'
import { PostItem } from '@/shared/ui/PostsList/PostItem/PostItem'
import { useGetPostsQuery } from '@/views/PostsListPage/api/getPosts.generated'

export const PostsList = () => {
  const {data, fetchMore, loading} = useGetPostsQuery({variables: {
      endCursorPostId: 0,
      searchTerm: '',
      pageSize: 10,
      sortBy: 'createdA',
    }},
  )

  const handleNextPosts = async () => {
    if (data){
      const id = data?.getPosts.items[data.getPosts.items.length - 1].id

      await fetchMore({
        variables: { endCursorPostId: id, pageSize: 10 },
      })
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      <ul className={s.userPostsList}>
        {data?.getPosts.items.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
      <button style={{background: '#fff', width: '50px', height: '20px'}} onClick={handleNextPosts}>add posts</button>
    </>
  )
}