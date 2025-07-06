#!/usr/bin/env node

// This script converts your markdown files to professional HTML documents
// Run: node build-professional.js

const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Configure marked for better rendering
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
        return `<pre><code class="language-${lang}">${code}</code></pre>`;
    },
    breaks: true,
    gfm: true,
    tables: true,
    sanitize: false,
    smartLists: true,
    smartypants: true
});

// Professional HTML template
const htmlTemplate = (title, content, navigation) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - SwarmLead Investment Briefcase</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
            --primary: #0ea5e9;
            --primary-dark: #0284c7;
            --secondary: #64748b;
            --background: #ffffff;
            --surface: #f8fafc;
            --text: #0f172a;
            --text-light: #475569;
            --border: #e5e7eb;
            --code-bg: #1e293b;
        }
        
        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: var(--background);
            color: var(--text);
            line-height: 1.6;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        /* Header */
        .header {
            text-align: center;
            padding: 3rem 0;
            border-bottom: 1px solid var(--border);
            margin-bottom: 3rem;
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .header .subtitle {
            font-size: 1.125rem;
            color: var(--text-light);
        }
        
        /* Navigation */
        .navigation {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--border);
        }
        
        .navigation a {
            color: var(--text-light);
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            transition: color 0.2s;
        }
        
        .navigation a:hover {
            color: var(--primary);
        }
        
        .navigation a.active {
            color: var(--primary);
        }
        
        /* Content */
        .content h1 {
            font-size: 2.25rem;
            font-weight: 700;
            margin-bottom: 2rem;
            color: var(--text);
        }
        
        .content h2 {
            font-size: 1.875rem;
            font-weight: 600;
            margin-top: 3rem;
            margin-bottom: 1.25rem;
            color: var(--text);
        }
        
        .content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: var(--text);
        }
        
        .content h4 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            color: var(--text);
        }
        
        .content p {
            margin-bottom: 1.25rem;
            line-height: 1.8;
            color: var(--text-light);
        }
        
        .content blockquote {
            border-left: 4px solid var(--primary);
            padding-left: 1.5rem;
            margin: 2rem 0;
            font-style: italic;
            color: var(--text-light);
        }
        
        /* Tables */
        .content table {
            width: 100%;
            margin: 2rem 0;
            border-collapse: collapse;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        
        .content th {
            background: var(--surface);
            padding: 1rem;
            text-align: left;
            font-weight: 600;
            font-size: 0.875rem;
            color: var(--text);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .content td {
            padding: 1rem;
            border-top: 1px solid var(--border);
        }
        
        .content tr:hover {
            background: var(--surface);
        }
        
        /* Code */
        .content pre {
            background: var(--code-bg);
            color: #e2e8f0;
            padding: 1.5rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 2rem 0;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875rem;
            line-height: 1.7;
        }
        
        .content code {
            background: var(--surface);
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875rem;
            color: var(--primary);
        }
        
        .content pre code {
            background: transparent;
            color: inherit;
            padding: 0;
        }
        
        /* Lists */
        .content ul, .content ol {
            margin: 1.25rem 0;
            padding-left: 2rem;
        }
        
        .content li {
            margin-bottom: 0.5rem;
            color: var(--text-light);
        }
        
        /* Special sections */
        .highlight-box {
            background: linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%);
            border: 1px solid #60a5fa;
            border-radius: 8px;
            padding: 1.5rem;
            margin: 2rem 0;
        }
        
        .metric-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }
        
        .metric-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1.5rem;
            text-align: center;
        }
        
        .metric-card .label {
            font-size: 0.875rem;
            color: var(--text-light);
            margin-bottom: 0.5rem;
        }
        
        .metric-card .value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary);
        }
        
        /* Print styles */
        @media print {
            body {
                background: white;
            }
            .navigation {
                display: none;
            }
            .content pre {
                background: #f5f5f5;
                color: black;
                border: 1px solid #ddd;
            }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }
            .header h1 {
                font-size: 2rem;
            }
            .content h1 {
                font-size: 1.75rem;
            }
            .content h2 {
                font-size: 1.5rem;
            }
            .metric-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>SwarmLead</h1>
            <p class="subtitle">Investment Briefcase · Confidential</p>
        </header>
        
        <nav class="navigation">
            ${navigation}
        </nav>
        
        <main class="content">
            ${content}
        </main>
    </div>
