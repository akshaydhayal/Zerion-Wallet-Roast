"use client";

import { Github, Twitter, ExternalLink } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  const { themeConfig } = useTheme();

  return (
    <footer 
      className="mt-12"
      style={{ borderTopColor: themeConfig.colors.border }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm" style={{ color: themeConfig.colors.textSecondary }}>
              Built with ❤️ for <span className="font-semibold" style={{ color: themeConfig.colors.primary }}>Colosseum Cypherpunk Hackathon</span>
            </p>
            <p className="text-xs mt-1" style={{ color: themeConfig.colors.textSecondary }}>
              Powered by <a href="https://zerion.io" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80" style={{ color: themeConfig.colors.primary }}>Zerion API</a>
            </p>
          </div>

          <div className="flex items-center gap-6">
            
           
            
          </div>
        </div>
      </div>
    </footer>
  );
}

