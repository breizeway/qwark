import { FOUR_LETTER_WORDS, ID_WORD_COUNT } from "./constants";

export const getReadableId = (): string => {
  const words: string[] = [];

  for (let i = ID_WORD_COUNT; i--; i > 0) {
    const word =
      FOUR_LETTER_WORDS.at(
        Math.round(Math.random() * FOUR_LETTER_WORDS.length - 1)
      ) ?? "";
    words.push(word);
  }

  return words.join("-");
};
