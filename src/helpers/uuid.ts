import { FOUR_LETTER_WORDS, UUID_WORD_COUNT } from "../contants/uuid";

export const getNaturalUuid = (): string => {
  const words: string[] = [];

  for (let i = UUID_WORD_COUNT; i--; i > 0) {
    const word =
      FOUR_LETTER_WORDS.at(
        Math.round(Math.random() * FOUR_LETTER_WORDS.length - 1)
      ) ?? "";
    words.push(word);
  }

  return words.join("-");
};
