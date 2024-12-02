import PropTypes from 'prop-types';
import '@/styles/tailwind.css';
import NavigationMenu from '../components/NavigationMenu';

export const metadata = {
  title: 'ESOL Resources Platform',
  description: 'A platform for managing resources',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <NavigationMenu />
        <main className="children">{children}</main>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
