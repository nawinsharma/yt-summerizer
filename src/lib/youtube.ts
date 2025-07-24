import { Innertube } from 'youtubei.js';

// Primary function with enhanced production reliability
export async function getYouTubeVideoTitle(url: string): Promise<string> {
  // First try the most reliable method: oEmbed API (works best in production)
  try {
    const title = await getYouTubeVideoTitleOEmbed(url);
    if (title !== 'No Title Found') {
      return title;
    }
  } catch (error) {
    console.error('oEmbed title extraction failed:', error);
  }

  // Fallback 1: Try youtube-meta-data package
  try {
    const title = await getYouTubeVideoTitleMetaData(url);
    if (title !== 'No Title Found') {
      return title;
    }
  } catch (error) {
    console.error('youtube-meta-data title extraction failed:', error);
  }

  // Fallback 2: Try simple HTML scraping approach
  try {
    const title = await getYouTubeVideoTitleScrape(url);
    if (title !== 'No Title Found') {
      return title;
    }
  } catch (error) {
    console.error('HTML scraping title extraction failed:', error);
  }

  // Fallback 3: Try youtubei.js (last resort as it may fail in serverless)
  try {
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    const youtube = await Innertube.create();
    const info = await youtube.getInfo(videoId);
    return info.basic_info.title || 'No Title Found';
  } catch (error) {
    console.error('youtubei.js title extraction failed:', error);
  }

  return 'No Title Found';
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

// Most reliable method - YouTube oEmbed API
export async function getYouTubeVideoTitleOEmbed(url: string): Promise<string> {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const response = await fetch(oembedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SumTube/1.0)',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.title || 'No Title Found';
  } catch (error) {
    console.error('Error fetching YouTube video title via oEmbed:', error);
    return 'No Title Found';
  }
}

// Function using youtube-meta-data package
export async function getYouTubeVideoTitleMetaData(url: string): Promise<string> {
  try {
    const youtubeMetaData = (await import('youtube-meta-data')).default;
    const metaData = await youtubeMetaData(url);
    
    if (metaData && metaData.title) {
      return metaData.title;
    }
    
    throw new Error('No title found in metadata');
  } catch (error) {
    console.error('Error fetching YouTube video title via youtube-meta-data:', error);
    return 'No Title Found';
  }
}

// Simple HTML scraping approach (production-friendly)
export async function getYouTubeVideoTitleScrape(url: string): Promise<string> {
  try {
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    // Use YouTube's basic watch page
    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const response = await fetch(watchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    
    // Extract title from various possible HTML patterns
    const titlePatterns = [
      /<meta property="og:title" content="([^"]+)"/,
      /<meta name="title" content="([^"]+)"/,
      /<title>([^<]+)<\/title>/,
      /"title":"([^"]+)"/
    ];

    for (const pattern of titlePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        // Decode HTML entities and clean up
        const title = match[1]
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/ - YouTube$/, '')
          .trim();
        
        if (title && title !== 'YouTube') {
          return title;
        }
      }
    }

    throw new Error('No title found in HTML');
  } catch (error) {
    console.error('Error fetching YouTube video title via HTML scraping:', error);
    return 'No Title Found';
  }
} 