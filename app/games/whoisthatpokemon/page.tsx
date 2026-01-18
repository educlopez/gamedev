"use client";

import confetti from "canvas-confetti";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import DialogBox from "@/components/DialogBox";
import { Retrobutton } from "@/components/RetroBtn";
import { Text } from "@/components/Text";

type Pokemon = {
  id: number;
  name: string;
};

const ALL_POKEMON_GUESSED_MESSAGE =
  "All Pokémons have been guessed, congratulations!";
const MAX_CORRECT_GUESSES = 10;

export default function Whoisthatpokemon() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [guessMessage, setGuessMessage] = useState("");
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pokemonNameLetters, setPokemonNameLetters] = useState<string[]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const fetchPokemon = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
        cache: "force-cache",
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }
      const data = await res.json();
      const pokemonData = data.results
        .filter(
          (p: { name: string }) => !pokemonList.includes(p.name.toLowerCase())
        )
        .map((p: { url: string }) => p.url);

      if (!pokemonData.length) {
        setGuessMessage(ALL_POKEMON_GUESSED_MESSAGE);
        setIsLoading(false);
        return;
      }

      const randomPokemon =
        pokemonData[Math.floor(Math.random() * pokemonData.length)];
      const pokemonRes = await fetch(randomPokemon);
      if (!pokemonRes.ok) {
        throw new Error(`Failed to fetch pokemon: ${pokemonRes.statusText}`);
      }
      const pokemonInfo = await pokemonRes.json();
      setPokemonNameLetters(Array(pokemonInfo.name.length).fill(""));
      setPokemon(pokemonInfo);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [pokemonList]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  const handleLetterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = e.target.value;
      if (!/^[a-z-]$/i.test(value) && value !== "") return;

      setPokemonNameLetters((prev) => {
        const newLetters = [...prev];
        newLetters[index] = value;
        return newLetters;
      });

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!pokemon) return;

      const userGuess = pokemonNameLetters.join("");
      if (userGuess.toLowerCase() === pokemon.name.toLowerCase()) {
        const newCorrectGuesses = correctGuesses + 1;
        setGuessMessage("Correct! You won!");
        setPokemonList((prev) => [...prev, pokemon.name]);
        setCorrectGuesses(newCorrectGuesses);

        if (newCorrectGuesses === MAX_CORRECT_GUESSES) {
          setGuessMessage(
            "You have guessed 10 correct Pokémon. Congratulations!"
          );
          confetti({
            particleCount: 200,
            spread: 80,
            colors: ["#8D9571", "#1F1F1F", "#4E533E"],
          });
        }
      } else {
        setGuessMessage("Incorrect. Try again.");
      }

      setPokemonNameLetters(Array(pokemon.name.length).fill(""));
      inputRefs.current[0]?.focus();
    },
    [pokemon, pokemonNameLetters, correctGuesses]
  );

  const isAllowedKey = useCallback((key: string) => {
    const allowedKeys = ["Backspace", "Delete", "Tab", "Enter"];
    return /^[a-z-]$/i.test(key) || allowedKeys.includes(key) || key === "Meta";
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (!isAllowedKey(e.key)) {
        e.preventDefault();
      }

      if (["Backspace", "Delete"].includes(e.key) && index > 0) {
        setPokemonNameLetters((prev) => {
          const newLetters = [...prev];
          newLetters[index - 1] = "";
          return newLetters;
        });
        inputRefs.current[index - 1]?.focus();
      }
    },
    [isAllowedKey]
  );

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }, []);

  const resetGame = useCallback(() => {
    setPokemonList([]);
    setGuessMessage("");
    setCorrectGuesses(0);
    setPokemonNameLetters([]);
    inputRefs.current[0]?.focus();
  }, []);

  const showAllGuessedMessage = useMemo(
    () => guessMessage === ALL_POKEMON_GUESSED_MESSAGE,
    [guessMessage]
  );

  const showMaxGuessesMessage = useMemo(
    () => correctGuesses === MAX_CORRECT_GUESSES,
    [correctGuesses]
  );

  const pokemonImageUrl = useMemo(() => {
    if (showMaxGuessesMessage) {
      return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/25.png";
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${pokemon?.id}.png`;
  }, [pokemon?.id, showMaxGuessesMessage]);

  if (error) {
    return (
      <>
        <Text
          as="h2"
          className="fade-down-ct"
          size="h2"
          title="Who's that pokemon"
        />
        <DialogBox
          as="p"
          className="w-auto text-center text-gameboy-900"
          message={`Error: ${error}`}
        />
      </>
    );
  }

  return (
    <>
      <Text
        as="h2"
        className="fade-down-ct"
        size="h2"
        title="Who's that pokemon"
      />
      <section className="my-10 flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center">
          {pokemon?.name ? (
            <>
              <Image
                alt={
                  showMaxGuessesMessage
                    ? "Pikachu celebration sprite"
                    : "Pokemon sprite to guess"
                }
                height={96}
                src={pokemonImageUrl}
                unoptimized
                width={96}
              />
              <div>
                {showAllGuessedMessage || showMaxGuessesMessage ? (
                  <div>
                    <p className="text-center text-gameboy-900">
                      {guessMessage}
                    </p>
                    <div className="mt-6 flex justify-center">
                      <Retrobutton onClick={resetGame}>Reset Game</Retrobutton>
                    </div>
                  </div>
                ) : (
                  <form
                    className="flex flex-col items-center gap-5"
                    onSubmit={handleSubmit}
                  >
                    <div
                      aria-label="Pokemon name letters"
                      className="flex flex-row gap-2 rounded-lg border-4 border-gameboy-900 bg-gameboy-200 p-3 shadow-[0_4px_8px_rgba(7,24,33,0.3)]"
                      role="group"
                    >
                      {pokemonNameLetters.map((letter, index) => (
                        <input
                          aria-label={`Letter ${index + 1} of ${pokemonNameLetters.length}`}
                          className="h-10 w-10 border-4 border-gameboy-900 bg-gameboy-100 p-1 text-center font-bold text-gameboy-900 text-lg shadow-[inset_2px_2px_0_var(--color-gameboy-200),inset_-2px_-2px_0_var(--color-gameboy-700)] transition-all placeholder:text-gameboy-700 focus:outline-none focus:ring-2 focus:ring-gameboy-400 focus:ring-offset-1 md:h-12 md:w-12 md:p-2 md:text-xl"
                          key={index}
                          maxLength={1}
                          onChange={(e) => handleLetterChange(e, index)}
                          onFocus={handleFocus}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          placeholder="?"
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          type="text"
                          value={letter}
                        />
                      ))}
                    </div>
                    <Retrobutton type="submit">Guess</Retrobutton>
                  </form>
                )}
              </div>
              <DialogBox className="w-auto text-center">
                <p className="my-4 text-center text-gameboy-900 text-xs">
                  Remember, if a pokemon have spaces in her name use `-`
                </p>
                <p className="mb-4 text-center text-gameboy-900">
                  Correct Guesses: {correctGuesses} / {MAX_CORRECT_GUESSES}
                </p>
                {correctGuesses > 0 && (
                  <div className="mt-10 grid grid-flow-row grid-cols-5 justify-items-center gap-5">
                    {pokemonList.map((pokemonName) => (
                      <Image
                        alt={`${pokemonName} sprite`}
                        height={36}
                        key={pokemonName}
                        src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemonName}.png`}
                        width={48}
                      />
                    ))}
                  </div>
                )}
              </DialogBox>
            </>
          ) : (
            <DialogBox
              as="p"
              className="w-auto text-center text-gameboy-900"
              message={isLoading ? "Loading..." : "No pokemon available"}
            />
          )}
        </div>
      </section>
    </>
  );
}
