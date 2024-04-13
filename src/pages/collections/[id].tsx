import { useRouter } from "next/router";
export const runtime = "experimental-edge";

export default function Collection() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <h1>{id}</h1>
    </>
  );
}
