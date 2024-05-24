// import Image from "next/image";
// import SearchCard from "./SearchCard";
// import Link from "next/link";
// import { cookies } from "next/headers";

// export default function SearchCartWishlist() {
//   const nextCookies = cookies();
//   const token = nextCookies.get("token").value;

//   return (
//     <div className="flex items-center justify-center gap-5 h-[100%]">
//       {token ? (
//         <SearchCard />
//       ) : (
//         <>
//           <div className="flex items-center justify-center gap-5 h-[100%]">
//             {/* search bar with icon */}
//             <div className="hidden lg:flex items-center justify-center h-[42px] w-fit bg-[#F5F4F4] rounded-[4px]">
//               <input
//                 className="font-andika tracking-[1px] flex items-center placeholder:text-sm h-full w-full border-none outline-none rounded-[4px] bg-[#F5F4F4] p-4"
//                 type="text"
//                 name="search-text"
//                 placeholder="What are you looking for?"
//               />
//               <div className="h-[25px] w-[25px] mr-3 flex items-center">
//                 <Image
//                   src="/assets/search.svg"
//                   alt="search logo"
//                   width={27}
//                   height={27}
//                 />
//               </div>
//             </div>

//             <div className="h-[100%] w-fit relative group flex items-center">
//               <Link
//                 className="underline align-center text-md font-semibold"
//                 href={"/auth/login"}>
//                 Login / Signup
//               </Link>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
