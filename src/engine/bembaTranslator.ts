function translateSentencePattern(
  text: string
): string | undefined {
  const normalized =
    normalize(
      expandContractions(text)
    );

  /*
   * ==========================================================
   * IMPORTANT PHRASES
   * ==========================================================
   */

  const important =
    importantPhrases.get(normalized);

  if (important) {
    return important;
  }

  /*
   * ==========================================================
   * EXPLICIT HIGH-CONFIDENCE PATTERNS
   * ==========================================================
   */

  for (const item of directPatterns) {
    const match =
      normalized.match(item.pattern);

    if (!match) {
      continue;
    }

    if (
      typeof item.result === "string"
    ) {
      return item.result;
    }

    const result =
      item.result(match);

    if (result) {
      return result;
    }
  }

  /*
   * ==========================================================
   * COMMON HUMAN SUBJECTS
   * ==========================================================
   *
   * These must be checked BEFORE the generic
   * word-by-word dictionary translation.
   *
   * Otherwise a dictionary entry such as:
   *
   * people -> chikala
   *
   * can cause:
   *
   * people are sick
   *
   * to become:
   *
   * chikala ...
   *
   * instead of using the grammatical Bemba subject:
   *
   * abantu balwala
   */

  const pluralPeople =
    normalized.match(
      /^(people|persons|humans)\s+(?:are|were)\s+(.+)$/
    );

  if (pluralPeople) {
    const condition =
      pluralPeople[1] === "people"
        ? pluralPeople[2]
        : pluralPeople[2];

    /*
     * Known health/condition patterns.
     */

    if (
      condition === "sick" ||
      condition === "ill" ||
      condition === "unwell"
    ) {
      return "Abantu balwala";
    }

    /*
     * Try a Bemba verb root.
     */

    const root =
      getVerbRoot(condition);

    if (root) {
      return `Abantu bale${root}`;
    }

    /*
     * Try a normal dictionary adjective/noun.
     */

    const translation =
      lookupEnglish(condition);

    if (translation) {
      return `Abantu bali ${translation}`;
    }
  }

  /*
   * ==========================================================
   * PEOPLE + VERB
   * ==========================================================
   */

  const peopleVerb =
    normalized.match(
      /^(people|persons|humans)\s+(.+)$/
    );

  if (peopleVerb) {
    let rest =
      peopleVerb[2];

    /*
     * Remove English auxiliary verbs.
     */

    rest =
      rest
        .replace(
          /^(are|were|do|does|did|will|can|must)\s+/,
          ""
        )
        .trim();

    if (rest) {
      const verbWords =
        rest.split(" ");

      const verb =
        verbWords[0];

      /*
       * People are equivalent to
       * a plural "they" subject.
       */

      const conjugated =
        conjugatePresent(
          "they",
          verb
        );

      if (conjugated) {
        const objectWords =
          verbWords.slice(1);

        if (
          objectWords.length
        ) {
          const object =
            translateObject(
              objectWords.join(" ")
            );

          if (object) {
            return `${conjugated} ${object}`;
          }
        }

        return conjugated;
      }
    }
  }

  /*
   * ==========================================================
   * PEOPLE ARE + ADJECTIVE
   * ==========================================================
   */

  const peopleAre =
    normalized.match(
      /^(people|persons|humans)\s+are\s+(.+)$/
    );

  if (peopleAre) {
    const value =
      peopleAre[2];

    /*
     * Special known condition.
     */

    if (
      value === "sick" ||
      value === "ill" ||
      value === "unwell"
    ) {
      return "Abantu balwala";
    }

    const root =
      getVerbRoot(value);

    if (root) {
      return `Abantu bale${root}`;
    }

    const translation =
      lookupEnglish(value);

    if (translation) {
      return `Abantu bali ${translation}`;
    }
  }

  /*
   * ==========================================================
   * I + VERB
   * ==========================================================
   */

  const iVerb =
    normalized.match(
      /^i\s+(.+)$/
    );

  if (iVerb) {
    let rest =
      iVerb[1];

    rest =
      rest
        .replace(
          /^(am|do|does|will|can|must)\s+/,
          ""
        )
        .trim();

    const verbWords =
      rest.split(" ");

    const verb =
      verbWords[0];

    const conjugated =
      conjugatePresent(
        "i",
        verb
      );

    if (conjugated) {
      const objectWords =
        verbWords.slice(1);

      if (
        objectWords.length
      ) {
        const object =
          translateObject(
            objectWords.join(" ")
          );

        if (object) {
          return `${conjugated} ${object}`;
        }
      }

      return conjugated;
    }
  }

  /*
   * ==========================================================
   * YOU + VERB
   * ==========================================================
   */

  const youVerb =
    normalized.match(
      /^you\s+(.+)$/
    );

  if (youVerb) {
    let rest =
      youVerb[1];

    rest =
      rest
        .replace(
          /^(are|do|does|will|can|must)\s+/,
          ""
        )
        .trim();

    const verbWords =
      rest.split(" ");

    const verb =
      verbWords[0];

    const conjugated =
      conjugatePresent(
        "you",
        verb
      );

    if (conjugated) {
      const objectWords =
        verbWords.slice(1);

      if (
        objectWords.length
      ) {
        const object =
          translateObject(
            objectWords.join(" ")
          );

        if (object) {
          return `${conjugated} ${object}`;
        }
      }

      return conjugated;
    }
  }

  /*
   * ==========================================================
   * HE / SHE + VERB
   * ==========================================================
   */

  const thirdPerson =
    normalized.match(
      /^(he|she)\s+(.+)$/
    );

  if (thirdPerson) {
    const subject =
      thirdPerson[1];

    let rest =
      thirdPerson[2];

    rest =
      rest
        .replace(
          /^(is|does|will|can|must)\s+/,
          ""
        )
        .trim();

    const verbWords =
      rest.split(" ");

    const verb =
      verbWords[0];

    const conjugated =
      conjugatePresent(
        subject,
        verb
      );

    if (conjugated) {
      const objectWords =
        verbWords.slice(1);

      if (
        objectWords.length
      ) {
        const object =
          translateObject(
            objectWords.join(" ")
          );

        if (object) {
          return `${conjugated} ${object}`;
        }
      }

      return conjugated;
    }
  }

  /*
   * ==========================================================
   * WE + VERB
   * ==========================================================
   */

  const weVerb =
    normalized.match(
      /^we\s+(.+)$/
    );

  if (weVerb) {
    let rest =
      weVerb[1];

    rest =
      rest
        .replace(
          /^(are|do|does|will|can|must)\s+/,
          ""
        )
        .trim();

    const verbWords =
      rest.split(" ");

    const verb =
      verbWords[0];

    const conjugated =
      conjugatePresent(
        "we",
        verb
      );

    if (conjugated) {
      const objectWords =
        verbWords.slice(1);

      if (
        objectWords.length
      ) {
        const object =
          translateObject(
            objectWords.join(" ")
          );

        if (object) {
          return `${conjugated} ${object}`;
        }
      }

      return conjugated;
    }
  }

  /*
   * ==========================================================
   * THEY + VERB
   * ==========================================================
   */

  const theyVerb =
    normalized.match(
      /^they\s+(.+)$/
    );

  if (theyVerb) {
    let rest =
      theyVerb[1];

    rest =
      rest
        .replace(
          /^(are|do|does|will|can|must)\s+/,
          ""
        )
        .trim();

    /*
     * Special plural condition.
     */

    if (
      rest === "sick" ||
      rest === "ill" ||
      rest === "unwell"
    ) {
      return "Balwala";
    }

    const verbWords =
      rest.split(" ");

    const verb =
      verbWords[0];

    const conjugated =
      conjugatePresent(
        "they",
        verb
      );

    if (conjugated) {
      const objectWords =
        verbWords.slice(1);

      if (
        objectWords.length
      ) {
        const object =
          translateObject(
            objectWords.join(" ")
          );

        if (object) {
          return `${conjugated} ${object}`;
        }
      }

      return conjugated;
    }
  }

  /*
   * ==========================================================
   * I AM + ADJECTIVE / CONDITION
   * ==========================================================
   */

  const iAm =
    normalized.match(
      /^i am (.+)$/
    );

  if (iAm) {
    const value =
      iAm[1];

    if (
      value === "sick" ||
      value === "ill" ||
      value === "unwell"
    ) {
      return "Ndelwala";
    }

    const root =
      getVerbRoot(value);

    if (root) {
      return `Nde${root}`;
    }

    const translation =
      lookupEnglish(value);

    if (translation) {
      return `Ndi ${translation}`;
    }
  }

  /*
   * ==========================================================
   * YOU ARE + ADJECTIVE
   * ==========================================================
   */

  const youAre =
    normalized.match(
      /^you are (.+)$/
    );

  if (youAre) {
    const value =
      youAre[1];

    if (
      value === "sick" ||
      value === "ill" ||
      value === "unwell"
    ) {
      return "Walwala";
    }

    const root =
      getVerbRoot(value);

    if (root) {
      return `Ule${root}`;
    }

    const translation =
      lookupEnglish(value);

    if (translation) {
      return `Uli ${translation}`;
    }
  }

  /*
   * ==========================================================
   * HE / SHE IS
   * ==========================================================
   */

  const heSheIs =
    normalized.match(
      /^(he|she) is (.+)$/
    );

  if (heSheIs) {
    const value =
      heSheIs[2];

    if (
      value === "sick" ||
      value === "ill" ||
      value === "unwell"
    ) {
      return "Alwala";
    }

    const root =
      getVerbRoot(value);

    if (root) {
      return `Ale${root}`;
    }

    const translation =
      lookupEnglish(value);

    if (translation) {
      return `Ali ${translation}`;
    }
  }

  return undefined;
}
