export async function POST() {
  try {
    return Response.json(
      {
        message: 'Đăng xuất thành công',
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
        },
      },
    );
  } catch (error) {
    console.log('Internal Server Error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
