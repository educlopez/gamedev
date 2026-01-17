# Install Required Packages

✅ **Packages are already installed!**

The enhanced Game Boy effects are now enabled with:
- **GSAP** (v3.14.2) - Smooth animations for cartridge hover effects and scroll triggers
- **Three.js** (v0.182.0) - Pixelated background effects

If you need to reinstall them, use:

```bash
pnpm add gsap three @types/three
```

## What These Libraries Do

- **GSAP**: Provides smooth, performant animations for cartridge hover effects, page transitions, and scroll-triggered animations
- **Three.js**: Creates a subtle pixelated background effect that enhances the retro Game Boy aesthetic

After installation, the enhanced components will automatically work:
- `CartridgeSlot.tsx` - GSAP-powered smooth cartridge animations
- `GameBoyBackground.tsx` - Three.js pixelated background effect
- `GameBoyEffects.tsx` - GSAP scroll-triggered animations
