import Image from "next/image";
import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/">
      <Image
        src="/images/logos/MainLogo.svg"
        height={100}
        alt="City of Ann Arbor Logo"
        width={100}
      />
    </Link>
  );
}
