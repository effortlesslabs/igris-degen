import ReownProvider from './reown/context'
import { SwapProvider } from './swap/provider'

export default function WalletProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReownProvider cookies={null}>
      <SwapProvider>{children}</SwapProvider>
    </ReownProvider>
  )
}
