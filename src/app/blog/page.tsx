
'use client';

import React from 'react';
import { blogEntries } from '@/lib/data';
import BlogCard from '@/components/blog-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredPosts = blogEntries.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 bg-background/50">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-blocksy-heading animate-fade-in flex items-center gap-3">
            <BookOpen className="h-10 w-10 text-primary" />
            Biblical Mandate
          </h2>
          <p className="text-muted-foreground mt-1 animate-fade-in delay-100">
            Biblical insights and wisdom from the author's upcoming book, The Ultimate Revolution(ary)!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 animate-fade-in delay-200">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search book sections..." 
            className="pl-10 shadow-blocksy border-none bg-white/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in delay-300">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <Card className="border-none shadow-blocksy bg-white/50 backdrop-blur-sm animate-fade-in py-12">
          <CardContent className="flex flex-col items-center justify-center text-muted-foreground">
            <BookOpen className="h-12 w-12 opacity-20 mb-4" />
            <p className="text-lg font-medium">No sections found matching your search.</p>
            <p className="text-sm">Try using different keywords or categories.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlogPage;
