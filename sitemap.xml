// pages/sitemap.xml.js

import fs from 'fs';
import path from 'path';

export default function Sitemap() {
  return null; // This page does not render anything
}

export async function getServerSideProps({ res }) {
  // Base URL of your site
  const BASE_URL = 'https://sribalajioffsetkvl.vercel.app';

  // List all your static pages
  const staticPages = [
    '',
    'about.html',
    'contact.html',
    'services.html',
    'gallery.html',
  ];

  // Generate XML URLs
  const urls = staticPages
    .map((page) => {
      return `
  <url>
    <loc>${BASE_URL}/${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('');

  // Full XML Sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  // Send response to browser
  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
