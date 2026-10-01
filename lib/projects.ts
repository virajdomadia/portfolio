import { content, type Project, type Detail } from './content'

// Server-side view of the projects: only projects with a detail block get a page.
export type DetailProject = Project & { detail: Detail }

export const allProjects = (): Project[] => content.projects
export const detailProjects = (): DetailProject[] => allProjects().filter((p): p is DetailProject => !!p.detail)
export const getDetailProject = (slug: string) => detailProjects().find((p) => p.slug === slug)
