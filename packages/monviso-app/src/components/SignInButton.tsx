import {AuthProvider, useFirebaseAuth} from '@use-firebase/auth'
import React, {ReactElement} from "react"
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  error: {},
  input: {
    display: 'none',
  },
}))

export const SignInButton: React.FC<any> = (): ReactElement => {
  const classes = useStyles();
  const { signIn, signInError, createAuthProvider } = useFirebaseAuth();

  const onSignIn = (authProvider: any) => {
    const provider = createAuthProvider(authProvider);
    signIn(provider);
  }

  return (
    <>
      <Button
        href=''
        onClick={(): void => onSignIn(AuthProvider.GOOGLE)}
        variant="contained"
        className={classes.button}>
        Sign In
      </Button>
        {signInError &&
          <div className={classes.error}>
            <h3>{signInError.code}</h3>
            {signInError.message}
          </div>
        }
    </>
  )
}
