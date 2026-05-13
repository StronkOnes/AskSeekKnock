'use client';

import { Twitter, Facebook, Instagram, MessageCircle, Send } from 'lucide-react';
import { Button } from './ui/button';

// Note: Instagram and TikTok do not have direct web intent URLs for sharing content like other platforms.
// These will either link to the profile or require a more complex API integration not possible here.
// WhatsApp uses a direct message link.

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M12.52.02c1.31-.02 2.61-.01 3.91-.02.08 0 .17.02.25.04.5.14.98.34 1.44.61.45.27.88.59 1.28.97.43.41.81.87 1.14 1.37.3.48.56.99.76 1.53.21.57.36 1.16.46 1.76.12.75.18 1.51.18 2.28.01 1.08-.02 2.17-.09 3.25-.08 1.17-.23 2.34-.45 3.5-.23 1.2-.55 2.38-1.02 3.52-.47 1.14-1.07 2.22-1.84 3.18-.77.96-1.69 1.77-2.73 2.42-1.08.67-2.28 1.15-3.57 1.43-1.23.28-2.5.4-3.78.42-1.29.02-2.58.01-3.87.02-1.1.01-2.2-.04-3.3-.13-.9-.08-1.79-.22-2.67-.45-1.12-.29-2.21-.71-3.23-1.28-.5-.28-.98-.6-1.43-.98-.42-.36-.82-.76-1.18-1.21-.37-.45-.69-.94-.97-1.46-.28-.52-.51-1.06-.68-1.62-.19-.6-.32-1.22-.39-1.85-.07-.63-.1-1.27-.1-1.91 0-1.29-.01-2.58-.02-3.87 0-.96.03-1.92.1-2.88.07-.9.19-1.8.38-2.68.18-.84.43-1.66.75-2.45.35-.85.78-1.65 1.31-2.38.56-.78 1.2-1.5 1.94-2.12.74-.62 1.55-1.14 2.4-1.57.87-.43 1.8-.77 2.76-1.01 1-.24 2.01-.38 3.03-.42.27-.01.54-.01.81-.02z"/>
        <path d="M10.87 13.56a2.2 2.2 0 102.19-2.19 2.2 2.2 0 00-2.19 2.19zm6.67-3.95c.23 0 .46.01.69.02.22.01.44.02.66.04.18.01.36.03.54.05.18.02.35.04.53.06.32.05.64.12.95.2.16.04.32.08.48.13.25.08.5.17.74.27.12.05.24.1.36.16.24.11.48.24.71.37.12.07.23.14.34.21.43.28.84.6 1.22.96.19.18.37.37.55.57.17.2.34.4.5.6.32.41.6.86.83 1.33.12.24.22.48.32.73s.18.5.26.75c.15.51.25 1.02.3 1.54.06.52.07 1.05.04 1.57-.03.53-.09 1.06-.18 1.59-.09.52-.22 1.04-.38 1.54-.17.52-.37 1.02-.62 1.5-.24.48-.52.93-.84 1.36s-.68.83-1.08 1.2-.84.7-1.3 1-.95.56-1.46.78c-.5.22-1.03.4-1.56.53-.53.13-1.08.21-1.63.25-.55.04-1.1.02-1.65-.04-.54-.06-1.08-.17-1.61-.31-.53-.15-1.04-.34-1.54-.58-.5-.24-.98-.52-1.44-.84-.45-.32-.88-.68-1.28-1.07-.4-.4-.76-.83-1.1-1.28-.32-.45-.61-.92-.85-1.41-.24-.49-.44-.99-.59-1.5-.15-.5-.25-1.01-.3-1.52-.05-.51-.05-1.03 0-1.54.06-.51.15-1.02.28-1.52.13-.5.3-.98.5-1.46.2-.47.44-.93.72-1.36.28-.43.6-.83.95-1.2.35-.37.73-.7 1.14-1 .4-.3.84-.56 1.28-.78.45-.22.91-.4 1.38-.54.47-.14.95-.23 1.43-.28.48-.05.97-.05 1.45 0 .48.05.95.14 1.42.28.1.03.19.06.29.09.28.09.56.19.84.3.14.06.28.12.41.18.27.12.53.26.79.41.13.07.25.15.38.22.25.15.5.31.74.48.12.09.24.18.35.27.22.18.43.38.64.58.1.1.2.2.29.31.18.21.36.42.52.64.08.11.16.22.24.33.15.22.29.44.42.67.06.11.12.23.18.34.11.23.21.46.3.7.05.12.09.24.13.36.08.23.15.47.21.7.03.12.05.23.07.35.04.23.07.47.09.7.01.12.02.23.02.35.02.23.02.46.02.69z"/>
    </svg>
)

type ShareButtonsProps = {
  url: string;
  title: string;
  className?: string;
  hideTitle?: boolean;
};

export function ShareButtons({ url, title, className, hideTitle }: ShareButtonsProps) {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const text = `Check out this book section: ${title}`;
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`,
    instagram: 'https://www.instagram.com', 
    tiktok: 'https://www.tiktok.com',
  };

  if (!mounted) {
    return <div className={className} style={{ minHeight: '40px' }} />;
  }

  return (
    <div className={className}>
      {!hideTitle && <h4 className="text-sm font-semibold mb-2">Share Template:</h4>}
      <div className="flex gap-2">
        <Button variant="outline" size="icon" asChild>
          <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
            <Twitter />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
            <Facebook />
          </a>
        </Button>
         <Button variant="outline" size="icon" asChild>
          <a href={shareLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram">
            <Instagram />
          </a>
        </Button>
         <Button variant="outline" size="icon" asChild>
          <a href={shareLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Visit our TikTok">
            <TikTokIcon />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
            <MessageCircle />
          </a>
        </Button>
      </div>
    </div>
  );
}
