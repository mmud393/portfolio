export interface ProjectLinks {
  github?: string;
  live?: string;
  appStore?: string;
  playStore?: string;
}

export type ImagePosition = 'center' | 'top' | 'bottom';

export interface Project {
  id: string;
  title: string;
  description: string;
  cover?: string;
  imagePosition?: ImagePosition;
  technologies: string[];
  links?: ProjectLinks;
  /** Optional extended fields for future project detail pages. */
  features?: string[];
  challenges?: string;
  architecture?: string;
  screenshots?: string[];
}
