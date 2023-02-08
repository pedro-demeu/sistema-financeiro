import { Box } from "@mui/material";

type Props = {
  children: JSX.Element;
};
export const AppContainer: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "#211f27",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};
