import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support - Recoverly',
  description: 'Get help and support for Recoverly services',
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
