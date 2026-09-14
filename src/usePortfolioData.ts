import { useEffect, useState } from "react";
import type { PortfolioData } from "./types";

interface FetchState {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches the section-wise JSON files concurrently (no waterfall) from
 * /data/*.json. Every request carries a `?v=<timestamp>` cache-buster so a
 * fresh upload to the S3 bucket is visible to visitors immediately, without
 * waiting on browser or CDN cache TTLs.
 */
export function usePortfolioData(): FetchState {
  const [state, setState] = useState<FetchState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const cacheBuster = Date.now();
    const base = import.meta.env.BASE_URL;

    const fetchJson = <T,>(file: string): Promise<T> =>
      fetch(`${base}data/${file}?v=${cacheBuster}`).then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${file} (${res.status})`);
        return res.json() as Promise<T>;
      });

    Promise.all([
      fetchJson<PortfolioData["profile"]>("profile.json"),
      fetchJson<PortfolioData["skills"]>("skills.json"),
      fetchJson<PortfolioData["experience"]>("experience.json"),
      fetchJson<PortfolioData["portfolioProjects"]>("portfolio.json"),
    ])
      .then(([profile, skills, experience, portfolioProjects]) => {
        if (cancelled) return;
        setState({
          data: { profile, skills, experience, portfolioProjects },
          loading: false,
          error: null,
        });
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setState({ data: null, loading: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
