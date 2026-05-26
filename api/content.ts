import siteContent from "../data/content.json";

export async function GET() {
  return Response.json(siteContent);
}
