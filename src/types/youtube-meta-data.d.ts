declare module 'youtube-meta-data' {
  interface YouTubeMetaData {
    title: string;
    description: string;
    keywords: string;
    shortlinkUrl: string;
    embedinfo: {
      title: string;
      author_name: string;
      author_url: string;
      type: string;
      height: number;
      width: number;
      version: string;
      provider_name: string;
      provider_url: string;
      thumbnail_height: number;
      thumbnail_width: number;
      thumbnail_url: string;
      html: string;
    };
    videourl: string;
  }

  function youtubeMetaData(url: string): Promise<YouTubeMetaData>;
  
  export = youtubeMetaData;
} 