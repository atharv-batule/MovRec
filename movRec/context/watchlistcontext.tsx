import React, { createContext, useContext, useEffect, useState } from 'react';
import { Show } from '@/types/show';
import { fetchWatchlist } from '@/services/api';

type WatchlistContextType = {
  watchlist: Show[];
  loading: boolean;
  addToWatchlist: (show: Show) => void;
  removeFromWatchlist: (id: string) => void;
  refreshWatchlist: () => Promise<void>;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshWatchlist = async () => {
    try {
      setLoading(true);
      const data = await fetchWatchlist('1');
      setWatchlist(data.watchlist || []);
    } catch (error) {
      console.error('Failed to load watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = (show: Show) => {
    setWatchlist((prev) => {
      const exists = prev.some((item) => item.id === show.id);
      if (exists) return prev;
      return [...prev, show];
    });
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    refreshWatchlist();
  }, []);

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        loading,
        addToWatchlist,
        removeFromWatchlist,
        refreshWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error('useWatchlist must be used inside WatchlistProvider');
  }

  return context;
};

// Alias hook so you can keep using "saved" naming in UI
export const useSaved = () => {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error('useSaved must be used inside WatchlistProvider');
  }

  return {
    saved: context.watchlist,
    loading: context.loading,
    addToSaved: context.addToWatchlist,
    removeFromSaved: context.removeFromWatchlist,
    refreshSaved: context.refreshWatchlist,
  };
};