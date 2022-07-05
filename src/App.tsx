import { useRecoilValue } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import "./App.css";
import { themeState } from "./atoms";
import Todos from "./components/Todos";
import { darkTheme, lightTheme } from "./theme";

const Reset = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  *{
    box-sizing: border-box;
  }
  body {
    line-height: 1;
    background-color:${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  hr {
    width: 50%;
    color: ${(props) => props.theme.textColor};;
  }
 
`;

function App() {
  const theme = useRecoilValue(themeState);
  return (
    <>
      <ThemeProvider theme={theme ? lightTheme : darkTheme}>
        <Reset />
        <Todos />
      </ThemeProvider>
    </>
  );
}

export default App;