import React from "react";
import Link from "next/link";

export default () => (
  <div>
    <p>
      {env.NEXT_APP_NAME
        ? env.NEXT_APP_NAME
        : "Nameless app (set `NEXT_APP_NAME` environment variable)"}
    </p>
    <ul>
      <li>
        <Link href="/b" as="/a">
          <a>a</a>
        </Link>
      </li>
      <li>
        <Link href="/a" as="/b">
          <a>b</a>
        </Link>
      </li>
    </ul>
  </div>
);
