import Link from "@/images/memo/link.png"
import Luigi from "@/images/memo/luigi.png"
import Mario from "@/images/memo/mario.png"
import Pacman from "@/images/memo/pacman.png"
import Phantom from "@/images/memo/phantom.png"
import Qbert from "@/images/memo/qbert.png"
import Spaceinvader from "@/images/memo/spaceinvader.png"
import Voltorb from "@/images/memo/voltorb.png"

export const cards = [
  Voltorb,
  Link,
  Mario,
  Pacman,
  Phantom,
  Qbert,
  Spaceinvader,
  Luigi,
]

const flatCards = cards.flatMap((image) => [`a|${image.src}`, `b|${image.src}`])
export const IMAGES = flatCards.sort(() => Math.random() - 0.5)
