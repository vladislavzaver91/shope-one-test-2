// import Catalog from "@/components/home/Catalog";
import Hero from "@/components/home/Hero";
import NewItems from "@/components/home/NewItems";
import SpecialOffer from "@/components/home/SpecialOffer";
import Stock from "@/components/home/Stock";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="section">
        <Hero />
      </div>
      {/* <div className="section">
        <Catalog />
      </div> */}
      <div className="section">
        <Stock />
      </div>
      <div className="section">
        <NewItems />
      </div>
      <div className="section">
        <SpecialOffer />
      </div>
    </div>
  );
}
