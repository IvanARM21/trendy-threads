import { useMemo, useState } from "react";
import { EyeIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";
import { AlertMessage } from "@/interfaces/general.interface";
import { Alert } from "@/components/ui/Alert";

const allowedExtensions = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/avif",
];

interface Props {
  files: File[];
  images: string[];
  imagesDeleteFromDB?: string[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  openModal: () => void;
}

export const ImagesSelect = ({
  files,
  images,
  setFiles,
  openModal,
  imagesDeleteFromDB = [],
}: Props) => {
  const [dragEvent, setDragEvent] = useState(false);
  const [alert, setAlert] = useState<AlertMessage>({
    message: "",
    error: false,
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragEvent(false);
    const files = e.dataTransfer.files;
    if (!files || !files.length) {
      setAlert({ message: "No files selected", error: true });
      return;
    }
    console.log("From handle drop");
    handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.currentTarget.files;
    if (!files || !files.length) {
      setAlert({ message: "No files selected", error: true });
      return;
    }
    handleFiles(files);
  };

  const handleFiles = (newFilesList: FileList) => {
    const filesArray = Array.from(newFilesList);
    const newFiles = filesArray
      .map((file) => {
        if (allowedExtensions.includes(file.type)) {
          return file;
        }
        setAlert({
          message:
            "Some files aren't processed, because they do not use the required format",
        });
        return null;
      })
      .filter((a) => a !== null);

    setFiles([...files, ...newFiles]);
  };

  console.log(files);

  const totalImages = useMemo(
    () => files.length + images.length - imagesDeleteFromDB.length,
    [files, images, imagesDeleteFromDB]
  );

  return (
    <div
      className="flex flex-col gap-2"
      onDragEnter={() => setDragEvent(true)}
      onDragLeave={() => setDragEvent(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center">
        <label htmlFor="images" className="text-lg font-medium text-zinc-700">
          Product Images
        </label>
        <button
          className={twMerge(
            " bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full py-1 px-3 opacity-0 -translate-y-10 transition-all duration-300 flex items-center gap-2",
            totalImages > 0 && "opacity-100 translate-y-0"
          )}
          onClick={openModal}
          type="button"
        >
          <EyeIcon className="size-5 animate-pulse" />
          <span className="animate-pulse">Images: {totalImages}</span>
        </button>
      </div>
      <div
        className={twMerge(
          "h-40 w-full border border-gray-400 border-dashed rounded-xl relative transition-all duration-300",
          dragEvent && "border-indigo-600 scale-105"
        )}
      >
        <input
          type="file"
          id="images"
          multiple
          onChange={handleChange}
          className="absolute inset-0 opacity-0 z-10"
        />
        <div className="flex flex-col items-center justify-center absolute inset-0">
          <PhotoIcon className="size-12 text-zinc-400" />
          <p className="text-zinc-700 font-medium">
            <span className="text-indigo-600">Upload a file</span> or drag and
            drop
          </p>
          <p className="text-zinc-500 font-medium text-sm">
            PNG, JPG, up to 10mb
          </p>
        </div>
      </div>

      {alert.message.length ? <Alert {...alert} /> : <></>}
    </div>
  );
};
