// Import all markdown files as raw text using Vite's import.meta.glob
const writingFiles = import.meta.glob('./*.md', { as: 'raw', eager: true });

// Parse frontmatter and content
function parseMarkdown(md, fileName) {
  const match = md.match(/^---([\s\S]*?)---\n([\s\S]*)$/);
  if (!match) return { title: fileName, content: md };
  const frontmatter = match[1];
  const content = match[2];
  const meta = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) meta[key.trim()] = rest.join(':').trim();
  });
  return { ...meta, content };
}

const writings = Object.entries(writingFiles).map(([path, md]) => {
  const fileName = path.split('/').pop().replace('.md', '');
  return parseMarkdown(md, fileName);
});

export default writings;
