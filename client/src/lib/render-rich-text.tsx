import React from 'react';

interface RenderRichTextProps {
  content: string;
  className?: string;
}

export function renderRichText(content: string, className?: string): React.ReactNode {
  if (!content) return null;

  // Parse the HTML content and convert to React components
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  
  const elements: React.ReactNode[] = [];
  
  function processNode(node: Node, depth: number = 0): React.ReactNode {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }
    
    const element = node as Element;
    const tagName = element.tagName.toLowerCase();
    
    // Process child nodes
    const children = Array.from(element.childNodes).map(child => processNode(child, depth + 1));
    
    // Handle different HTML elements
    switch (tagName) {
      case 'p':
        return (
          <p key={Math.random()} className="text-base text-neutral-700 mb-6">
            {children}
          </p>
        );
      
      case 'h1':
        return (
          <h1 key={Math.random()} className="text-display-1 font-bold text-neutral-950 mt-12 mb-6">
            {children}
          </h1>
        );
      
      case 'h2':
        return (
          <h2 key={Math.random()} className="text-display-3 font-bold text-neutral-950 mt-12 mb-6">
            {children}
          </h2>
        );
      
      case 'h3':
        return (
          <h3 key={Math.random()} className="text-display-4 font-bold text-neutral-950 mt-8 mb-4">
            {children}
          </h3>
        );
      
      case 'h4':
        return (
          <h4 key={Math.random()} className="text-display-5 font-bold text-neutral-950 mt-6 mb-4">
            {children}
          </h4>
        );
      
      case 'ul':
        return (
          <ul key={Math.random()} className="list-disc list-inside text-base text-neutral-700 mb-6 space-y-2">
            {children}
          </ul>
        );
      
      case 'ol':
        return (
          <ol key={Math.random()} className="list-decimal list-inside text-base text-neutral-700 mb-6 space-y-2">
            {children}
          </ol>
        );
      
      case 'li':
        return (
          <li key={Math.random()} className="mb-2">
            {children}
          </li>
        );
      
      case 'blockquote':
        // Check if it's a WordPress blockquote
        if (element.classList.contains('wp-block-quote')) {
          return (
            <blockquote key={Math.random()} className="my-12 py-10 px-8 bg-primary-50 border-t-2 border-b-2 border-primary-500 text-center">
              <p className="text-display-4 font-bold text-neutral-950 mb-4 italic">
                {children}
              </p>
            </blockquote>
          );
        }
        // Default blockquote styling
        return (
          <blockquote key={Math.random()} className="border-l-4 border-primary-500 pl-6 my-6 italic text-neutral-700">
            {children}
          </blockquote>
        );
      
      case 'strong':
        return (
          <strong key={Math.random()} className="font-bold">
            {children}
          </strong>
        );
      
      case 'em':
        return (
          <em key={Math.random()} className="italic">
            {children}
          </em>
        );
      
      case 'a':
        const href = element.getAttribute('href') || undefined;
        return (
          <a 
            key={Math.random()} 
            href={href} 
            className="text-primary-500 hover:text-primary-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      
      case 'br':
        return <br key={Math.random()} />;
      
      default:
        return (
          <div key={Math.random()} className={className}>
            {children}
          </div>
        );
    }
  }
  
  // Process all child nodes of the body
  Array.from(doc.body.childNodes).forEach(node => {
    elements.push(processNode(node));
  });
  
  return (
    <div className={className}>
      {elements}
    </div>
  );
}

// Fallback function for server-side rendering where DOMParser might not be available
export function renderRichTextSSR(content: string, className?: string): string {
  if (!content) return '';

  // Simple regex-based parsing for server-side
  let processedContent = content;
  
  // Convert WordPress blockquotes with proper styling
  processedContent = processedContent.replace(
    /<blockquote class="wp-block-quote[^"]*">([\s\S]*?)<\/blockquote>/g,
    (match, innerContent) => {
      // Extract the text content from inside the blockquote
      const textMatch = innerContent.match(/<p[^>]*>([\s\S]*?)<\/p>/);
      const textContent = textMatch ? textMatch[1].replace(/<[^>]*>/g, '').trim() : innerContent.replace(/<[^>]*>/g, '').trim();
      
      return `<blockquote class="my-12 py-10 px-8 bg-primary-50 border-t-2 border-b-2 border-primary-500 text-center"><p class="text-display-4 font-bold text-neutral-950 mb-4 italic">${textContent}</p><cite class="text-xs font-bold uppercase tracking-widest text-primary-500">— Matt Cheshier, Co-Owner</cite></blockquote>`;
    }
  );
  
  // Convert headings
  processedContent = processedContent.replace(
    /<h2[^>]*>(.*?)<\/h2>/g,
    '<h2 class="text-display-3 font-bold text-neutral-950 mt-12 mb-6">$1</h2>'
  );
  
  processedContent = processedContent.replace(
    /<h3[^>]*>(.*?)<\/h3>/g,
    '<h3 class="text-display-4 font-bold text-neutral-950 mt-8 mb-4">$1</h3>'
  );
  
  // Convert paragraphs
  processedContent = processedContent.replace(
    /<p[^>]*>(.*?)<\/p>/g,
    '<p class="text-base text-neutral-700 mb-6">$1</p>'
  );
  
  // Convert lists
  processedContent = processedContent.replace(
    /<ul[^>]*class="[^"]*wp-block-list[^"]*"[^>]*>(.*?)<\/ul>/g,
    '<ul class="list-disc list-inside text-base text-neutral-700 mb-6 space-y-2">$1</ul>'
  );
  
  processedContent = processedContent.replace(
    /<li[^>]*>(.*?)<\/li>/g,
    '<li class="mb-2">$1</li>'
  );
  
  // Convert strong tags
  processedContent = processedContent.replace(
    /<strong[^>]*>(.*?)<\/strong>/g,
    '<strong class="font-bold">$1</strong>'
  );
  
  // Convert line breaks
  processedContent = processedContent.replace(/<br\s*\/?>/gi, '<br />');
  
  return processedContent;
}
