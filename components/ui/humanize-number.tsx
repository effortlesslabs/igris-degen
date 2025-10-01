import numbro from 'numbro'
import { TextShimmer } from './text-shimmer'

/**
 * HumanizeNumber component formats a given number or string based on its value.
 *
 * - If the number is less than 1, it formats the number with 4 decimal places.
 * - If the number is 1 or greater, it formats the number with 2 decimal places.
 * - If the number is 1000 or greater, it formats the number with thousand separators and 2 decimal places.
 * - If the input is a string, it returns the string as is.
 *
 * @param {Object} props - The component props.
 * @param {number | string} props.number - The number or string to be formatted.
 * @param {string} [props.prefix='$'] - The prefix to be added to the formatted number.
 * @param {number} [props.decimalPlaces] - Optional decimal places override.
 * @param {boolean} [props.loading=false] - Whether to show loading shimmer state.
 *
 * @returns {JSX.Element} A span element containing the formatted number or string.
 *
 * @example
 * ```tsx
 * <HumanizeNumber number={0.1234} /> // Renders: <span>$0.1234</span>
 * <HumanizeNumber number={1.0000} /> // Renders: <span>$1.00</span>
 * <HumanizeNumber number={123.456} /> // Renders: <span>$123.46</span>
 * <HumanizeNumber number={1234} /> // Renders: <span>$1,234.00</span>
 * <HumanizeNumber number={"Not a number"} /> // Renders: <span>Not a number</span>
 * <HumanizeNumber loading={true} /> // Renders: shimmer effect
 * ```
 */

const checkIsScientificNotation = (number: number | string) => {
  if (typeof number === 'string' && number.includes('e')) {
    return true
  }
  return false
}

export function HumanizeNumber({
  number,
  prefix = '$',
  decimalPlaces,
  loading = false,
}: {
  number: number | string
  prefix?: string
  decimalPlaces?: number
  loading?: boolean
}) {
  const numberValues = checkIsScientificNotation(number) ? Number(number).toFixed(12) : Number(number)

  let formattedValue: string | number

  if (decimalPlaces) {
    formattedValue = numbro(numberValues).format({
      mantissa: decimalPlaces,
    })
  } else if (typeof number === 'number' && number < 1) {
    formattedValue = numbro(numberValues).format({
      mantissa: 4,
    })
  } else if (typeof number === 'number' && number >= 1) {
    formattedValue = numbro(numberValues).format({
      mantissa: 2,
      thousandSeparated: number >= 1000,
    })
  } else if (typeof number === 'string' && !Number.isNaN(Number(number))) {
    const num = Number(number)
    if (num < 1) {
      formattedValue = numbro(numberValues).format({
        mantissa: 4,
      })
    } else {
      formattedValue = numbro(numberValues).format({
        mantissa: 2,
        thousandSeparated: num >= 1000,
      })
    }
  } else {
    formattedValue = number
  }

  if (loading) {
    return <TextShimmer>{`${prefix}${formattedValue}`}</TextShimmer>
  }

  return (
    <>
      {prefix}
      {formattedValue}
    </>
  )
}
