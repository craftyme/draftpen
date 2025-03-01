import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get the path to the CHANGELOG.md file
    const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
    
    // Read the file
    const content = await fs.readFile(changelogPath, 'utf8');
    
    // Return the content
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error reading changelog:', error);
    return NextResponse.json(
      { error: 'Failed to read changelog' },
      { status: 500 }
    );
  }
}
