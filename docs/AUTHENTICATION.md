# Authentication

## Modes

`EXPO_PUBLIC_API_MODE=mock` uses an in-memory repository for local development. `remote` calls the endpoint contract in `remote-auth.repository.ts`.

Mock values are configured in `app-config.ts` and consumed by both forms and the mock repository. They are development conveniences, not production credentials.

## Remote endpoint contract

```text
POST /auth/email/login
POST /auth/otp/request
POST /auth/otp/verify
POST /auth/password/forgot
POST /auth/password/reset
```

Adapt request/response mapping in the remote repository when the backend differs. Do not leak backend DTOs into screens.

## Session storage

Native access and refresh tokens are persisted with Expo SecureStore. Non-sensitive profile display data and preferences use AsyncStorage. On web, the current adapter falls back to AsyncStorage for demonstration; production web apps should strongly prefer server-set Secure, HttpOnly, SameSite cookies and CSRF protection.

## Required backend controls

The backend owns credential validation, OTP expiration and attempt limits, rate limiting, reset-token integrity, refresh rotation, revocation, authorization, and generic forgot-password behavior.

## Refresh design

Before production, add a single-flight refresh coordinator that:

1. Detects an expired/401 access token.
2. Allows only one refresh request at a time.
3. Queues eligible requests behind it.
4. Atomically replaces rotated tokens.
5. Clears the session when refresh fails.
6. Never retries authentication endpoints recursively.
