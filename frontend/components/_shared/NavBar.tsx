import Brand from "@/components/_shared/Brand";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const links = [
  {
    href: "/search",
    label: "Data",
  },
  {
    href: "/topics",
    label: "Topics",
  },
  {
    href: "https://www.a2gov.org/",
    target: "_blank",
    label: (
      <>
        a2gov{" "}
        <Image
          src="/images/icons/external-link.svg"
          alt="external link"
          width={13}
          height={13}
          className="inline pb-1"
        />
      </>
    ),
  },
];

export default function NavBar() {
  const router = useRouter();
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false); // Close the menu
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const onScroll = (e) => {
      const scrollPos = window.scrollY;

      if (scrollPos < 10 && hasScrolled != false) {
        setHasScrolled(false);
      } else if (scrollPos >= 10 && hasScrolled != true) {
        setHasScrolled(true);
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [hasScrolled]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:text-ann-arbor-accent-green focus:font-semibold focus:outline-none focus:ring-2 focus:ring-ann-arbor-accent-green"
      >
        Skip to main content
      </a>
      <header
        className={`${
          !hasScrolled ? "bg-transparent" : "bg-white drop-shadow"
        } fixed w-full z-20 transition-all`}
      >
        <nav
          className={`mx-auto ${
            !hasScrolled ? "pb-9 pt-5" : "pb-3 pt-3"
          } px-9 flex flex-nowrap justify-between transition-all`}
          aria-label="Global"
        >
        <Brand size={hasScrolled ? "sm" : "lg"} />
        <div className="hidden lg:flex lg:gap-x-12">
          <div
            className={`flex gap-x-9 ${
              !hasScrolled ? "mt-5" : "items-center"
            } text-[19px] transition-all`}
          >
            {links.map((link) => (
              <div key={`navbar-link-${link.href}`}>
                <Link
                  target={link.target ?? undefined}
                  href={link.href}
                  className={`transition-all duration-100 ${
                    router.pathname === link.href
                      ? "font-semibold border-b-ann-arbor-accent-green border-b-2"
                      : ""
                  } hover:font-semibold hover:border-b-ann-arbor-accent-green hover:border-b-2`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex lg:hidden flex-col items-center justify-center">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-white"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-30" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-30 w-full overflow-y-auto bg-white px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <span className="sr-only">Datopian</span>
            <Link href="/" className="-m-1.5 p-1.5 inline-block md:hidden">
              <Image
                src="/images/logos/MainLogo.svg"
                width={55}
                height={55}
                alt="City of Ann Arbor Logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-[var(--text-base)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 flex flex-col">
                {links.map((link) => {
                  return (
                    <Link
                      href={link.href}
                      target={link.target}
                      className="font-semibold my-auto"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
    </>
  );
}
