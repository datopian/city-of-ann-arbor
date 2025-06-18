import Image from "next/image";
import Link from "next/link";

export default function Brand({ size }: { size: "lg" | "sm" }) {
  return (
    <Link
      href="/"
      className={`${
        size == "lg" ? "w-[100px] h-[100px]" : "w-[75px] h-[75px]"
      } relative transition-all`}
    >
      <Image
        src="/images/logos/MainLogo.svg"
        alt="City of Ann Arbor Logo"
        fill={true}
      />
    </Link>
  );
}
