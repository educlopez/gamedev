import Image from "next/image"
import oicon from "@/images/tictactoe/o.png"
import xicon from "@/images/tictactoe/x.png"

export const Square = ({
  children,
  isSelected,
  updateBoard,
  index,
  isInteractive = true,
}) => {
  const className = `w-20 h-20 shadow-xl shadow-slate-900/10 rounded-md grid place-items-center text-4xl ${
    isSelected
      ? "bg-gameboy-100 ring-gameboy-900  ring-inset ring-2"
      : "bg-gameboy-100"
  }`

  const handleClick = () => {
    if (isInteractive) {
      updateBoard(index)
    }
  }

  return (
    <div onClick={handleClick} className={className}>
      {children === "X" ? (
        <Image src={xicon} alt="symbol" width={50} height={50} />
      ) : children === "O" ? (
        <Image src={oicon} alt="symbol" width={50} height={50} />
      ) : (
        children
      )}
    </div>
  )
}
