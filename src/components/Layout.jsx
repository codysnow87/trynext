import NavigationMenu from './NavigationMenu';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div>
      <NavigationMenu />
      <main>{children}</main>
    </div>
  );
};

// PropTypes validation for 'children'
Layout.propTypes = {
  children: PropTypes.node.isRequired,  // 'children' can be any renderable React node (string, element, array of nodes, etc.)
};

export default Layout;
