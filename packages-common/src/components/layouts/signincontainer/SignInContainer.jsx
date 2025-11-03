import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

import backgroundImage from "../../../assets/images/Login.png";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100%",
  height: "50vh",
  borderRadius: "10px",
  boxShadow: theme.shadows[10],
}));

const SignInContainer = ({ children }) => {
  const containerStyles = {
    display: "flex",
    alignItems: "center",
    height: "100vh",
    justifyContent: "center",
  };

  return (
    <Container maxWidth="lg" sx={containerStyles}>
      <StyledBox>{children}</StyledBox>
    </Container>
  );
};

export default SignInContainer;
