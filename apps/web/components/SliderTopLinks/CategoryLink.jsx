import Image from "next/image";
import Link from "next/link";

export default function CategoryLink({
  categoryName,
  categoryPath,
  isRightArrowVisible,
  categoryExtraLinks = [],
}) {
  return (
    <div className="relative group/link w-[100%]">
      <div
        style={{
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "subpixel-antialiased",
        }}
        className="cursor-pointer transition ease duration-100 flex justify-between items-center h-[20px] w-[100%]">
        <Link
          className="text-lg font-andika text-nowrap w-full group-hover/link:font-semibold"
          href={categoryPath}>
          {categoryName}
        </Link>
        &nbsp;
        {isRightArrowVisible && (
          <Image
            className="group-hover/link:translate-x-[10px] transform ease-linear duration-300 align-right justify-self-end"
            src="/assets/right-arrow.svg"
            alt="right arrow"
            width={20}
            height={20}
          />
        )}
      </div>
      {categoryExtraLinks.length > 0 && (
        <div className="hidden group-hover/link:flex absolute top-0 z-[999] right-[-200px] h-fit flex-col gap-3 bg-white rounded shadow-lg p-5 pl-[30px] pr-[30px]">
          <div className="m-[0_15px_0_0]">
            <span className="font-andika font-semibold text-sm">
              More in {categoryName}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {categoryExtraLinks.map((item) => (
              <Link className="font-andika" href={"/"}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
