import { useState, useRef, useEffect } from 'react';

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  error = false,
  disabled = false,
  id,
  name,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Select Trigger */}
      <button
        type="button"
        id={id}
        name={name}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
          style={{
            width: '100%',
            height: '48px',
            padding: '0 16px',
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            color: 'var(--color-text-primary)',
            opacity: value ? 1 : 0.6,
            backgroundColor: 'rgba(196, 135, 135, 0.3)',
            border: 'none',
            borderBottom: error ? '1px solid #B5533C' : '1px solid var(--color-border)',
            borderRadius: '20px',
            outline: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'border-color 0.2s, background-color 300ms, color 300ms',
          }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span style={{ textTransform: 'none' }}>{value || placeholder}</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          role="listbox"
          className="custom-select-dropdown"
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={value === option}
              onClick={() => handleSelect(option)}
              className={`custom-select-option ${value === option ? 'selected' : ''}`}
              onMouseEnter={(e) => {
                if (value !== option) {
                  e.currentTarget.classList.add('hovered');
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('hovered');
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Hide scrollbar and add responsive styles */}
      <style>{`
        .custom-select-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 4px;
          background-color: #eee1db;
          border: 1px solid var(--color-accent);
          border-radius: 20px;
          max-height: 400px;
          overflow-y: auto;
          z-index: 2000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .custom-select-dropdown::-webkit-scrollbar {
          display: none;
        }
        
        .custom-select-option {
          width: 100%;
          padding: 12px 16px;
          font-family: var(--font-body);
          font-size: 18px;
          color: var(--color-text-primary);
          background-color: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.15s;
          text-transform: none;
        }
        
        .custom-select-option.selected {
          background-color: var(--color-accent);
        }
        
        .custom-select-option.hovered:not(.selected) {
          background-color: rgba(196, 135, 135, 0.3);
        }
        
        /* Extra Small Devices (phones, 480px and down) */
        @media (max-width: 480px) {
          .custom-select-option {
            padding: 10px 12px !important;
            font-size: 16px !important;
          }
        }
        
        /* Small Devices (tablets, 768px and down) */
        @media (max-width: 768px) {
          .custom-select-dropdown {
            max-height: 300px !important;
          }
        }
      `}</style>
    </div>
  );
}
