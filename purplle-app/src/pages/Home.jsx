import "../styles/Home.css";
import Header from "../component/Header";
import Footer from "../component/Footer";
import CarouselMain from "./CarouselMain";
import ProductRow from "./ProductRow";

function Home() {
  return (
    <>
      <Header />
      <main className="home">
        <CarouselMain />
        <ProductRow />
      </main>
      <Footer />
    </>
  );
}

export default Home;