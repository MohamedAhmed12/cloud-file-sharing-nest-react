import RegisterForm from 'components/forms/register-form/RegisterForm';
import { Container } from '@mui/material';

import 'assets/scss/pages/register.scss';

export default function Register() {
  return (
    <Container className="register-form-container">
      <RegisterForm />
    </Container>
  );
}
