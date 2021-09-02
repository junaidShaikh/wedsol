import { PhantomProvider } from 'ts/interfaces/phantom.interface';

export const getProvider = (): PhantomProvider | undefined => {
  if ('solana' in window) {
    const provider = (window as any).solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
};
