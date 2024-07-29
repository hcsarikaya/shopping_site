import ProductCard from "@/components/ProductCard";
import { Heart } from "@phosphor-icons/react/dist/ssr/Heart";
import Products from "../Products";

export default function Home() {
  return (
    <div className="py-10 lg:py-20 max-w-[660px] mx-auto">
      <div className="flex items-center text-primary justify-between w-full mx-auto mb-6">
        <h2 className="text-2xl font-semibold">Products</h2>
      </div>
      <Products/>
    </div>
  );
}
