import { mockPromos } from "@/data/mock";
import type { Promo } from "@/types";

/**
 * No backend `/promos` or `/banners` endpoint exists today (Round 2 finding).
 * The closest signal is `/challenges/`. Until product decides whether the
 * homepage promo card pulls from challenges or stays static, we serve the
 * frontend mock.
 */
export const promosService = {
  list: async (): Promise<Promo[]> => {
    return mockPromos;
  },
};
