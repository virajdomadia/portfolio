import { content, type Project, type Detail } from './content'
import { fixtureDetail } from './fixtures/detail'

// Server-side view of the projects. Read the env at call time so tests can stub it and the e2e build can opt in.
export type DetailProject = Project & { detail: Detail }

const withFixture = (p: Project): Project =>
  process.env.PORTFOLIO_FIXTURE_DETAIL === '1' && p.slug === 'tripsmith' ? { ...p, detail: fixtureDetail } : p

export const allProjects = (): Project[] => content.projects.map(withFixture)
export const detailProjects = (): DetailProject[] => allProjects().filter((p): p is DetailProject => !!p.detail)
export const getDetailProject = (slug: string) => detailProjects().find((p) => p.slug === slug)
