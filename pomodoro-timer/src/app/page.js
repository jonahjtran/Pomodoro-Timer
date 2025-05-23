import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#ffedbf] min-h-screen w-full flex items-center justify-center space-x-4">
      <button className="bg-[#ffcd74] items-center text-center flex justify-center h-16 w-40 text-lg rounded-md p-4 text-white font-bold hover:bg-[#ffbd55] transition-colors duration-200">Start</button>
      <button className="bg-[#ffcd74] items-center text-center flex justify-center h-16 w-40 text-lg rounded-md p-4 text-white font-bold hover:bg-[#ffbd55] transition-colors duration-200">Reset</button>
    </div>
  );
}