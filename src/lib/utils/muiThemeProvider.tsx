"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const MuiThemeProvider = ({ children }: React.PropsWithChildren) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00D4B7",
      },
      secondary: {
        main: "#FEE500",
      },
    },
    typography: {
      fontFamily: ["Binggrae", "Pretendard-Regular"].join(","),
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
