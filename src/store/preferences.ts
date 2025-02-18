import { create } from "zustand";
import { persist } from "zustand/middleware";


interface UserPreferences {
    smallSidebar: boolean;
}
  

interface PreferencesStore {
    preferences: UserPreferences | null;
    setPreferences: (preferences: UserPreferences) => void;
    toggleSidebar: (e : KeyboardEvent) => void;
}

const usePreferencesStore = create<PreferencesStore>()(
    persist(
        (set) => ({
            preferences: null,
            setPreferences: (preferences) => set({ preferences }),
            toggleSidebar: (e) => {
                if(e.altKey && e.key === "h") {
                    e.preventDefault();
                    set((state) => ({ preferences: { smallSidebar: !state.preferences?.smallSidebar } }));
                }
            }
        }),
        {
            name: "user-preferences",
        }
    )
);

export { usePreferencesStore };