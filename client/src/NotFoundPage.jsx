import { Typography, Container } from '@mui/material';

function NotFoundPage() {
  return (
    <Container maxWidth="sm">
        <Typography variant="h4" component="h1" align="center" color="primary" sx={{ mt: 4 }}>
            Error 404: Page not found
        </Typography>
    </Container>
  );
}

export default NotFoundPage;