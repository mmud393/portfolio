import { personal } from '../../data/personal';
import { SocialLinks } from '../common/SocialLinks';
import { PageContainer } from './PageContainer';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <PageContainer className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-muted">
          © {year} {personal.name}. All rights reserved.
          <span className="mt-1 block sm:ml-2 sm:mt-0 sm:inline">
            Built with <span className="footer-heart" aria-label="love">❤️</span> using{' '}
            <span className="footer-shimmer font-semibold">React</span>
          </span>
        </p>

        <SocialLinks />
      </PageContainer>
    </footer>
  );
}
