import {
    Button, ButtonGroup,
    Container,
    Link,
    MenuItem,
    MenuList,
    Modal,
    Paper,
    Popover,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import axios, {AxiosError} from "axios";
import {Article} from "../../types/articles/article";
import React, {ReactElement, useContext, useEffect, useState} from "react";
import moment from "moment/moment";
import {Link as RouterLink} from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Interweave} from "interweave";
import {AuthContext} from "../../context/AuthContext";
import ArticlePostSkeleton from "./ArticlePostSkeleton";
import ArticleEditForm from "./ArticleEditForm";
import LoadingButton from "../shared/LoadingButton";
import ArticleDeleteModal from "./ArticleDeleteModal";

const ArticlePost = () => {
    
    const {id} = useParams();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    
    const {isLoading, isError, data, error} = useQuery<Article, AxiosError>({
        queryKey: ["article", id],

        queryFn: (): Promise<Article> => {
            return axios.get<Article>(`/article/${id}`).then(res => res.data);
        },
        
        onError: (err) => {
            if (err.response?.status === 404) navigate("/not-found");
        },
    })
    
    const {currentUser} = useContext(AuthContext);
    
    if (isLoading || data === null || data === undefined) return <ArticlePostSkeleton />;
    
    const handleCloseEditMode = () => {
        setEditMode(false);
    }
    
    const handleCloseDeleteMode = () => {
        setDeleteMode(false)
    }
    
    if (editMode) return <ArticleEditForm initialHeadline={data.headline} initialContent={data.content} id={id as string} closeEditMode={handleCloseEditMode} />
    
    return (
        <Stack spacing={2} component={"article"} sx={{
            marginTop: "2em",
        }}>
            <header>
                <Typography variant={"h2"}>
                    {data!.headline} {currentUser?.isAdmin && !editMode && <Button onClick={handleClick}>Manage</Button>}
                </Typography>
                <Typography>
                    <Link component={RouterLink} to={`/profile/${data!.author.username}`} underline={"hover"}>
                        {data!.author.username}
                    </Link>
                </Typography>
                <Typography>
                    {moment.utc(data!.createdAt).format("DD MMMM YYYY")}
                </Typography>
            </header>
            
            <Typography component={"div"}>
                <Interweave content={data.content} />
            </Typography>

            <Popover
                id={open ? id : undefined}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <MenuList
                    onKeyDown={() => {}}
                    autoFocusItem={open}
                >
                    <MenuItem onClick={() => {
                        handleClose();
                        setEditMode(true);
                    }}>
                        Edit
                    </MenuItem>

                    <MenuItem onClick={() => {
                        handleClose()
                        setDeleteMode(true);
                    }}>
                        Delete
                    </MenuItem>
                    
                </MenuList>
            </Popover>
            
            <ArticleDeleteModal open={deleteMode} id={id as string} handleClose={handleCloseDeleteMode} />
        </Stack>
    )
}

export default ArticlePost;