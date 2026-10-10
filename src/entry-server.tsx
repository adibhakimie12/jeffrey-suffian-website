import React from 'react';
import { renderToString } from 'react-dom/server';
import App, { allPages, schemaFor } from './App';
import { renderHead, type PageMeta } from './seo';

export const pages = allPages;
export function render(path: string) {
  const known = allPages.find((page) => page.path === path);
  const page: PageMeta = known ?? { path, title: 'Page Not Found | Jeffrey Suffian', description: 'The requested page could not be found.', h1: 'Page Not Found' };
  return { html: renderToString(<App initialPath={path} />), head: renderHead(page, schemaFor(page), !known) };
}
