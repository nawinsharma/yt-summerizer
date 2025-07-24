import { NextRequest, NextResponse } from 'next/server';
import { getYouTubeVideoTitle } from '@/lib/youtube';
import { getEnvironmentInfo } from '@/lib/debug';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ 
      error: 'URL parameter is required',
      example: '/api/test-title?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }, { status: 400 });
  }

  try {
    const title = await getYouTubeVideoTitle(url);
    const envInfo = getEnvironmentInfo();
    
    return NextResponse.json({
      url,
      title,
      success: title !== 'No Title Found',
      environment: envInfo,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      url,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: getEnvironmentInfo(),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 