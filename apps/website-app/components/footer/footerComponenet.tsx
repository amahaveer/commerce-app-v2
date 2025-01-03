// import "@fortawesome/fontawesome-free/css/all.min.css";
import { Label } from "@/components/ui/label";
import Link from "next/link";
const footerComponent = () => {
  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <img
            src="https://www.royalcyber.com/wp-content/uploads/2018/04/Royal-Cyber-Logo.svg"
            alt="logo"
            className="w-[190px]"
          />
          <p className="text-gray-600">
            We are a team of designers and developers that create high quality
            theme.
          </p>
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-[23px] mb-[10px]">
            My Account
          </Label>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="font-normal text-[14px] relative pl-[10px] text-tp-text-2 text-footerSecondary"
              >
                Track Orders
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-normal text-[14px] relative pl-[10px] text-tp-text-2 text-footerSecondary"
              >
                Shipping
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-normal text-[14px] relative pl-[10px] text-tp-text-2 text-footerSecondary"
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-normal text-[14px] relative pl-[10px] text-tp-text-2 text-footerSecondary"
              >
                Order History
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-normal text-[14px] relative pl-[10px] text-tp-text-2 text-footerSecondary"
              >
                Returns
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-[23px] mb-[10px]">
            Information
          </Label>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="font-normal text-[14px] relative pl-[10px] text-tp-text-2 text-footerSecondary"
              >
                Our Story
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-normal text-[14px] relative pl-[10px] text-tp-text-2 text-footerSecondary"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-normal text-[14px] relative pl-[10px] text-tp-text-2 text-footerSecondary"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-normal text-[14px] relative pl-[10px] text-tp-text-2 text-footerSecondary"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-normal text-[14px] relative pl-[10px] text-tp-text-2 text-footerSecondary"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-[23px] mb-[10px]">
            Talk to Us
          </Label>
          <div className="mb-[20] flex flex-col">
            <span className="font-normal text-[14px] relative  text-tp-text-2 text-footerSecondary">
              Got Questions? Call us at
            </span>
            <Label className="font-medium text-[22px] text-customPurple">
              +670 413 90 762
            </Label>
          </div>
          <Label className="font-normal text-[16px] !mb-[15] leading-[20px] relative  text-tp-text-2 text-footerSecondary flex flex-col leading-[20px] flex flex-row items-end">
            <i
              className="fa fa-envelope mr-[7] b-customPurple"
              aria-hidden="true"
            ></i>
            royalcyber@support.com
          </Label>
          <Label className="font-normal text-[16px] relative text-tp-text-2 text-footerSecondary leading-[20px] flex flex-col">
            <span className="mb-[5]">
              <i
                className="fa fa-map-marker  mr-[7] b-customPurple"
                aria-hidden="true"
              ></i>
              79 Sleepy Hollow St,
            </span>{" "}
            <span className="ml-[18]"> Jamaica, New York 1432</span>
          </Label>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-4">
        <div className="container mx-auto flex justify-between">
          <p className="text-sm text-gray-500">
            &copy; 2024 Royal Cyber Inc. All Rights Reserved{" "}
          </p>
          <div className="flex space-x-4">
            <img
              src="https://shofy-client.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-pay.d72dda14.png&w=256&q=75"
              alt="Paypal"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footerComponent;
