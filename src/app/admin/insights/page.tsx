
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { blogEntries } from '@/lib/data';
import { PlusCircle, Trash2, Edit, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const AdminInsightsPage = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate an upload delay
      setTimeout(() => {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setIsUploading(false);
        toast({
          title: "Image Uploaded",
          description: "Your feature image has been successfully uploaded for this article.",
        });
      }, 1500);
    }
  };

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Article Published",
      description: "In a real app, this would save to a database. The form and your image are ready for backend integration.",
    });
    setShowForm(false);
    setImagePreview(null);
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 bg-background/50">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-blocksy-heading">
            Manage Author's Insights
          </h2>
          <p className="text-muted-foreground mt-1">
            Create, edit, and manage your book sections and articles.
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="shadow-blocksy">
          <PlusCircle className="mr-2 h-4 w-4" />
          {showForm ? 'Cancel' : 'New Article'}
        </Button>
      </div>

      {showForm && (
        <Card className="border-none shadow-blocksy animate-in slide-in-from-top-4 duration-300">
          <CardHeader>
            <CardTitle>Create New Article</CardTitle>
            <CardDescription>Fill in the details for your new book section or insight.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddArticle} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Article Title</Label>
                  <Input id="title" placeholder="e.g., The Mystery of Faith" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="e.g., Spiritual Warfare" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (Short Summary)</Label>
                <Textarea id="excerpt" placeholder="Briefly describe what this section is about..." className="h-20" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Feature Image</Label>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-blocksy-lg cursor-pointer bg-white/50 hover:bg-white border-primary/20 hover:border-primary transition-all">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 800x400px)</p>
                      </div>
                      <Input 
                        id="image-upload" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                  
                  {isUploading && (
                    <div className="flex items-center gap-2 text-sm text-primary animate-pulse">
                      <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      Uploading image...
                    </div>
                  )}

                  {imagePreview && (
                    <div className="relative w-full h-48 rounded-blocksy-lg overflow-hidden border">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={() => setImagePreview(null)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Article Content (HTML supported)</Label>
                <Textarea id="content" placeholder="Write your full article content here..." className="min-h-[300px]" required />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>Discard</Button>
                <Button type="submit">Publish Article</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-none shadow-blocksy">
        <CardHeader>
          <CardTitle>Existing Articles</CardTitle>
          <CardDescription>A list of all articles currently published on the site.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {blogEntries.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 rounded-blocksy-lg border bg-white/50 hover:bg-white transition-colors">
                <div className="flex items-center gap-4">
                  {post.image ? (
                    <img src={post.image} alt="" className="h-12 w-12 rounded-blocksy-md object-cover" />
                  ) : (
                    <div className="h-12 w-12 rounded-blocksy-md bg-primary/10 flex items-center justify-center">
                      <PlusCircle className="h-6 w-6 text-primary opacity-20" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-blocksy-heading">{post.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px] h-4 uppercase">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/5">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInsightsPage;
