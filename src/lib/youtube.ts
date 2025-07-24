import { Innertube } from 'youtubei.js';

export async function getYouTubeVideoTitle(url: string): Promise<string> {
  try {
    // Extract video ID from URL
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    // Initialize Innertube client
    const youtube = await Innertube.create();
    
    // Get video info
    const info = await youtube.getInfo(videoId);
    
    // Return the video title
    return info.basic_info.title || 'No Title Found';
  } catch (error) {
    console.error('Error fetching YouTube video title:', error);
    
    // Fallback: Try to get title from YouTube oEmbed API
    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
      const response = await fetch(oembedUrl);
      
      if (response.ok) {
        const data = await response.json();
        return data.title || 'No Title Found';
      }
    } catch (oembedError) {
      console.error('Error with oEmbed fallback:', oembedError);
    }
    
    // Final fallback
    return 'No Title Found';
  }
}

function extractVideoId(url: string): string | null {
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

// Alternative lightweight function using just oEmbed API if youtubei.js fails
export async function getYouTubeVideoTitleOEmbed(url: string): Promise<string> {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const response = await fetch(oembedUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch video info');
    }
    
    const data = await response.json();
    return data.title || 'No Title Found';
  } catch (error) {
    console.error('Error fetching YouTube video title via oEmbed:', error);
    return 'No Title Found';
  }
} 