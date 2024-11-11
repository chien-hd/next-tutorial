'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/form-control/input';
import { LoginBodyType, loginSchema } from '@/app/schema';
import authRequest, { useLogin } from '@/apis/auth.api';
import { useRouter } from 'next/navigation';
import { clientSessionToken } from '@/config/http.config';

const LoginForm = () => {
  const LoginMutate = useLogin();
  const navigation = useRouter();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'chienhd@liftsoft.vn',
      password: 'Lp123456',
    },
  });

  const onSubmit = async (values: LoginBodyType) => {
    LoginMutate.mutate(values, {
      onSuccess(dataSuccess) {
        if (dataSuccess.is_flag) {
          clientSessionToken.value = dataSuccess.data.token;
          authRequest.auth(dataSuccess).then(() => {
            if (dataSuccess.data.token) {
              navigation.push('/');
            }
          });
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <h3 className='mb-2 w-full pb-2 text-4xl'>Đăng nhập đê mầy !!!</h3>
        <FormInput
          name='username'
          label='Tên đăng nhập'
          placeholder='example@gmail.com'
        />

        <FormInput
          name='password'
          label='Mật khẩu'
          placeholder='example@gmail.com'
          type='password'
        />

        <Button
          type='submit'
          className='!mt-3 w-full'
          disabled={LoginMutate.isPending}
        >
          {LoginMutate.isPending ? 'Đang đăng nhập đợi xí mầy...' : 'Đăng nhập'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
