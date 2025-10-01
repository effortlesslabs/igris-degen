import { Token } from '@/components/tokens/token'
import { TokenWithNetworks } from '@/components/tokens/token-with-networks'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { Network } from '@/services/common'
import type { PortfolioToken } from '@/types/token'

interface TokenGroupsProps {
  groupsRecord: {
    totalValues: number
    totalBalances: string
    slug: string
    tokens: PortfolioToken[]
  }[]
  onSelectToken: (token: PortfolioToken) => void
}

export function TokenGroups({ groupsRecord, onSelectToken }: TokenGroupsProps) {
  return (
    <Accordion type="multiple" className="flex flex-col">
      {groupsRecord.map((group, groupIndex) => {
        const tokens = group.tokens
        const allNetworks = tokens.map((token) => token.network)
        const uniqueNetworks = [...new Set(allNetworks)]

        if (tokens.length < 2) {
          return (
            <button
              key={`${group.slug}-single-${groupIndex}`}
              type="button"
              className="p-2 cursor-pointer rounded-2xl w-full hover:bg-accent/30 transition-colors"
              onClick={() => onSelectToken(tokens[0])}
            >
              <TokenWithNetworks
                name={tokens[0].name}
                symbol={tokens[0].symbol}
                address={tokens[0].address}
                decimals={tokens[0].decimals}
                image={tokens[0].logoURI}
                balance={tokens[0].balance}
                price={parseFloat(tokens[0].price)}
                priceChange={0}
                networks={[tokens[0].network as Network]}
              />
            </button>
          )
        }

        return (
          <AccordionItem key={group.slug} value={group.slug} className="overflow-hidden border-0">
            <AccordionTrigger className="w-full p-2 cursor-pointer rounded-2xl hover:bg-accent/30 transition-colors data-[state=open]:bg-muted/20">
              <TokenWithNetworks
                name={tokens[0].name}
                symbol={tokens[0].symbol}
                address={tokens[0].address}
                decimals={tokens[0].decimals}
                image={tokens[0].logoURI}
                balance={group.totalBalances}
                price={group.totalValues / parseFloat(group.totalBalances)}
                priceChange={0}
                networks={uniqueNetworks as Network[]}
              />
            </AccordionTrigger>

            <AccordionContent className="border-0 border-border bg-muted/10">
              <div className="flex flex-col gap-2 p-4">
                {group.tokens.map((token, index) => (
                  <button
                    key={`${token.address}-${token.network}-${index}`}
                    type="button"
                    className="p-2 cursor-pointer rounded-2xl w-full hover:bg-accent/30 transition-colors"
                    onClick={() => onSelectToken(token)}
                  >
                    <Token
                      name={token.name}
                      symbol={token.symbol}
                      address={token.address}
                      decimals={token.decimals}
                      image={token.logoURI}
                      balance={token.balance}
                      price={parseFloat(token.price)}
                      priceChange={0}
                      network={token.network as Network}
                      isPrimaryNetworkImage={true}
                    />
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
