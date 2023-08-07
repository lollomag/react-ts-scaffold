import { Theme, createTheme } from '@mui/material/styles';
import { createBreakpoints } from '@mui/system';
import { breakpointsTheme } from './breakpointsTheme';
import { componentsTheme } from './componentsTheme';

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

const breakpoints = createBreakpoints({ ...breakpointsTheme });
const palette = {
  background: {
    default: '#282828',
    paper: '#a31545'
  },
  text: {
    primary: '#fff'
  }
}

export const themeOptions = createTheme({
  palette: {
    ...palette
  },
  breakpoints: {
    ...breakpoints
  },
  ...componentsTheme(palette)
});