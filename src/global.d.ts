declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.svg' {
  const content: string
  export default content

  // اگر می‌خوای به عنوان ReactComponent هم استفاده کنی:
  import * as React from 'react'
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
}
