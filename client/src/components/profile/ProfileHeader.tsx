import {Box, Stack, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import moment from "moment/moment";
import React, {FC} from "react";
import {ProfileDto} from "./Profile";

interface Props {
    profile: ProfileDto;
}

const ProfileHeader: FC<Props> = ({ profile }) => {

    const handleRole = (r: number) => {
        if (r === 0) return "User";
        if (r === 1) return "Author";
        if (r === 2) return "Admin";
    }
    
    return (
        <Stack direction={"row"}>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: "scale(4)",
                    marginRight: 8,
                    marginLeft: 8,
                }}>
                <AccountCircleIcon />
            </Box>

            <Stack>
                <Typography>
                    {profile.username}
                </Typography>

                <Typography>
                    Member since: {moment.utc(profile.joined).format("DD MMM YYYY")}
                </Typography>

                <Typography>
                    Role: {handleRole(profile.userType)}
                </Typography>
            </Stack>
        </Stack>
    )
}


export default ProfileHeader;