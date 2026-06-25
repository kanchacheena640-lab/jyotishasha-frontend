import Link from "next/link";

type Props = {
  locale: string;
  title: string;
};

export default function TithiBreadcrumb({
  locale,
  title,
}: Props) {
  const isHi = locale === "hi";

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-sm text-gray-400 mb-8"
    >
      <ol className="flex flex-wrap items-center gap-2">

        <li>
          <Link
            href={`/${locale}`}
            className="hover:text-orange-500"
          >
            {isHi ? "होम" : "Home"}
          </Link>
        </li>

        <li>/</li>

        <li>
          <Link
            href={`/${locale}/panchang`}
            className="hover:text-orange-500"
          >
            {isHi ? "पंचांग" : "Panchang"}
          </Link>
        </li>

        <li>/</li>

        <li>
          <Link
            href={`/${locale}/panchang/tithi`}
            className="hover:text-orange-500"
          >
            {isHi ? "तिथि" : "Tithi"}
          </Link>
        </li>

        <li>/</li>

        <li className="text-white font-medium">
          {title}
        </li>

      </ol>
    </nav>
  );
}