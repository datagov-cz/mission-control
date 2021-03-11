import { COMPONENTS } from 'app/variables'
import { Iri } from '@types'

type Tool = {
  key: string
  getUrl: (workspaceIri: Iri) => string
}

const tools: Tool[] = [
  {
    key: 'editTerms',
    getUrl: (workspaceIri) => {
      const path = COMPONENTS.termit.meta.workspacePath.replace(
        '%WORKSPACE_IRI%',
        workspaceIri
      )
      return `${COMPONENTS.termit.url}${path}`
    },
  },
  {
    key: 'editRelations',
    getUrl: (workspaceIri) => {
      const path = COMPONENTS.ontographer.meta.workspacePath.replace(
        '%WORKSPACE_IRI%',
        workspaceIri
      )
      return `${COMPONENTS.ontographer.url}${path}`
    },
  },
]

export default tools
