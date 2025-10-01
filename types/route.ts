import type { Network } from './token'

export type Kind = 'transaction' | 'signature' | 'watch_order_filled'

export type StepTransactionType =
  | 'deposit'
  | 'approve'
  | 'authorize'
  | 'authorize1'
  | 'authorize2'
  | 'swap'
  | 'send'
  | 'watch_order_filled'

export type TransactionData = {
  from: string
  to: string
  data: string
  value: string
  chainId: number
  maxFeePerGas: string
  maxPriorityFeePerGas: string
}

interface Token {
  readonly address: string
  readonly decimals: number
  readonly symbol: string
  readonly name: string
  readonly logoURI: string
  readonly network: Network
}

interface Meta {
  tokenIn: Token
  tokenOut: Token
}

interface Fee {
  token: Token
  rawAmount: string
  rawAmountFormatted: string
  amountInUsd: string
}

export type Step = {
  requestId: string
  transactionType: StepTransactionType
  action: string
  description: string
  kind: Kind
  data?: TransactionData
}

export interface Bridge {
  name: string
  slug: string
  icon: string
  url: string
}

export interface PriceImpact {
  inPercentage: string
  inUsd: string
}

export interface TokenInOut {
  tokenAddress: string
  amountInUsd: string
  rawAmountFormatted: string
  rawAmount: string
}

export interface SwapRoute {
  intentId: string
  senderAddress: string
  recipientAddress: string
  tokenIn: TokenInOut
  tokenOut: TokenInOut
  exchangeRate: string
  timeEstimation: string
  totalPriceImpact: PriceImpact
  bridge: Bridge
  steps: Step[]
  metadata: Meta
  fees?: Record<string, Fee>
}

export interface SmartTokenSuggestion {
  tokenOut: TokenInOut
  tokenMeta: Token
  totalPriceImpact: PriceImpact
  timeEstimation: string
}

export interface RouteExecutionStatus {
  requestId: string
  status: 'pending' | 'waiting' | 'delayed' | 'success' | 'failure' | 'refund'
  inTxHashes: string[]
  outTxHashes: string[]
  details?: string
  time?: number
  tokenInNetwork?: Network
  tokenOutNetwork?: Network
}

export type RouteParams = {
  senderAddress: string
  recipientAddress: string
  tokenInAddress: string
  tokenOutAddress: string
  tokenInNetwork: Network
  tokenOutNetwork: Network
  tokenAmount: string
  slippage?: string
  tradeType?: 'SOURCE_BASED' | 'DESTINATION_BASED'
  excludeBridges?: string
}

export type SmartRouteParams = {
  senderAddress: string
  recipientAddress: string
  tokenInAddress: string
  tokenInNetwork: Network
  tokenAmount: string
  slippage?: string
  tradeType?: 'SOURCE_BASED'
  excludeBridges?: string
}

export type TransactionStatus = 'pending' | 'waiting' | 'delayed' | 'success' | 'failure' | 'refund'

export type Transaction = {
  status: TransactionStatus
  inTxHashes: string[]
  outTxHashes: string[]
  details?: string
  time?: number
  tokenInNetwork?: Network
  tokenOutNetwork?: Network
}

export interface IntentStatusResponse {
  intentStatus: 'pending' | 'partial' | 'success' | 'failed' | 'refund'
  transactions: Transaction[]
}
