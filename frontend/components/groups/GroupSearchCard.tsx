import { Group } from "@portaljs/ckan";
import Image from "next/image";
import Link from "next/link";

export function GroupSearchCard({
  group,
  index,
}: {
  group: Group;
  index: number;
}) {
  return (
    <Link href={`/search?topic=${group.name}`} className="flex flex-col p-9 gap-y-6 bg-white rounded-[10px] shadow">
      <div
        className={`w-[80px] h-[80px] flex items-center justify-center bg-ann-arbor-groups-${index + 1} rounded-[5px]`}
      >
        <Image
          src={group.image_display_url}
          width={35}
          height={35}
          alt={`Topic ${group.title} image`}
        />
      </div>
      <div className="space-y-2">
        <h2 className="text-[23px] font-bold">{group.title}</h2>
        <p className="text-ann-arbor-gray-600 text-sm leading-5">
          Lorem ipsum dolor molor this is the description of a topic. Lorem
          ipsum dolor molor this is the description of a topic
        </p>
      </div>
      <div>
        <p className="text-sm text-ann-arbor-primary-blue">
          {group.package_count} datasets
        </p>
      </div>
    </Link>
  );
}
