import { createGlobalStyle, css } from 'styled-components'

const sizes = {
  xl: 1170,
  lg: 992,
  md: 768,
  sm: 576
}

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})

export const darkTheme = {
  background: '#2c3240',
  color: 'white'
}

export const lightTheme = {
  background: 'white',
  color: '#2c3240'
}

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0 !important;
    padding: 0 !important;
    text-rendering: geometricPrecision;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: 'Play', sans-serif;
    background: rgb(238,174,202);
    background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
  }
`
