import React from "react";
import { footerLinks } from "../constants";

function Footer() {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div>
          <p className="font-semibold text-gray-300 text-xs">
            More ways to shop:{" "}
            <span className="underline text-blue-500">
              Find an Apple Store{" "}
            </span>{" "}
            or <span className="underline text-blue-500">other retailer </span>{" "}
            near you.
          </p>
          <p className="font-semibold text-gray-300 text-xs">
            Or call 0800-123-456
          </p>

          <div className="bg-neutral-700 my-5 h-[1px] w-full"></div>

          <div className="flex md:flex-row flex-col items-center justify-between">
            <p className="font-semibold text-gray-300 text-xs">
              Copiright @ 2025 Apple Inc. All rights reserved.
            </p>
            <div className="flex gap-5 mt-1 md:mt-0">
              {footerLinks.map((link, index) => (
                <p key={index} className="font-semibold text-gray text-xs">
                  {link}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
