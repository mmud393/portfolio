export interface AppLink {
  label: string;
  url: string;
  platform: 'ios' | 'android' | 'web';
}

export interface ProjectLinks {
  github?: string;
  live?: string;
  admin?: string;
  appStore?: string;
  playStore?: string;
  /** Extra labelled links, e.g. several apps shipped under one project. */
  additional?: AppLink[];
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
