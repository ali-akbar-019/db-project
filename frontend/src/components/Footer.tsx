import { Facebook, Instagram, Linkedin, Twitch, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" border-t px-10">
      {/* top */}
      <div className="grid grid-cols-3 pt-10 pb-5 gap-10">
        <div className="col-span-2 flex gap-32">
          <div>
            <strong className="text-gray-500">Company</strong>
            <ul className="space-y-2 mt-2">
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                About
              </li>
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                Career
              </li>
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                Media about us
              </li>
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                Points of delivery
              </li>
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                Contacts
              </li>
            </ul>
          </div>
          <div>
            {" "}
            <strong className="text-gray-500">For customer</strong>
            <ul className="space-y-2 mt-2">
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                Contact us
              </li>
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                Retur
              </li>
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                How to pay?
              </li>
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                Delivery
              </li>
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                FAQ
              </li>
            </ul>
          </div>

          <div>
            {" "}
            <strong className="text-gray-500">Partners</strong>
            <ul className="space-y-2 mt-2">
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                Sign in
              </li>
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                Become a partner
              </li>
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                Turnkey brand
              </li>
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                Open a delivery point
              </li>
              <li className="font-semibold text-sm text-gray-800 transition hover:text-gray-950 cursor-pointer">
                Logistics
              </li>
            </ul>
          </div>
        </div>
        <div className=" flex items-center justify-center">
          <div>
            <img
              src="/download_01.png"
              alt="download image"
              className="w-full h-full object-cover max-w-[300px]"
            />
          </div>
        </div>
      </div>
      {/* down */}
      <div className="flex items-center justify-between py-5 border-t">
        <div className="text-gray-500 font-bold">
          &copy; {new Date().getFullYear()}
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-gray-950 p-2 rounded-full flex items-center justify-center ">
            <Facebook className="text-white w-5 h-5" />
          </span>
          <span className="bg-gray-950 p-2 rounded-full flex items-center justify-center ">
            <Instagram className="text-white w-5 h-5" />
          </span>
          <span className="bg-gray-950 p-2 rounded-full flex items-center justify-center ">
            <Youtube className="text-white w-5 h-5" />
          </span>
          <span className="bg-gray-950 p-2 rounded-full flex items-center justify-center ">
            <Twitch className="text-white w-5 h-5" />
          </span>
          <span className="bg-gray-950 p-2 rounded-full flex items-center justify-center ">
            <Linkedin className="text-white w-5 h-5" />
          </span>
        </div>
        <div>
          <p className="text-gray-500 font-bold">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
