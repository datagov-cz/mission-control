import React from "react";
import {Box, Container, styled} from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
    children: React.ReactNode;
}

const FullSizedBox = styled(Box)({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white"
});

const ContentBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
});

const Layout: React.FC<Props> = ({children}) => {
    return (
        <FullSizedBox>
            <Header/>
            <ContentBox py={3}>
                <Container>{children}</Container>
            </ContentBox>
            <Footer/>
        </FullSizedBox>
    );
};

export default Layout;
