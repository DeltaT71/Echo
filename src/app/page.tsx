import AddPost from "./components/AddPost";
import Feed from "./components/Feed";
import LeftMenu from "./components/LeftMenu";
import RightMenu from "./components/RightMenu";
import Stories from "./components/Stories";

export default function Home() {
  return (
    <div className="flex gap-6 h-200 pt-6">
      {/* Left Side */}
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home"></LeftMenu>
      </div>
      {/* Center/Main Content */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories></Stories>
          <AddPost></AddPost>
          <Feed></Feed>
        </div>
      </div>
      {/* Right Side */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu></RightMenu>
      </div>
    </div>
  );
}
