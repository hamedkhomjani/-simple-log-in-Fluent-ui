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
  CardFooter,
  Menu,
  MenuTrigger,
  MenuButton,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuItemCheckbox,
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Switch
} from "@fluentui/react-components";
import { EyeRegular, EyeOffRegular, AccessibilityRegular } from "@fluentui/react-icons";

// Basic Styles
const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    // Transition background color for theme switching
    transition: "background-color 0.3s ease",
  },
  card: {
    width: "400px",
    position: "relative",
    ...shorthands.padding("30px"),
    boxShadow: tokens.shadow16,
    transition: "all 0.3s ease",
  },
  settingsButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
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
    outline: "none"
  },
  signUpContainer: {
    marginTop: "20px",
    textAlign: "center"
  }
});

export default function Login() {
  const styles = useStyles();

  // Accessibility States
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [useLargeFont, setUseLargeFont] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [useTextSpacing, setUseTextSpacing] = useState(false);
  const [isMonochrome, setIsMonochrome] = useState(false);

  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const errorRef = useRef(null);

  const currentTheme = isDarkMode ? webDarkTheme : webLightTheme;

  // Localization
  const t = {
    title: isRTL ? "ورود به حساب" : "Sign in",
    subtitle: isRTL ? "اطلاعات خود را برای دسترسی به حساب وارد کنید" : "Enter your details to access your account",
    email: isRTL ? "ایمیل" : "Email",
    password: isRTL ? "رمز عبور" : "Password",
    login: isRTL ? (loading ? "در حال ورود..." : "ورود") : (loading ? "Signing in..." : "Login"),
    noAccount: isRTL ? "حساب کاربری ندارید؟ " : "Don't have an account? ",
    signUp: isRTL ? "ثبت نام" : "Sign up",
    emailPlaceholder: isRTL ? "ایمیل خود را وارد کنید" : "example@mail.com",
    passPlaceholder: isRTL ? "رمز عبور خود را وارد کنید" : "Enter your password",
    settings: isRTL ? "تنظیمات دسترسی | Accessibility Settings" : "Accessibility Settings",
    optDarkMode: isRTL ? "کنتراست بالا | High Contrast/Dark Mode" : "High Contrast / Dark Mode",
    optLargeFont: isRTL ? "فونت بزرگ | Large Font" : "Use Large Font",
    optMotion: isRTL ? "کاهش حرکت | Reduce Motion" : "Reduced Motion",
    optRTL: isRTL ? "راست‌چین (RTL)" : "Right-to-Left Layout",
    optRTLDesc: isRTL ? "(Persian Localization)" : "(Translates to Persian)",
    optSpacing: isRTL ? "فاصله متن بیشتر | Text Spacing" : "Increased Text Spacing",
    optMonochrome: isRTL ? "سیاه و سفید | Monochrome Mode" : "Monochrome Mode",
    errorRequired: isRTL ? "لطفاً تمام فیلدها را پر کنید" : "Please fill all fields",
    errorEmailRequired: isRTL ? "لطفاً ایمیل خود را وارد کنید" : "Please fill your email",
    errorPassRequired: isRTL ? "لطفاً رمز عبور خود را وارد کنید" : "Please fill your password",
    errorEmailFormat: isRTL ? "فرم ایمیل نامعتبر است" : "Invalid email format",
    errorCredit: isRTL ? "اطلاعات ورود اشتباه است ❌" : "Invalid credentials ❌",
    successMsg: isRTL ? "ورود با موفقیت انجام شد ✅" : "Login successful ✅"
  };

  // Accessibility Style Overrides
  const accessibilityProps = {
    style: {
      fontSize: useLargeFont ? "1.2rem" : "1rem",
      transition: reduceMotion ? "none" : "all 0.3s ease",
      lineHeight: useTextSpacing ? "1.8" : "1.5",
      letterSpacing: useTextSpacing ? "1px" : "normal",
      filter: isMonochrome ? "grayscale(100%)" : "none",
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setShowErrors(true);
    setError("");

    // Both empty: only show main error at bottom
    if (!email && !password) {
      setError(t.errorRequired);
      setTimeout(() => errorRef.current?.focus(), 0);
      return;
    }

    // Only one empty: show specific field error, hide bottom error
    if (!email || !password) {
      // Logic handled in field validation props below
      return;
    }

    // Both filled but email invalid: show format error at bottom and field
    if (!isValidEmail(email)) {
      setError(t.errorEmailFormat);
      setTimeout(() => errorRef.current?.focus(), 0);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email === "test@test.com" && password === "123456") {
        alert(t.successMsg);
      } else {
        setError(t.errorCredit);
        setTimeout(() => errorRef.current?.focus(), 0);
      }
    }, 1500);
  };

    // Reset errors when typing to avoid proactive validation while user is correcting
    const onEmailChange = (e) => {
      setEmail(e.target.value);
      setShowErrors(false);
      setError("");
    };

    const onPasswordChange = (e) => {
      setPassword(e.target.value);
      setShowErrors(false);
      setError("");
    };

    return (
      <FluentProvider theme={currentTheme} dir={isRTL ? "rtl" : "ltr"}>
        <div 
          className={styles.container} 
          dir={isRTL ? "rtl" : "ltr"}
          style={{ 
            backgroundColor: currentTheme.colorNeutralBackground2,
            transition: reduceMotion ? "none" : "background-color 0.3s ease"
          }}
        >
          <Card className={styles.card} role="main" {...accessibilityProps}>
            
            <div className={styles.settingsButton}>
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <MenuButton
                    appearance="transparent"
                    icon={<AccessibilityRegular />}
                    aria-label={t.settings}
                  />
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItemCheckbox
                      name="darkMode"
                      value="darkMode"
                      checked={isDarkMode}
                      onClick={() => setIsDarkMode(!isDarkMode)}
                    >
                      {t.optDarkMode}
                    </MenuItemCheckbox>
                    <MenuItemCheckbox
                      name="largeFont"
                      value="largeFont"
                      checked={useLargeFont}
                      onClick={() => setUseLargeFont(!useLargeFont)}
                    >
                      {t.optLargeFont}
                    </MenuItemCheckbox>
                    <MenuItemCheckbox
                      name="reduceMotion"
                      value="reduceMotion"
                      checked={reduceMotion}
                      onClick={() => setReduceMotion(!reduceMotion)}
                    >
                      {t.optMotion}
                    </MenuItemCheckbox>
                    <MenuItemCheckbox
                      name="rtlLayout"
                      value="rtlLayout"
                      secondaryContent={t.optRTLDesc}
                      checked={isRTL}
                      onClick={() => setIsRTL(!isRTL)}
                    >
                      {t.optRTL}
                    </MenuItemCheckbox>
                    <MenuItemCheckbox
                      name="textSpacing"
                      value="textSpacing"
                      checked={useTextSpacing}
                      onClick={() => setUseTextSpacing(!useTextSpacing)}
                    >
                      {t.optSpacing}
                    </MenuItemCheckbox>
                    <MenuItemCheckbox
                      name="monochrome"
                      value="monochrome"
                      checked={isMonochrome}
                      onClick={() => setIsMonochrome(!isMonochrome)}
                    >
                      {t.optMonochrome}
                    </MenuItemCheckbox>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </div>

            <CardHeader 
              header={<Text weight="bold" size={useLargeFont ? 700 : 600}>{t.title}</Text>} 
              description={<Text size={useLargeFont ? 300 : 200}>{t.subtitle}</Text>}
            />

            <form onSubmit={handleLogin} noValidate>
              <Field
                label={<Text size={useLargeFont ? 400 : 300}>{t.email}</Text>}
                htmlFor="email-input"
                className={styles.field}
                // Only show if user clicked login and ONLY that field is empty
                validationMessage={
                  showErrors && !email && password ? t.errorEmailRequired : (error === t.errorEmailFormat ? error : null)
                }
                validationState={
                  (showErrors && !email && password) || error === t.errorEmailFormat ? "error" : "none"
                }
              >
                <Input
                  id="email-input"
                  value={email}
                  onChange={onEmailChange}
                  placeholder={t.emailPlaceholder}
                  autoComplete="email"
                  style={{ width: "100%" }}
                  aria-required="true"
                  type="email"
                  size={useLargeFont ? "large" : "medium"}
                />
              </Field>

              <Field
                label={<Text size={useLargeFont ? 400 : 300}>{t.password}</Text>}
                htmlFor="password-input"
                className={styles.field}
                validationMessage={showErrors && !password && email ? t.errorPassRequired : null}
                validationState={showErrors && !password && email ? "error" : "none"}
              >
                <Input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={onPasswordChange}
                  placeholder={t.passPlaceholder}
                  autoComplete="current-password"
                  style={{ width: "100%" }}
                  aria-required="true"
                  size={useLargeFont ? "large" : "medium"}
                  contentAfter={
                    <Button
                      appearance="transparent"
                      icon={showPassword ? <EyeOffRegular /> : <EyeRegular />}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      type="button"
                      size={useLargeFont ? "large" : "medium"}
                    />
                  }
                />
              </Field>

            {error && error !== t.errorEmailFormat && (
              <Text 
                className={styles.errorText} 
                size={useLargeFont ? 300 : 200}
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
                size={useLargeFont ? "large" : "medium"}
              >
                {t.login}
              </Button>
            </CardFooter>
          </form>

          <div className={styles.signUpContainer}>
            <Text size={useLargeFont ? 300 : 200}>{t.noAccount}</Text>
            <Button appearance="link" size="small">{t.signUp}</Button>
          </div>
        </Card>
      </div>
    </FluentProvider>
  );
}
