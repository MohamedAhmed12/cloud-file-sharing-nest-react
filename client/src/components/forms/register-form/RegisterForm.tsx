import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from '@mui/material';
import { useInput } from '../../../hooks/useInput';
import RegisterFormProps from './interfaces/interfaces/RegisterFormProps';

import 'assets/scss/components/forms/register-form.scss';

export default function RegisterForm(props: RegisterFormProps) {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput('');
  const {
    value: password_confirmation,
    bind: bindPasswordConfirmation,
    reset: resetPasswordConfirmation,
  } = useInput('');

  const handleSubmit = () => {};

  return (
    <Card className="register-form-card">
      <form className="register-form" onSubmit={handleSubmit}>
        <CardHeader title="Let's go!" />
        <CardContent>
            <TextField id="email" label="Email" type="email" {...bindEmail} />
            <TextField
              id="password"
              label="Password"
              type="password"
              {...bindPassword}
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              {...bindPasswordConfirmation}
            />
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
