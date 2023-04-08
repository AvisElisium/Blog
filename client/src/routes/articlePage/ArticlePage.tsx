import {Container} from "@mui/material";
import {Outlet, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {Article} from "../../types/articles/article";
import {FC} from "react";
import axios from "axios/index";
import Navbar from "../../components/navbar/Navbar";

const ArticlePage = () => {
    return (
        <>
            <Navbar />
            <Container maxWidth={"md"}>
                <Outlet />
            </Container>
        </>
    )
}


export default ArticlePage;