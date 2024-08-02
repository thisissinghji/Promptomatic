"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
const PromptCard = ({ prompt, handleTagClick, handleDelete, handleEdit }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const  router = useRouter();
  const [copy, setCopy] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopy(prompt.prompt);
    setTimeout(() => {
      setCopy("");
    }, 5000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex items-center justify-start gap-3 cursor-pointer">
          <Image
            src={prompt.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold font-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-gray-500 text-sm ">
              {prompt.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copy === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="font-inter text-sm orange_gradient cursor-pointer"
        onClick={() => handleTagClick(prompt.tag)}
      >
        {prompt.tag}
      </p>

      {session?.user?.id === prompt.creator._id && pathName === "/profile" && (
        <div className="flex flex-row gap-5 mt-3 flex-end border-t border-gray-200 pt-3">
          <p 
          className="font-inter text-sm green_gradient cursor-pointer hover:text-green-500"
          onClick={handleEdit}
          >
            Edit
          </p>
          <p 
          className="font-inter text-sm blue_gradient cursor-pointer hover:text-red-500"
          onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
