import { useRouter } from "next/router";

export default function BackBtn() {
  const router = useRouter();

  return (
    <div
      className="border border-transparent rounded-full flex items-center justify-center hover:bg-gray-400 hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-10 hover:border-gray-100 transition-all duration-200 ease-linear px-2 py-2 back-btn cursor-pointer"
      onClick={(e) => {
        console.log(e.target);
        e.currentTarget.animate(
          [
            {
              scale: 1,
            },
            {
              scale: 0.9
            },
            {
              scale: 1,
            },
          ],
          {
            duration: 100,
            iterations: 1,
          }
        );
        router.back();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 flex items-center justify-center"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex items-center justify-center"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </div>
  );
}
