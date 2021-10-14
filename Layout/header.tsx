import Link from "next/link";
import H from "./header.module.css";

export default function Header() {
  return (
    <header className="sticky top-0 bg-green-400 z-40 lg:z-50">
      <div className="my-3">
        <nav>
          <ul className={H.list}>
            <li className={H.item}>
              <Link href="/html">
                <a>HTML</a>
              </Link>
            </li>
            <li className={H.item}>
              <Link href="/css">
                <a>CSS</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
