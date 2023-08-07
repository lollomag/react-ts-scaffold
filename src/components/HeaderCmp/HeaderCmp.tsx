import Container from '@mui/material/Container';
import { Link, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HeaderCmp() {
  const navigate = useNavigate()
  const theme= useTheme()

  return (
    <Box sx={{background: theme.palette.background.paper, width: '100%', p: 2}}>
      <Container maxWidth="xxl" sx={{display: 'flex', gap: 2}}>
      <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate('/')
          }}
          sx={{color: theme.palette.text.primary, textDecoration: 'none', '&:hover': {
            textDecoration: 'underline'
          }}}
        >
          Home
        </Link>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate('/contacts')
          }}
          sx={{color: theme.palette.text.primary, textDecoration: 'none', '&:hover': {
            textDecoration: 'underline'
          }}}
        >
          Contatti
        </Link>
      </Container>
    </Box>
  );
}
export default HeaderCmp;
