import { useMemo } from 'react'
import { filterByQueryAndNetwork, getTokensGroupedBySlug } from '@/lib/token-groups'
import type { Network } from '@/services/common'
import type { PortfolioToken, Token } from '@/types/token'
import TokensEmpty from '../tokens-empty'
import { TokenGroups } from './groups'
import TokensLoader from './tokens-loader'

interface TokenProps {
  portfolioTokens: PortfolioToken[]
  isLoadingPortfolio: boolean
  searchValue: string
  selectedNetwork: Network | null
  onSelectToken: (token: PortfolioToken) => void
  destinationToken: Token | null
}

function Tokens(props: TokenProps) {
  const tokens: PortfolioToken[] = props.portfolioTokens
  const isLoading = props.isLoadingPortfolio

  const filteredTokens = useMemo(() => {
    // First filter out destination token
    const tokensWithoutDestination = tokens.filter(
      (token) =>
        !(
          token.address?.toLowerCase() === props.destinationToken?.address?.toLowerCase() &&
          token.network === props.destinationToken?.network
        ),
    )

    // Apply fuzzy search and network filtering
    if (props.searchValue || props.selectedNetwork) {
      const searchQuery = props.searchValue && props.searchValue.length >= 2 ? props.searchValue : ''
      const network = props.selectedNetwork as Network

      return filterByQueryAndNetwork(searchQuery, network, tokensWithoutDestination)
    }

    return tokensWithoutDestination
  }, [tokens, props.destinationToken, props.searchValue, props.selectedNetwork])

  return (
    <div className="flex flex-col py-1">
      {filteredTokens.length === 0 && !isLoading && <TokensEmpty />}
      {isLoading && <TokensLoader />}
      {!isLoading && (
        <TokenGroups groupsRecord={getTokensGroupedBySlug(filteredTokens)} onSelectToken={props.onSelectToken} />
      )}
    </div>
  )
}

export default Tokens
