import { FOUR_LETTER_WORDS, ID_WORD_COUNT } from "./constants";

export const generateInstance = (): string => {
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

export const getInstance = (url: URL): string | null => {
  return url.searchParams.get("instance");
};
