import { cn } from '@/lib/utils'
import type { Network } from '@/services/common'
import type { PortfolioToken } from '@/types/token'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Token } from './token'
import { TokenWithNetworks } from './token-with-networks'

interface TokenGroupsProps {
  groupsRecord: {
    totalValues: number
    totalBalances: string
    slug: string
    tokens: PortfolioToken[]
  }[]
}

export function TokenGroups({ groupsRecord }: TokenGroupsProps) {
  return (
    <Accordion type="multiple" className="flex flex-col">
      {groupsRecord.map((group, groupIndex) => {
        const tokens = group.tokens
        const allNetworks = tokens.map((token) => token.network)
        const uniqueNetworks = [...new Set(allNetworks)]

        if (tokens.length < 2) {
          return (
            <div key={`${group.slug}-single-${groupIndex}`} className="border-t border-border pt-2 p-4">
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
            </div>
          )
        }

        return (
          <AccordionItem key={group.slug} value={group.slug} className="overflow-hidden">
            <AccordionTrigger className="w-full p-4 hover:bg-accent/50 transition-colors data-[state=open]:bg-muted/20">
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

            <AccordionContent className="border-t border-border bg-muted/10">
              <div className="flex flex-col gap-2 p-4">
                {group.tokens.map((token, index) => (
                  <div
                    key={`${token.address}-${token.network}-${index}`}
                    className={cn(index > 0 && 'border-t border-border pt-2')}
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
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
