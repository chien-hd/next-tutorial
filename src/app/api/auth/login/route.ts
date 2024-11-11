export async function POST(req: Request) {
  try {
    const res = await req.json();
    const sessionToken = res?.data?.token;

    if (!sessionToken) {
      return Response.json({
        message: 'Đâu, token đâu ???',
        status: 400,
      });
    }

    return Response.json(
      { ...res },
      {
        status: 200,
        headers: {
          'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly`,
          'Content-Type': 'application/json',
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
