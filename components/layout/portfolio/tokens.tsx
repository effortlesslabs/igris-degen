import { TokenGroups } from '@/components/tokens/groups'
import { getTokensGroupedBySlug } from '@/lib/token-groups'
import type { PortfolioToken } from '@/types/token'

export function Tokens({ tokens }: { tokens: PortfolioToken[] }) {
  const tokensGrouped = getTokensGroupedBySlug(tokens)

  return <TokenGroups groupsRecord={tokensGrouped} />
}
