import { Icon, IconProps, SvgIcon, SvgIconProps } from '@mui/material';
import AuthImage from './authImage.svg';

const AuthPageIcon = (props: IconProps) => {
  return (
    <>
      <img alt={'Authentication image'} src={AuthImage} />
    </>
  );
};

export default AuthPageIcon;
