import { getProducts } from "@/feature/product/service";


export default async function Page() {

const products = await getProducts({})
  return (
    <>
      Hi
    </>

  );
}