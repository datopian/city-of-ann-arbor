import Image from "next/image";
import Link from "next/link";

const navigation = [
  {
    title: "About",
    links: [
      { title: "Organizations", href: "#" },
      { title: "Contact", href: "#" },
      { title: "Organizations", href: "#" },
    ],
  },
  {
    title: "Learn more",
    links: [
      { title: "Organizations", href: "#" },
      { title: "Contact", href: "#" },
      { title: "Organizations", href: "#" },
    ],
  },
  {
    title: "Get started",
    links: [
      { title: "Organizations", href: "#" },
      { title: "Contact", href: "#" },
      { title: "Organizations", href: "#" },
    ],
  },
  {
    title: "Useful links",
    links: [
      { title: "Organizations", href: "#" },
      { title: "Contact", href: "#" },
      { title: "Organizations", href: "#" },
    ],
  },
];

const socialMedia = [
  {
    image_url: "/images/icons/facebook-circle-white.svg",
    href: "https://www.facebook.com/TheCityOfAnnArbor/",
  },

  {
    image_url: "/images/icons/x-circle-white.svg",
    href: "https://twitter.com/a2gov",
  },
  {
    image_url: "/images/icons/instagram-circle-white.svg",
    href: "https://www.instagram.com/thecityofannarborgovernment/",
  },
  {
    image_url: "/images/icons/linkedin-circle-white.svg",
    href: "https://www.linkedin.com/company/city-of-ann-arbor",
  },
  {
    image_url: "/images/icons/a2-open-city-hall-circle-white.svg",
    href: "https://www.opentownhall.com/p/116",
  },
  {
    image_url: "/images/icons/public-engagement-hub-circle-white.svg",
    href: "https://engage.a2gov.org/",
  },
  {
    image_url: "/images/icons/youtube-circle-white.svg",
    href: "https://www.youtube.com/user/ctnannarbor",
  },
  {
    image_url: "/images/icons/nextdoor-circle-white.svg",
    href: "https://nextdoor.com/agency-detail/mi/ann-arbor/city-of-ann-arbor-1/",
  },
];

export function Footer() {
  return (
    <footer className="bg-[#303A40]">
      <div className="grid grid-cols-2 py-12 mx-14 text-white">
        <div className="p-6 flex flex-col space-y-10">
          <Image
            alt="Ann Arbor logo"
            src="/images/logos/logo-white.svg"
            width={150}
            height={150}
          />
          <div className="space-y-5">
            <div>
              <p className="text-lg font-semibold">Address</p>
              <p className="text-base">
                301 E. Huron St.
                <br /> Ann Arbor, MI 48104
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Contact</p>
              <a href="tel:7347946000" className="text-base font-bold">
                734.794.6000
              </a>
              <a
                href="https://www.a2gov.org/contact-us/"
                className="text-base font-bold"
              >
                Contact Us
              </a>
            </div>
            <div className="space-y-5">
              <p className="text-lg font-semibold">
                Get Updates from the City
              </p>
              <div className="flex flex-row gap-7">
                {socialMedia.map((sm) => {
                  return (
                    <Link key={sm.href} href={sm.href} target="_blank">
                      <Image
                        src={sm.image_url}
                        alt="Social Media Link" //TODO: improve this
                        width={30}
                        height={30}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-6 gap-y-3">
          <div className="grid grid-cols-2 gap-14">
            {navigation.map((n) => {
              return (
                <div className="space-y-7">
                  <p className="font-semibold text-lg">{n.title}</p>
                  <div className="flex flex-col space-y-4">
                    {n.links.map((l) => {
                      return (
                        <a href={l.href} className="text-lg">
                          {l.title}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <p className="text-lg">
              Powered by{" "}
              <Link
                href="http://portaljs.com"
                target={"_blank"}
                className="underline text-[#079A6D] font-semibold"
              >
                PortalJS
              </Link>{" "}
              from{" "}
              <Link href="https://datopian.com" target={"_blank"}>
                <Image
                  src="/images/logos/datopian-logo.png"
                  alt="Datopian.com"
                  width={135}
                  height={32}
                  className="inline"
                />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
