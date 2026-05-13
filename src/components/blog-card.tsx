
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogEntry } from '@/lib/types';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface BlogCardProps {
  post: BlogEntry;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="border-none shadow-blocksy hover:shadow-blocksy-lg transition-all duration-blocksy group overflow-hidden h-full flex flex-col">
      {post.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary/90 hover:bg-primary shadow-sm backdrop-blur-sm">
              {post.category}
            </Badge>
          </div>
        </div>
      )}
      <CardHeader className="flex-1">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" /> {post.author}
          </span>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 mt-2">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-0">
        <Link href={`/blog/${post.slug}`} className="w-full">
          <Button variant="ghost" className="w-full justify-between hover:bg-primary/5 group/btn p-0 px-2 h-10">
            <span>Read Section</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
