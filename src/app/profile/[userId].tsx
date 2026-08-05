import { Redirect, useLocalSearchParams } from 'expo-router';
import { ProfileScreen } from '@/features/profile';
import { getSingleRouteParam } from '@/shared/lib/route-params';

export default function PublicProfileRoute() {
  const params = useLocalSearchParams<{ userId?: string | string[] }>();
  const userId = getSingleRouteParam(params.userId);

  if (!userId) return <Redirect href="/profile" />;
  return <ProfileScreen userId={userId} />;
}
