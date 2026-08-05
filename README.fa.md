# قالب شروع React Native

یک پایه قابل تنظیم برای Expo روی Android، iOS و وب با Expo Router، gluestack-ui، NativeWind v5، TypeScript، TanStack Query، Zustand، React Hook Form، Zod و i18next.

## شروع سریع

```bash
corepack enable
cp .env.example .env
pnpm install
pnpm check
pnpm dev
```

اطلاعات ورود آزمایشی:

```text
Email: demo@example.com
Password: password123
OTP: 123456
```

برای شخصی‌سازی برند، فایل `src/shared/config/brand-config.ts` را ویرایش و سپس `pnpm theme:sync` را اجرا کنید. قابلیت‌ها، زبان‌ها و تنظیمات رفتاری در `src/shared/config/app-config.ts`، تصاویر در `assets/images` و متن‌ها در فایل‌های ترجمه قرار دارند.

برای توسعه با عامل‌های کدنویسی ابتدا `AGENTS.md` و سپس مشخصات مرتبط در `specs/` را بخوانید.

> توجه: NativeWind v5 در حال حاضر از تگ preview نصب می‌شود. ریسک و سیاست ارتقا در `docs/adr/0002-nativewind-v5.md` ثبت شده است.
