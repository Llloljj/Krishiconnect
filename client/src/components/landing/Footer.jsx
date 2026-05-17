import { Link } from 'react-router-dom';
import { Sprout, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'AI Matching', href: '#ai-matching' },
    { label: 'Dashboards', href: '#dashboards' },
  ],
  Platform: [
    { label: 'Farmer', to: '/farmer' },
    { label: 'Company', to: '/company' },
    { label: 'FPO', to: '/fpo' },
  ],
  Account: [
    { label: 'Login', to: '/login' },
    { label: 'Sign up', to: '/signup' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-surface/50 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary-light">
                <Sprout className="h-5 w-5" />
              </span>
              <span className="font-heading text-xl font-bold text-white">
                Krishi<span className="text-primary-light">Connect</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
              AI-powered contract farming for a more connected, prosperous rural India.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary-light" />
                hello@krishiconnect.in
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary-light" />
                +91 1800-KRISHI
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary-light" />
                Bengaluru, India
              </li>
            </ul>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading text-sm font-semibold text-white">{title}</h4>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-muted transition hover:text-primary-light"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-muted transition hover:text-primary-light"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} KrishiConnect. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted">
            <a href="#" className="hover:text-primary-light">
              Twitter
            </a>
            <a href="#" className="hover:text-primary-light">
              LinkedIn
            </a>
            <a href="#" className="hover:text-primary-light">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
