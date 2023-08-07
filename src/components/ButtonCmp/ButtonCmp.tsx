import {Button, ButtonProps} from '@mui/material';

const ButtonCmp: React.FC<ButtonProps> = (props) => {
  const {title} = props
  return (
    <Button {...props} variant={'contained'}>{title}</Button>
  );
};

export default ButtonCmp;
