import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';

export async function POST(req: NextRequest) {
  try {
    const { appDescription, databaseType } = await req.json();

    if (!appDescription || !databaseType) {
      return NextResponse.json(
        { error: 'Missing appDescription or databaseType' },
        { status: 400 }
      );
    }

    // Create ZIP file with project structure
    const zip = new JSZip();
    
    const projectFiles: Record<string, string> = {
      'README.md': `# Full-Stack Application\n\nGenerated: ${new Date().toISOString()}\nConcept: ${appDescription}\n\n## Quick Start\n\n1. Install: npm install (in frontend and backend folders)\n2. Configure: .env.local\n3. Database: Run appropriate schema file\n4. Backend: npm run dev\n5. Frontend: npm run dev`,
      
      '.env.example': `DATABASE_URL=postgresql://user:pass@localhost:5432/app\nNEXT_PUBLIC_API_URL=http://localhost:3001\nJWT_SECRET=your-secret-key\nNODE_ENV=development`,
      
      'frontend/package.json': JSON.stringify({
        name: 'fullstack-frontend',
        version: '1.0.0',
        scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
        dependencies: { react: '^18.2.0', 'react-dom': '^18.2.0', next: '^14.0.0', tailwindcss: '^3.4.1' }
      }, null, 2),
      
      'frontend/tsconfig.json': JSON.stringify({
        compilerOptions: { target: 'ES2020', jsx: 'preserve', strict: true, moduleResolution: 'bundler' }
      }, null, 2),
      
      'frontend/.gitignore': 'node_modules\n.next\n.env.local\n*.log',
      
      'frontend/src/app/layout.tsx': 'export const metadata = { title: "Full-Stack App" };\nexport default function RootLayout({ children }) { return <html lang="en"><body>{children}</body></html>; }',
      
      'frontend/src/app/page.tsx': `"use client";\nimport { useState, useEffect } from "react";\nexport default function Home() {\n  const [projects, setProjects] = useState([]);\n  useEffect(() => {\n    fetch(process.env.NEXT_PUBLIC_API_URL + "/projects").then(r => r.json()).then(setProjects).catch(e => console.log(e));\n  }, []);\n  return <main className="p-8"><h1 className="text-4xl font-bold">Full-Stack App</h1><div className="mt-4">{projects.length} projects loaded</div></main>;\n}`,
      
      'backend/package.json': JSON.stringify({
        name: 'fullstack-backend',
        version: '1.0.0',
        main: 'dist/index.js',
        scripts: { dev: 'ts-node src/index.ts', build: 'tsc', start: 'node dist/index.js' },
        dependencies: { express: '^4.18.2', cors: '^2.8.5', dotenv: '^16.3.1', 'jsonwebtoken': '^9.1.2', uuid: '^9.0.0' },
        devDependencies: { 'ts-node': '^10.9.2', typescript: '^5.0.0' }
      }, null, 2),
      
      'backend/tsconfig.json': JSON.stringify({
        compilerOptions: { target: 'ES2020', module: 'commonjs', lib: ['ES2020'], outDir: './dist', rootDir: './src', strict: true }
      }, null, 2),
      
      'backend/.gitignore': 'node_modules\ndist\n.env.local',
      
      'backend/src/index.ts': `import express from 'express';\nimport cors from 'cors';\nimport dotenv from 'dotenv';\ndotenv.config();\nconst app = express();\nconst PORT = process.env.API_PORT || 3001;\napp.use(cors());\napp.use(express.json());\napp.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));\napp.get('/projects', (req, res) => res.json([{ id: '1', name: 'Sample Project', status: 'active', createdAt: new Date().toISOString() }]));\napp.post('/projects', (req, res) => res.status(201).json({ id: '2', ...req.body, createdAt: new Date().toISOString() }));\napp.listen(PORT, () => console.log(\`Server running on http://localhost:\${PORT}\`));`,
      
      'database/README.md': `# Database Setup\n\nChoose the schema file based on your preferred database:\n\n- **schema.postgresql.sql**: PostgreSQL database schema\n- **schema.mysql.sql**: MySQL database schema\n\nRun the appropriate file to initialize your database.`,
      
      'database/schema.postgresql.sql': databaseType === 'mysql' ? '' : `-- PostgreSQL Database Schema\nCREATE EXTENSION IF NOT EXISTS "uuid-ossp";\nCREATE TABLE users (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), email VARCHAR(255) UNIQUE NOT NULL, username VARCHAR(50) UNIQUE NOT NULL, password_hash VARCHAR(255), full_name VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);\nCREATE TABLE projects (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), owner_id UUID NOT NULL REFERENCES users(id), name VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE, description TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);\nCREATE TABLE items (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), project_id UUID NOT NULL REFERENCES projects(id), title VARCHAR(255) NOT NULL, description TEXT, category VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);\nCREATE INDEX idx_users_email ON users(email);\nCREATE INDEX idx_projects_owner ON projects(owner_id);\nCREATE INDEX idx_items_project ON items(project_id);`,
      
      'database/schema.mysql.sql': databaseType === 'postgresql' ? '' : `-- MySQL Database Schema\nCREATE TABLE users (id CHAR(36) PRIMARY KEY DEFAULT (UUID()), email VARCHAR(255) UNIQUE NOT NULL, username VARCHAR(50) UNIQUE NOT NULL, password_hash VARCHAR(255), full_name VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);\nCREATE TABLE projects (id CHAR(36) PRIMARY KEY DEFAULT (UUID()), owner_id CHAR(36) NOT NULL, name VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE, description TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (owner_id) REFERENCES users(id), INDEX idx_owner (owner_id));\nCREATE TABLE items (id CHAR(36) PRIMARY KEY DEFAULT (UUID()), project_id CHAR(36) NOT NULL, title VARCHAR(255) NOT NULL, description TEXT, category VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (project_id) REFERENCES projects(id), INDEX idx_project (project_id));`,
    };

    // Filter out empty files and add to ZIP
    Object.entries(projectFiles).forEach(([path, content]) => {
      if (content.length > 0) {
        zip.file(path, content);
      }
    });

    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' });

    // Return ZIP file as response
    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="fullstack-app-${databaseType}.zip"`,
      },
    });
  } catch (error) {
    console.error('Error generating app package:', error);
    return NextResponse.json(
      { error: 'Failed to generate application package' },
      { status: 500 }
    );
  }
}
