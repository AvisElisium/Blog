import {Button, ButtonProps, CircularProgress} from "@mui/material";

interface Props {
    text: string;
    isLoading: boolean;
}

const LoadingButton = (props: ButtonProps & Props) => {

    const {isLoading, text, ...buttonProps} = props;
    
    return (
        <Button {...buttonProps}>
            {text} {isLoading && <CircularProgress />}
        </Button>
    )
}


export default LoadingButton;