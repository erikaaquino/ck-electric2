import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    
    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    
    const body = await request.json();
    
    return NextResponse.json({
      message: 'Test API working',
      apiKeyConfigured: !!resendApiKey,
      requestBody: body
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { error: 'Test API failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
