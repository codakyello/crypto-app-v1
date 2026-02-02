import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Alpha Coin Platform',
  projectId: 'YOUR_PROJECT_ID', // TODO: User should replace this, but it works for dev often or falls back
  chains: [bsc],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
