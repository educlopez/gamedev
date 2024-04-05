import { CircleIcon, CrossIcon } from "@/components/Icons"

export const Square = ({
  children,
  isSelected,
  updateBoard,
  index,
  isInteractive = true,
}) => {
  const className = `w-20 h-20 grid place-items-center text-4xl bg-gameboy-100 ring-gameboy-900  ring-inset  ${
    isSelected ? "ring-4" : "ring-2"
  }`

  const handleClick = () => {
    if (isInteractive) {
      updateBoard(index)
    }
  }

  return (
    <div onClick={handleClick} className={className}>
      {children === "X" ? (
        <CrossIcon className="w-10" />
      ) : children === "O" ? (
        <CircleIcon className="w-10" />
      ) : (
        children
      )}
    </div>
  )
}
