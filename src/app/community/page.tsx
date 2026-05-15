'use client';

import React from 'react';
import PostCard from '@/components/community/post-card';
import { usePosts } from '@/context/PostContext';

const categories = ['All', 'General Discussion', 'Scripture', 'Music, Arts & Culture', 'Literature', 'Fashion & Merchandise', 'Paraphernalia'];
const sortOptions = ['New', 'Top', 'Popular'];

import Link from 'next/link';
import { PlusSquare, MessageSquare } from 'lucide-react';

const CommunityPage = () => {
  const { posts: mockPosts } = usePosts(); // Use posts from context
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [sortOrder, setSortOrder] = React.useState('New');

  const filteredAndSortedPosts = React.useMemo(() => {
    let posts = [...mockPosts];

    // Filter by category
    if (selectedCategory !== 'All') {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    // Sort posts
    switch (sortOrder) {
      case 'Popular':
        // Mock popularity by shuffling based on ID
        posts.sort((a, b) => parseInt(a.id) % 5 - parseInt(b.id) % 5);
        break;
      case 'Top':
        // Mock top by shuffling based on title length
        posts.sort((a, b) => b.title.length - a.title.length);
        break;
      case 'New':
      default:
        posts.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }

    return posts;
  }, [selectedCategory, sortOrder, mockPosts]);

  console.log('Filtered and sorted posts in CommunityPage:', filteredAndSortedPosts);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Community</h1>
        <div className="flex items-center gap-2">
            <Link href="/messages" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary/10 text-primary hover:bg-primary/20 h-10 px-4 py-2">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
            </Link>
            <Link href="/community/create" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2">
                <PlusSquare className="mr-2 h-4 w-4" />
                Create Post
            </Link>
            <Link href="/friends" className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700">Friends</Link>
        </div>
      </div>

      <div className="mb-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap items-center">
                <span className="font-semibold mr-4">Categories:</span>
                {categories.map(category => (
                    <button key={category} onClick={() => setSelectedCategory(category)} className={`px-3 py-1 text-sm rounded-full mr-2 mb-2 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                        {category}
                    </button>
                ))}
            </div>
            <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">Sort by:</span>
                <div className="flex rounded-md shadow-sm">
                    {sortOptions.map(option => (
                        <button key={option} onClick={() => setSortOrder(option)} className={`px-3 py-1 text-sm first:rounded-l-md last:rounded-r-md ${sortOrder === option ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div>
        {filteredAndSortedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
