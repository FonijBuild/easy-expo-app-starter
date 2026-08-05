import { AppHeader, AppScreen, FormField } from '@/shared/components';
import { Button, ButtonSpinner, ButtonText, Text, VStack } from '@/shared/components/ui';
import { profileFormSchema, type ProfileFormValues } from '@/shared/model';
import { useLanguageStore, useSessionStore } from '@/shared/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export function EditProfileScreen() {
  const { t } = useTranslation();
  const session = useSessionStore((state) => state.session);
  const profile = useSessionStore((state) => state.profile);
  const updateProfile = useSessionStore((state) => state.updateProfile);
  const language = useLanguageStore((state) => state.language);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: profile?.displayName ?? session?.user.displayName ?? '',
      bio: profile?.bio ?? '',
    },
  });

  const submit = handleSubmit(async (values) => {
    if (!session) return;
    try {
      await updateProfile({
        userId: session.user.id,
        displayName: values.displayName,
        bio: values.bio,
        locale: language,
      });
      router.back();
    } catch {
      setError('root', { message: 'auth.errors.generic' });
    }
  });

  return (
    <AppScreen scroll keyboardAware>
      <AppHeader title={t('profile.editTitle')} back />
      <VStack space="lg">
        <Controller
          control={control}
          name="displayName"
          render={({ field }) => (
            <FormField
              error={
                errors.displayName?.message ? t(errors.displayName.message) : undefined
              }
              label={t('profile.name')}
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="bio"
          render={({ field }) => (
            <FormField
              className="min-h-24 py-3"
              error={errors.bio?.message ? t(errors.bio.message) : undefined}
              label={t('profile.bio')}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.root?.message ? (
          <Text accessibilityRole="alert" tone="danger">
            {t(errors.root.message)}
          </Text>
        ) : null}
        <Button isDisabled={isSubmitting} onPress={submit}>
          {isSubmitting ? <ButtonSpinner /> : null}
          <ButtonText>{t('common.save')}</ButtonText>
        </Button>
      </VStack>
    </AppScreen>
  );
}
