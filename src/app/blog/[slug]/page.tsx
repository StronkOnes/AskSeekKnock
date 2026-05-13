
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { blogEntries } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { ShareButtons } from '@/components/share-buttons';

const BlogPostPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  
  const post = blogEntries.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Section Not Found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find the book section you're looking for.</p>
        <Button onClick={() => router.push('/blog')}>
          Back to Author's Insights
        </Button>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 bg-background/50">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/blog')}
          className="group hover:bg-primary/5 -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Author's Insights
        </Button>

        <article className="animate-fade-in">
          <Card className="border-none shadow-blocksy overflow-hidden bg-white/50 backdrop-blur-sm">
            {post.image && (
              <div className="h-[400px] w-full relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="space-y-2">
                    <Badge className="bg-primary hover:bg-primary text-white border-none">
                      {post.category}
                    </Badge>
                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                      {post.title}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            
            <CardHeader className={post.image ? "px-8 pt-8" : "px-8 pt-8 border-b"}>
              {!post.image && (
                <div className="space-y-4 mb-6">
                   <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                    {post.category}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold text-blocksy-heading leading-tight">
                    {post.title}
                  </h1>
                </div>
              )}
              
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/50">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <span className="font-medium text-foreground">{post.author}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {post.date}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2">Share:</span>
                  <ShareButtons url={currentUrl} title={post.title} hideTitle={true} />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8 prose prose-slate max-w-none dark:prose-invert">
              <div 
                className="blog-content space-y-4"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </CardContent>
          </Card>
        </article>
      </div>

      <style jsx global>{`
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .blog-content p {
          font-size: 1.125rem;
          line-height: 1.75;
          margin-bottom: 1.25rem;
          color: #4b5563;
        }
        .blog-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          font-style: italic;
          margin: 2rem 0;
          font-size: 1.25rem;
          color: #1f2937;
        }
        .dark .blog-content h2,
        .dark .blog-content h3 {
          color: #f3f4f6;
        }
        .dark .blog-content p {
          color: #9ca3af;
        }
        .dark .blog-content blockquote {
          color: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default BlogPostPage;
