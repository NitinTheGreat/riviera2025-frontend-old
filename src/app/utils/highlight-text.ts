export function highlightText(text: string, search: string): string {
    if (!search || search.length < 3) return text;
    
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 text-black">$1</mark>');
  }
  
  