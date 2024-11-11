'use client';

import { useFetchUser } from '@/apis/auth.api';

const Profile = () => {
  const { data } = useFetchUser();

  return <div>{data?.data.username}</div>;
};

export default Profile;
