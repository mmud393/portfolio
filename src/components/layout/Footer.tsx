import { personal } from '../../data/personal';
import { SocialLinks } from '../common/SocialLinks';
import { PageContainer } from './PageContainer';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <PageContainer className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <span className="text-gradient text-lg font-bold">{personal.initials}</span>

        <p className="text-sm text-muted">
          © {year} {personal.name}. All rights reserved.
          <span className="block sm:inline sm:ml-1">Built with ❤️ using React</span>
        </p>

        <SocialLinks />
      </PageContainer>
    </footer>
  );
}
