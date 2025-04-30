import Image, { StaticImageData } from "next/image";

const How_It_Works_Card = ({
  image,
  title,
  description,
}: {
  image: StaticImageData;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-[400px] ">
      <div className="w-13 h-13 rounded-full bg-[#81C784] flex items-center justify-center">
        <Image src={image} alt="img" />
      </div>
      <h3 className="mt-5">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default How_It_Works_Card;