</body>
</html>
`;

// Documents to convert
const documents = [
    {
        input: 'EXECUTIVE_SUMMARY.md',
        output: 'executive-summary.html',
        title: 'Executive Summary'
    },
    {
        input: '01-vision-strategy/VISION_STRATEGY_OVERVIEW.md',
        output: 'vision-strategy.html',
        title: 'Vision & Strategy'
    },
    {
        input: '01-vision-strategy/MARKET_RESEARCH_SUMMARY.md',
        output: 'market-research.html',
        title: 'Market Research'
    },
    {
        input: '02-product-definition/PRODUCT_DEFINITION_OVERVIEW.md',
        output: 'product-definition.html',
        title: 'Product Definition'
    },
    {
        input: '03-technical-foundation/TECHNICAL_FOUNDATION_OVERVIEW.md',
        output: 'technical-foundation.html',
        title: 'Technical Foundation'
    },
    {
        input: '03-technical-foundation/AI_ML_IMPLEMENTATION_GUIDE.md',
        output: 'ai-ml-guide.html',
        title: 'AI/ML Implementation'
    },
    {
        input: '04-business-plan/BUSINESS_PLAN_OVERVIEW.md',
        output: 'business-plan.html',
        title: 'Business Plan'
    },
    {
        input: '05-execution/EXECUTION_PLAN_OVERVIEW.md',
        output: 'execution-plan.html',
        title: 'Execution Plan'
    }
];

// Create output directory
const outputDir = path.join(__dirname, 'professional-docs');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Generate navigation
const navLinks = documents.map(doc => 
    `<a href="${doc.output}">${doc.title}</a>`
).join('\n');

// Convert each document
documents.forEach(doc => {
    try {
        const markdown = fs.readFileSync(path.join(__dirname, doc.input), 'utf8');
        const htmlContent = marked.parse(markdown);
        const fullHtml = htmlTemplate(doc.title, htmlContent, navLinks);
        
        fs.writeFileSync(path.join(outputDir, doc.output), fullHtml);
        console.log(`✓ Converted ${doc.title}`);
    } catch (error) {
        console.error(`✗ Error converting ${doc.title}:`, error.message);
    }
});

// Create index page
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SwarmLead Investment Briefcase</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .container {
            background: white;
            border-radius: 16px;
            padding: 3rem;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .subtitle {
            color: #64748b;
            font-size: 1.125rem;
            margin-bottom: 3rem;
        }
        
        .doc-grid {
            display: grid;
            gap: 1rem;
        }
        
        .doc-link {
            display: block;
            padding: 1.5rem;
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            text-decoration: none;
            color: #0f172a;
            transition: all 0.2s;
        }
        
        .doc-link:hover {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.2);
        }
        
        .doc-link h3 {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .doc-link p {
            font-size: 0.875rem;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>SwarmLead</h1>
        <p class="subtitle">Investment Briefcase · Select a document to begin</p>
        
        <div class="doc-grid">
            ${documents.map(doc => `
                <a href="professional-docs/${doc.output}" class="doc-link">
                    <h3>${doc.title}</h3>
                    <p>View document →</p>
                </a>
            `).join('')}
        </div>
    </div>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index-professional.html'), indexHtml);

console.log('\n✅ All documents converted successfully!');
console.log('📁 Output directory: professional-docs/');
console.log('🌐 Main page: index-professional.html');
console.log('\nTo use:');
console.log('1. Push these files to GitHub');
console.log('2. Share the GitHub Pages link to index-professional.html');