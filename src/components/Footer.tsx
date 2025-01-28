import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md w-full py-7 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-2xl font-bold uppercase tracking-widest text-white font-[family-name:var(--font-quicksand-sans)]"
        >
          shop
        </Link>

        <nav className="flex items-center space-x-40">
          <div className="flex items-center space-x-4">
            <Link
              href="/products"
              className="text-white hover:text-blue-100 text-xl font-bold"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-blue-100 text-xl font-bold"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-blue-100 text-xl font-bold"
            >
              Contact
            </Link>
          </div>
          <Link
            className="text-white hover:text-blue-100 text-xl font-bold"
            href="+12345678"
            type="phone"
          >
            +1234567890
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
