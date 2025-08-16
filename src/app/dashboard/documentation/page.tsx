import { FileText, BookOpen, Code, Video, Download, Search } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Documentation - Recoverly',
  description: 'Documentation and resources for Recoverly services',
};

export default function DocumentationPage() {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#141414] rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documentation</h1>
            <p className="text-gray-600 dark:text-gray-400">Guides and resources to help you get the most out of Recoverly</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-[#1a1a1a] placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search documentation..."
            />
          </div>
        </div>

        {/* Getting Started Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Getting Started</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gettingStarted.map((item, index) => (
              <DocumentationCard key={index} {...item} />
            ))}
          </div>
        </section>

        {/* Guides Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Guides</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((item, index) => (
              <DocumentationCard key={index} {...item} />
            ))}
          </div>
        </section>

        {/* API Reference */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">API Reference</h2>
          <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/20 rounded-md p-3">
                <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">API Documentation</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Comprehensive reference for Recoverly's REST API. Learn how to integrate with our platform.
                </p>
                <div className="mt-4 flex space-x-4">
                  <Link href="/api-docs" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    View API Docs
                  </Link>
                  <Link href="/api-docs/download" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-[#242424] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Download className="-ml-1 mr-2 h-4 w-4" />
                    Download
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

interface DocumentationCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  comingSoon?: boolean;
}

const DocumentationCard = ({ title, description, icon: Icon, link, comingSoon = false }: DocumentationCardProps) => (
  <Link href={link} className="block group">
    <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-lg h-full border border-transparent hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/20 rounded-md p-2">
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
            {comingSoon && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                Coming Soon
              </span>
            )}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  </Link>
);

const gettingStarted = [
  {
    title: 'Getting Started Guide',
    description: 'Learn the basics of Recoverly and set up your account in minutes.',
    icon: FileText,
    link: '/docs/getting-started'
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides to master Recoverly features.',
    icon: Video,
    link: '/docs/videos'
  },
  {
    title: 'Best Practices',
    description: 'Learn the recommended ways to use Recoverly for maximum efficiency.',
    icon: BookOpen,
    link: '/docs/best-practices'
  }
];

const guides = [
  {
    title: 'User Management',
    description: 'Learn how to add, remove, and manage user accounts and permissions.',
    icon: FileText,
    link: '/docs/guides/user-management'
  },
  {
    title: 'Security Settings',
    description: 'Configure security options and enable two-factor authentication.',
    icon: FileText,
    link: '/docs/guides/security'
  },
  {
    title: 'API Integration',
    description: 'Step-by-step guide to integrating with our API.',
    icon: Code,
    link: '/docs/guides/api-integration'
  },
  {
    title: 'Troubleshooting',
    description: 'Common issues and how to resolve them.',
    icon: FileText,
    link: '/docs/guides/troubleshooting'
  },
  {
    title: 'Data Import/Export',
    description: 'How to import and export your data in Recoverly.',
    icon: Download,
    link: '/docs/guides/data-import-export',
    comingSoon: true
  },
  {
    title: 'Advanced Features',
    description: 'Learn about advanced features and customization options.',
    icon: FileText,
    link: '/docs/guides/advanced-features',
    comingSoon: true
  }
];
