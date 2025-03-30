import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function SideMenu() {

  const pathname = usePathname()
  const linkItems = [
    { url: "/", icon: "mdi-light:home" },
    { url: "/t", icon: "mdi-light:book" },
    { url: "/r", icon: "line-md:cog-loop" },
    { url: "/e", icon: "svg-spinners:clock" },
  ];

  return (
    <div className="h-screen w-[5%] top-0 flex flex-col items-center justify-center  fixed">
      <div className="flex flex-col justify-between p-[2px]  w-[100%] h-[95%] dark:bg-black border-r border-r-[grey] bg-white  ">
        {/* xxxxxxxxxxx */}

        <div className="logo text-[3rem] flex items-center  justify-center ">
          <Icon icon="mdi-light:home" />
        </div>

        <div className="middleIcons mb-[5rem] flex flex-col items-center gap-[2rem] text-[1.7rem] ">
          {linkItems.map((item, index) => (
            <Link href={item.url} key={index} className={`${pathname == item.url ? "bg-[#cf3c3c]" : ''} p-[2px] rounded-[30px] flex items-center justify-center content-center`}>
              <Icon icon={item.icon} />
            </Link>
          ))}
        </div> 

        {/* xxxxxxxxxxx */}

        <div className="bottomIcon   w-full h-[30px] flex items-center justify-center content-center ">
          <div className=" bg-[black] light:bg-[white] dark:bg-[#2e2e2e]  cursor-pointer w-[30px] rounded-full h-full overflow-hidden flex items-center justify-center">
            <span className="w-[16px] h-[2px] dark:bg-[white] !bg-[black] absolute after:content-[''] after:w-[13px] after:h-[2px] after:!bg-[black] after:mt-[6px] after:absolute      before:content-[''] before:w-[10px] before:h-[2px] before:bg-[black] before:-mt-[6px] before:absolute  "></span>
          </div>
        </div>

        {/* xxxxxxxxxxx */}
      </div>
    </div>
  );
}
