"use client";

import confetti from "canvas-confetti";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import DialogBox from "@/components/DialogBox";
import { Retrobutton } from "@/components/RetroBtn";
import { Text } from "@/components/Text";

type Pokemon = {
  id: number;
  name: string;
};

export default function Whoisthatpokemon() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [userGuess, setUserGuess] = useState("");
  const [guessMessage, setGuessMessage] = useState("");
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pokemonNameLetters, setPokemonNameLetters] = useState<string[]>([]);

  const fetchPokemon = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
        cache: "force-cache",
      });
      const data = await res.json();
      const pokemonData = data.results
        .filter(
          (p: { name: string }) => !pokemonList.includes(p.name.toLowerCase())
        )
        .map((p: { url: string }) => p.url);

      if (!pokemonData.length) {
        setGuessMessage("All Pokémons have been guessed, congratulations!");
        return;
      }

      const randomPokemon =
        pokemonData[Math.floor(Math.random() * pokemonData.length)];
      const pokemonRes = await fetch(randomPokemon);
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

  const handleLetterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newLetters = [...pokemonNameLetters];
    newLetters[index] = e.target.value;
    setPokemonNameLetters(newLetters);
    const inputs = document.querySelectorAll("input");
    if (index < inputs.length - 1) {
      inputs[index + 1].focus();
    } else {
      const submitBtn = document.querySelector(
        "button[type=submit]"
      ) as HTMLButtonElement;
      submitBtn?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pokemon) return;
    const userGuess = pokemonNameLetters.join("");
    const inputs = document.querySelectorAll("input");
    if (userGuess.toLowerCase() === pokemon.name.toLowerCase()) {
      setGuessMessage("Correct! You won!");
      setPokemonList([...pokemonList, pokemon.name]);
      setCorrectGuesses(correctGuesses + 1);
      inputs[0]?.focus();
      if (correctGuesses + 1 === 10) {
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
      inputs[0]?.focus();
    }
    setPokemonNameLetters(Array(pokemon.name.length).fill(""));
  };

  const isAllowedKey = (key: string) => {
    const allowedKeys = ["Backspace", "Delete", "Tab", "Enter"];
    return (
      /^[a-z-]{1}$/i.test(key) || allowedKeys.includes(key) || key === "Meta"
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isAllowedKey(e.key)) {
      e.preventDefault();
    }

    if (["Backspace", "Delete"].includes(e.key)) {
      const inputs = document.querySelectorAll("input");
      const index = Array.from(inputs).indexOf(e.target as HTMLInputElement);
      if (index > 0) {
        (inputs[index - 1] as HTMLInputElement).value = "";
        (inputs[index - 1] as HTMLInputElement).focus();
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const resetGame = () => {
    setPokemonList([]);
    setGuessMessage("");
    setUserGuess("");
    setCorrectGuesses(0);
  };

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
              {correctGuesses !== 10 ? (
                <Image
                  alt="pokemon sprite"
                  height={96}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${pokemon.id}.png`}
                  unoptimized
                  width={96}
                />
              ) : (
                <Image
                  alt="pokemon sprite"
                  height={96}
                  src={
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/25.png"
                  }
                  unoptimized
                  width={96}
                />
              )}
              <div>
                {guessMessage ===
                "All pokemons have been guessed, congratulations!" ? (
                  <div>
                    <p className="text-center text-gameboy-900">
                      {guessMessage}
                    </p>
                    <div className="mt-6 flex justify-center">
                      <Retrobutton onClick={resetGame}>Reset Game</Retrobutton>
                    </div>
                  </div>
                ) : correctGuesses === 10 ? (
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
                    <div className="flex flex-row gap-2">
                      {pokemonNameLetters.map((letter, index) => (
                        <input
                          className="h-8 w-8 border-gameboy-900 border-b-2 bg-gameboy-100 p-1 text-center text-gameboy-900 text-sm transition placeholder:text-gameboy-700 md:h-10 md:w-10 md:p-3"
                          key={index}
                          maxLength={1}
                          onChange={(e) => handleLetterChange(e, index)}
                          onFocus={handleFocus}
                          onKeyDown={handleKeyDown}
                          placeholder="?"
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
                  Correct Guesses: {correctGuesses} / 10
                </p>
                {correctGuesses > 0 && (
                  <div className="mt-10 grid grid-flow-row grid-cols-5 justify-items-center gap-5">
                    {pokemonList.map((pokemon) => {
                      return (
                        <Image
                          alt={pokemon}
                          height={36}
                          key={pokemon}
                          src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemon}.png`}
                          width={48}
                        />
                      );
                    })}
                  </div>
                )}
              </DialogBox>
            </>
          ) : (
            <DialogBox
              as="p"
              className="w-auto text-center text-gameboy-900"
              message="Loading..."
            />
          )}
        </div>
      </section>
    </>
  );
}
