import { createPortal } from 'react-dom';

export const Menu = ({ isOpen, menuRef, style, children }) => {
  if (!isOpen) return null;
  return createPortal(
    <div
      ref={menuRef}
      className={`dropdown-5-menu ${isOpen ? 'open' : ''}`}
      style={style}
    >
      <div className='dropdown-5-menu-inner'>{children}</div>
    </div>,
    document.body
  );
};
