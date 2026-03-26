import React, { useState, useRef } from "react";
import {
  Button,
  Input,
  Text,
  Field,
  makeStyles,
  shorthands,
  tokens,
  Card,
  CardHeader,
  CardFooter
} from "@fluentui/react-components";
import { EyeRegular, EyeOffRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  card: {
    width: "400px",
    ...shorthands.padding("30px"),
    boxShadow: tokens.shadow16,
  },
  field: {
    marginTop: "20px",
  },
  footer: {
    marginTop: "30px",
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
    marginTop: "10px",
    display: "block",
    outline: "none" // Remove focus outline for the alert text
  },
  signUpContainer: {
    marginTop: "20px",
    textAlign: "center"
  }
});

export default function Login() {
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const errorRef = useRef(null);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      // Use setTimeout to ensure the React state update and DOM rendering are complete before focusing
      setTimeout(() => errorRef.current?.focus(), 0);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format");
      setTimeout(() => errorRef.current?.focus(), 0);
      return;
    }

    setLoading(true);

    // Simulated API Call
    setTimeout(() => {
      setLoading(false);
      if (email === "test@test.com" && password === "123456") {
        alert("Login successful ✅");
      } else {
        setError("Invalid credentials ❌");
        setTimeout(() => errorRef.current?.focus(), 0);
      }
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card} role="main">
        <CardHeader 
          header={<Text weight="bold" size={600}>Sign in</Text>} 
          description={<Text size={200}>Enter your details to access your account</Text>}
        />

        <form onSubmit={handleLogin} noValidate>
          <Field
            label="Email"
            htmlFor="email-input"
            className={styles.field}
            validationMessage={error && !email ? error : (error === "Invalid email format" ? error : null)}
            validationState={error && (!email || error === "Invalid email format") ? "error" : "none"}
          >
            <Input
              id="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              autoComplete="email"
              style={{ width: "100%" }}
              aria-required="true"
              type="email"
            />
          </Field>

          <Field
            label="Password"
            htmlFor="password-input"
            className={styles.field}
            validationMessage={error && !password ? error : null}
            validationState={error && !password ? "error" : "none"}
          >
            <Input
              id="password-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              style={{ width: "100%" }}
              aria-required="true"
              contentAfter={
                <Button
                  appearance="transparent"
                  icon={showPassword ? <EyeOffRegular /> : <EyeRegular />}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  type="button"
                />
              }
            />
          </Field>

          {error && (
            <Text 
              className={styles.errorText} 
              size={200}
              role="alert"
              aria-live="assertive"
              tabIndex={-1}
              ref={errorRef}
            >
              {error}
            </Text>
          )}

          <CardFooter className={styles.footer}>
            <Button
              type="submit"
              appearance="primary"
              style={{ width: "100%" }}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </CardFooter>
        </form>

        <div className={styles.signUpContainer}>
          <Text size={200}>Don't have an account? </Text>
          <Button appearance="link" size="small">Sign up</Button>
        </div>
      </Card>
    </div>
  );
}
