"use client";
import {
  availableLanguageTags,
  AvailableLanguageTag,
  languageTag,
} from "@/paraglide/runtime";
import { usePathname, useRouter } from "@/lib/i18n";

export function SelectLanguage() {
  const pathname = usePathname();
  const router = useRouter();

  const labels: Record<AvailableLanguageTag, string> = {
    en: "🇬🇧 English",
    de: "🇩🇪 Deutsch",
    nl: "🇳🇱 Nederlands",
    it: "🇮🇹 Italiano",
    fr: "🇫🇷 Français",
    es: "🇪🇸 Español",
    ru: "🇷🇺 Русский",
  };

  return (
    <select
      value={languageTag()}
      onChange={(e) =>
        router.push(pathname, {
          locale: e.target.value as AvailableLanguageTag,
        })
      }
    >
      {availableLanguageTags.map((lang) => (
        <option key={lang} value={lang}>
          {labels[lang]}
        </option>
      ))}
    </select>
  );
}
