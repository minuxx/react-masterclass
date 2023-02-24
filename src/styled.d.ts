// import original module declarations
import 'styled-components'

// styled components 를 import 하고,
// styled components 의 테마 정의를 확장한다

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string
    bgColor: string
    accentColor: string
    btnBgColor: string
    toggleBtnColor: string
    coinItemBgColor: string
    overviewBgColor: string
    tabBgColor: string
  }
}
