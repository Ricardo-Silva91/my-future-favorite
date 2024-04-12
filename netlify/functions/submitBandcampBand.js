export const handler = async function (event, context) {
  // your server-side functionality
  const { bandLink } = event.queryStringParameters

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World', bandLink })
  }
}
