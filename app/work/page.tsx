import type { Metadata } from 'next';
import ProjectTiles from '@/components/ProjectTiles';

export const metadata: Metadata = { title: 'Work', description: 'Websites designed and built by Gusify — click a project to see the live site.' };

export default function WorkPage() {
  return (
    <div className="container" style={{ paddingTop: 96, paddingBottom: 128 }}>
      <p className="eyebrow fade" style={{ marginBottom: 20 }}>Portfolio</p>
      <h1 className="h-page"><span className="line"><span>Work</span></span></h1>
      <p className="lead fade" style={{ margin: '28px 0 72px', maxWidth: 560, animationDelay: '0.3s' }}>
        A selection of websites designed and built by the studio. Every preview is the real, live site — click one to watch it in action.
      </p>
      <ProjectTiles wide />
    </div>
  );
}
