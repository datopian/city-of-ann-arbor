import Brand from "@/components/_shared/PortalDefaultLogo";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter();
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

  return (
    <header className="bg-transparent">
      <nav
        className={`mx-auto pt-5 pb-9 px-9 flex justify-between `}
        aria-label="Global"
      >
        <Brand />
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="flex gap-x-9 mt-5 text-xl">
            <Link
              href="/search"
              className={`${
                router.pathname === "/search" ? "text-accent" : ""
              }`}
            >
              Datasets
            </Link>
            <Link
              href="/organizations"
              className={`${
                router.pathname === "/organizations" ? "text-accent" : ""
              }`}
            >
              Topics
            </Link>
            <Link
              href="/groups"
              className={`${
                router.pathname === "/groups" ? "text-accent" : ""
              }`}
            >
              Organizations
            </Link>
            <Link
              href="/groups"
              className={`${
                router.pathname === "/groups" ? "text-accent" : ""
              }`}
            >
              <span className="flex items-center flex-nowrap gap-x-1">
                About AA{" "}
                <Image
                  src="/images/icons/external-link.svg"
                  alt="external link"
                  width={13}
                  height={13}
                />
              </span>
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-white"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <span className="sr-only">Datopian</span>
            <Link href="/" className="-m-1.5 p-1.5 inline-block md:hidden">
              <Image
                src="/images/logos/logo.svg"
                width={55}
                height={55}
                alt="Portal"
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
                <Link href="/search" className="font-semibold my-auto">
                  DATASETS
                </Link>
                <Link href="/organizations" className="font-semibold my-auto">
                  ORGS
                </Link>
                <Link href="/groups" className="font-semibold my-auto">
                  GROUPS
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
