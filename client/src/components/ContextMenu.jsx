import { useRouter } from "next/router";
import React from "react";

function ContextMenu({ data }) {
  const router = useRouter();
  return (
    <div
      className="z-10 bg-white divide-y divide-gray-100 shadow-2xl border dark:bg-gray-700
        fixed right-4 sm:right-5 top-16 sm:top-20
        w-36 sm:w-44
      "
    >
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
        {data.map(({ name, callback }, index) => {
          return (
            <li
              key={index}
              onClick={callback}
              className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ContextMenu;
