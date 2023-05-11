import type { FC, ChangeEvent, KeyboardEvent } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Input from '../Input/input';
import type { DataSourceType, AutoCompleteProps } from './interface';
import { Icon } from 'raind';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import './style/index.less';

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 500);
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });
  // 函数防抖
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestions(results);
        if (results.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
  }, [debouncedValue, fetchSuggestions]);

  const highlight = (index: number) => {
    let tempIdnex = index;
    if (index < 0) tempIdnex = 0;
    if (index >= suggestions.length) {
      tempIdnex = suggestions.length - 1;
    }
    setHighlightIndex(tempIdnex);
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        highlight(highlightIndex - 1);
        break;
      case 40:
        highlight(highlightIndex + 1);
        break;
      case 27:
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
    triggerSearch.current = true;
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <CSSTransition
        in={showDropdown || loading}
        timeout={300}
        appear
        mountOnEnter
        classNames={`rain-animation`}
        unmountOnExit
      >
        <ul className="rain-suggestion-list">
          {loading && (
            <ul className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </ul>
          )}
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'item-highlighted': index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => {
                  handleSelect(item);
                }}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </CSSTransition>
    );
  };
  return (
    <div className="rain-auto-complete" ref={componentRef}>
      <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeydown} {...restProps} />

      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
