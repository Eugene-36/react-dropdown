import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import './Dropdown.css';
import joe from '../assets/joe.png';
import gemini from '../assets/gemini.png';
import logoDrive from '../assets/logo.svg';
import { Menu } from '../components/Menu/Menu.jsx';

const GAP = 8;
const PADDING = 8;
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: -9999, left: -9999 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  //Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);
  //Handle click outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const update = () => {
      const trigger = buttonRef?.current?.getBoundingClientRect();
      const menuEl = menuRef?.current;

      if (!trigger || !menuEl) return;

      //сначала где хотим
      const menuRect = menuEl.getBoundingClientRect(); // размеры меню
      let top = trigger.bottom + GAP; //под кнопкой
      let left = trigger.right - menuRect.width; //по правому краю кнопки

      //флип по вертикали, если не влазит вниз
      const willOverflowBottom =
        top + menuRect.height > window.innerHeight - PADDING;
      if (
        willOverflowBottom &&
        trigger.top - GAP - menuRect.height >= PADDING
      ) {
        top = trigger.top - GAP - menuRect.height; //сверху кнопки
      }

      //кламп по горизонтали
      left = clamp(left, PADDING, window.innerWidth - menuRect.width - PADDING);

      setCoords({ top, left });
    };
    //вызывать сразу и на след кадре (чтобы поймать финальные разммеры)
    update();
    const raf = requestAnimationFrame(update);
    //пресчитываем при ресайзе/скролле
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [isOpen]);
  return (
    <section>
      <div className='wrapper'>
        <div className={`dropdown-5 ${isOpen ? 'open' : ''}`}>
          <div className='drive'>
            <span className='material-symbols-outlined'>menu</span>
            <div className='drive-logo'>
              <img src={logoDrive} alt='logo icon' style={{ width: '45px' }} />
              <span> Drive</span>
            </div>
          </div>
          <div></div>
          <span className='material-symbols-outlined'>settings</span>
          <button
            ref={buttonRef}
            className='material-symbols-outlined'
            onClick={() => setIsOpen((v) => !v)}
          >
            apps
          </button>
          <img src={joe} alt='Person image' style={{ width: '60px' }} />
          <span className='material-symbols-outlined'>help</span>
          <Menu
            isOpen={isOpen}
            menuRef={menuRef}
            style={{ position: 'fixed', top: coords.top, left: coords.left }}
          >
            <button>
              <img src={joe} />
              <span>Account</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 0' }}></span>
              <span>Drive</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 -2415px' }}></span>
              <span>Gmail</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 -3174px' }}></span>
              <span>YouTube</span>
            </button>
            <button>
              <img src={gemini} />
              <span>Gemini</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 -1794px' }}></span>
              <span>Maps</span>
            </button>
            <button>
              <span></span>
              <span>Search</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 -759px' }}></span>
              <span>Calendar</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 -897px' }}></span>
              <span>Play</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 -414px' }}></span>
              <span>News</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 -966px' }}></span>
              <span>Photos</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 -1104px' }}></span>
              <span>Meet</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 -69px' }}></span>
              <span>Chat</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 -2346px' }}></span>
              <span>Translate</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 -1449px' }}></span>
              <span>Contacts</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 -2070px' }}></span>
              <span>Ad Centre</span>
            </button>
            <button>
              <span style={{ backgroundPosition: '0 -1932px' }}></span>
              <span>Shopping</span>
            </button>
          </Menu>
        </div>
      </div>
    </section>
  );
};
