export interface NavItem {
  label: string;
  to: string;
}

/** The site's main pages, shared by SiteNav (desktop), SiteMenu (phone) and the footer. */
export const siteNavigation: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
  { label: 'Projects', to: '/projects' },
  { label: 'Books', to: '/books' },
];
