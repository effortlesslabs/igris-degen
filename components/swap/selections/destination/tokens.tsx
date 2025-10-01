import { useMemo } from 'react'
import { BuyToken } from '@/components/tokens/buy-token'
import { useSearchTokens } from '@/queries/useTokens'
import type { Network } from '@/services/common'
import type { PortfolioToken, Token } from '@/types/token'
import TokensEmpty from '../tokens-empty'
import TokensLoader from './tokens-loader'

interface TokenProps {
  searchValue: string
  selectedNetwork: Network | null
  onSelectToken: (token: Token) => void
  sourceToken: PortfolioToken | null
}

function Tokens(props: TokenProps) {
  const { data, isLoading } = useSearchTokens({ query: props.searchValue, network: props.selectedNetwork })
  const tokens: Token[] = data || []

  const filteredTokens = useMemo(() => {
    // First filter out destination token
    const tokensWithoutSource = tokens.filter(
      (token) =>
        !(
          token.address?.toLowerCase() === props.sourceToken?.address?.toLowerCase() &&
          token.network === props.sourceToken?.network
        ),
    )
    return tokensWithoutSource
  }, [tokens, props.sourceToken])

  return (
    <div className="flex flex-col py-1">
      {filteredTokens.length === 0 && !isLoading && <TokensEmpty />}
      {isLoading && <TokensLoader />}
      {props.searchValue.length > 0 && !isLoading && filteredTokens.length !== 0 && (
        <p className="text-sm text-muted-foreground pb-2 font-semibold px-2">Search results for: {props.searchValue}</p>
      )}
      {!isLoading &&
        filteredTokens.map((token, index) => (
          <button
            key={`${token.slug}-${token.network}-${index}`}
            type="button"
            className="p-2 cursor-pointer rounded-2xl w-full hover:bg-accent/30 transition-colors"
            onClick={() => props.onSelectToken(token)}
          >
            <BuyToken
              name={token.name}
              symbol={token.symbol}
              address={token.address}
              image={token.logoURI}
              network={token.network as Network}
            />
          </button>
        ))}
    </div>
  )
}

export default Tokens
