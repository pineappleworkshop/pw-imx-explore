import * as React from 'react'
const SvgMarketPlace = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 3h1.556l.31 1.556m1.245 6.222h7.778L17 4.556H4.867m1.244 6.222L4.867 4.556m1.244 6.222L4.328 12.56a.778.778 0 0 0 .55 1.328h9.01m0 0a1.556 1.556 0 1 0 0 3.111 1.556 1.556 0 0 0 0-3.111Zm-6.221 1.555a1.556 1.556 0 1 1-3.111 0 1.556 1.556 0 0 1 3.11 0Z"
      stroke="#fff"
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default SvgMarketPlace
