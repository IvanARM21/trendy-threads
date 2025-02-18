import { Size, SizeForm } from "@/interfaces/product.interface";
import { SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  sizes: Size[];
  selectedSizes: SizeForm[];
  setSelectedSizes: React.Dispatch<SetStateAction<SizeForm[]>>;
}

export const SizeSelect = ({
  sizes,
  selectedSizes,
  setSelectedSizes,
}: Props) => {
  const handleSizeClick = (size: Size) => {
    if (selectedSizes.some((sizeState) => sizeState.id === size.id)) {
      const updatedSizes = selectedSizes.filter(
        (sizeState) => sizeState.id !== size.id
      );
      setSelectedSizes(updatedSizes);
      return;
    }
    const newSize = { ...size, stock: 0 };
    const updatedSizes = [...selectedSizes, newSize].sort(
      (a, b) => a.order - b.order
    );
    setSelectedSizes(updatedSizes);
  };

  const handleStockChange = (sizeId: string, stock: number) => {
    const updatedSizes = selectedSizes.map((size) => {
      if (size.id === sizeId) {
        return { ...size, stock };
      }
      return size;
    });
    setSelectedSizes(updatedSizes);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium text-zinc-700">Sizes</p>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <label
                key={`${size.id}`}
                className="relative"
                htmlFor={size.id}
                onClick={() => handleSizeClick(size)}
              >
                <span
                  className={twMerge(
                    "transition-colors relative overflow-hidden w-14 sm:w-16 h-10 sm:h-12 text-zinc-600 font-medium rounded-full border flex justify-center items-center hover:border-gray-400 hover:text-zinc-800 cursor-pointer",
                    selectedSizes.some(
                      (sizeState) => sizeState.id === size.id
                    ) &&
                      "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white"
                  )}
                >
                  {size.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium text-zinc-700">Stock</p>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <div className="relative" key={size.id}>
              <input
                id={size.id}
                placeholder={size.label}
                disabled={
                  !selectedSizes.some((sizeState) => sizeState.id === size.id)
                }
                value={
                  selectedSizes.find((selectSize) => selectSize.id === size.id)
                    ?.stock ?? ""
                }
                onInput={(e) => {
                  if (isNaN(+e.currentTarget.value)) {
                    return;
                  }
                  handleStockChange(size.id, +e.currentTarget.value);
                }}
                className={
                  "disabled:opacity-40 disabled:cursor-not-allowed text-center h-12 w-16 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-full border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                }
              />
              {selectedSizes.some((sizeState) => sizeState.id === size.id) && (
                <span className="absolute -top-1 -left-1 size-6 flex justify-center items-center rounded-full p-1 text-xs text-white bg-indigo-600">
                  {size.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
