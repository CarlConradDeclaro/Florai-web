import { PlantItemProps } from "@/Interface/Plant";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import edit from "../../assest/edit.png";
import trash from "../../assest/trash.png";
import { Modal } from "../Modal";
import { useRouter } from "next/navigation";

export default function PlantItem({
  plantId,
  img,
  common_name,
  category,
  onDeletePlant,
}: PlantItemProps) {
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/update/${plantId}`);
  };

  return (
    <div className="grid grid-cols-4 items-center p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
          <Image
            src={img}
            alt={common_name}
            width={500} // aspect ratio width
            height={500} // aspect ratio height
            layout="responsive" // allows responsive resizing
            className="w-full h-full object-cover"
            onClick={() => setOpenModal(true)}
          />
        </div>
      </div>
      <div className="font-bold text-gray-800">{common_name}</div>
      <div className="text-gray-600 font-bold">{category}</div>
      <div className="flex gap-2 justify-center">
        <button
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Edit plant"
          onClick={handleUpdate}
        >
          <Image
            width={500}
            height={500}
            src={edit}
            alt="Edit"
            className="w-[25px] h-[25px] cursor-pointer"
          />
        </button>
        <button
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={onDeletePlant}
          aria-label="Delete plant"
        >
          <Image
            width={500}
            height={500}
            src={trash}
            alt="Delete"
            className="w-[30px] h-[30px] cursor-pointer"
          />
        </button>
      </div>

      {openModal && (
        <Modal imageUrl={img} onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
}
