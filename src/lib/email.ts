"use client";

import { useEffect, useRef, useState } from "react";

// The contact address is kept out of the page until someone clicks for it. It's stored in
// pieces, each reversed, so neither the HTML nor the JavaScript bundle contains anything that
// looks like an address, and scrapers that search pages for addresses find nothing. A bot that
// runs the page and clicks the button can still read it; nothing a person can see is safe
// from that.
const PARTS = ["nesnetrom.sunitraM", "moc.liamg"];

const unreverse = (part: string) => [...part].reverse().join("");

export function getEmail(): string {
  return `${unreverse(PARTS[0])}@${unreverse(PARTS[1])}`;
}

/**
 * State for a "Show email" control. `reveal` returns the address for actions that use it
 * straight away (copy, compose); `revealAndFocus` also moves focus to the link that replaces
 * the button, so keyboard users don't lose their place.
 */
export function useEmailReveal() {
  const [email, setEmail] = useState<string | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const focusOnReveal = useRef(false);

  useEffect(() => {
    if (email && focusOnReveal.current) {
      focusOnReveal.current = false;
      linkRef.current?.focus();
    }
  }, [email]);

  const reveal = () => {
    const address = getEmail();
    setEmail(address);
    return address;
  };

  const revealAndFocus = () => {
    focusOnReveal.current = true;
    reveal();
  };

  return { email, linkRef, reveal, revealAndFocus };
}
