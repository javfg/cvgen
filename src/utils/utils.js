export const removeTabIndexes = html => html.replaceAll('<a', '<a tabindex="-1" ');

export const isWindow = () => typeof window !== 'undefined';
