import React, { useState, useEffect, useRef, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Tabs component for creating tabbed interfaces
 */
const Tabs = ({
  children,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  onChange,
  variant = 'default',
  className = '',
  tabClassName = '',
  contentClassName = '',
  ...props
}) => {
  const isControlled = controlledActiveKey !== undefined;
  const [activeTab, setActiveTab] = useState(
    isControlled ? controlledActiveKey : defaultActiveKey
  );
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);
  const tabsContainerRef = useRef(null);

  // Update active tab if controlled
  useEffect(() => {
    if (isControlled) {
      setActiveTab(controlledActiveKey);
    }
  }, [controlledActiveKey, isControlled]);

  // Update indicator position when active tab changes
  useEffect(() => {
    if (tabsRef.current.length === 0) return;
    
    const activeTabIndex = tabsRef.current.findIndex(
      (tab) => tab && tab.dataset.tabKey === activeTab
    );
    
    if (activeTabIndex === -1 || !tabsContainerRef.current) return;
    
    const activeTabElement = tabsRef.current[activeTabIndex];
    const containerRect = tabsContainerRef.current.getBoundingClientRect();
    const activeTabRect = activeTabElement.getBoundingClientRect();
    
    setIndicatorStyle({
      left: activeTabRect.left - containerRect.left,
      width: activeTabRect.width,
    });
  }, [activeTab, children]);

  const handleTabClick = (tabKey, event) => {
    if (!isControlled) {
      setActiveTab(tabKey);
    }
    
    if (onChange) {
      onChange(tabKey, event);
    }
  };

  // Get tab content for the active tab
  const renderActiveTabContent = () => {
    if (!children) return null;
    
    const activeTabPanel = Children.toArray(children).find(
      (child) => child.props.tabKey === activeTab
    );
    
    if (!activeTabPanel) return null;
    
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={contentClassName}
        >
          {activeTabPanel.props.children}
        </motion.div>
      </AnimatePresence>
    );
  };

  // Get variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'default':
        return 'border-b border-gray-200 dark:border-gray-700';
      case 'pills':
        return 'space-x-2';
      case 'underline':
        return 'border-b border-gray-200 dark:border-gray-700';
      case 'segmented':
        return 'bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex';
      default:
        return '';
    }
  };

  // Get tab classes based on active state and variant
  const getTabClasses = (isActive, isDisabled) => {
    const baseClasses = 'px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none';
    const disabledClasses = 'opacity-50 cursor-not-allowed';
    
    if (isDisabled) {
      return `${baseClasses} ${disabledClasses} ${tabClassName}`;
    }
    
    switch (variant) {
      case 'default':
        return `${baseClasses} ${
          isActive
            ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
        } ${tabClassName}`;
        
      case 'pills':
        return `${baseClasses} rounded-full ${
          isActive
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        } ${tabClassName}`;
        
      case 'underline':
        return `${baseClasses} ${
          isActive
            ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
        } ${tabClassName}`;
        
      case 'segmented':
        return `${baseClasses} rounded-md ${
          isActive
            ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
            : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600'
        } ${tabClassName}`;
        
      default:
        return baseClasses;
    }
  };

  return (
    <div className={`w-full ${className}`} {...props}>
      <div 
        ref={tabsContainerRef}
        className={`relative flex items-center ${getVariantClasses()}`}
        role="tablist"
      >
        {Children.map(children, (child, index) => {
          if (!child) return null;
          
          const { tabKey, title, disabled, icon: TabIcon } = child.props;
          const isActive = activeTab === tabKey;
          
          return (
            <button
              key={tabKey}
              ref={(el) => (tabsRef.current[index] = el)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tabKey}`}
              id={`tab-${tabKey}`}
              data-tab-key={tabKey}
              disabled={disabled}
              className={getTabClasses(isActive, disabled)}
              onClick={(e) => !disabled && handleTabClick(tabKey, e)}
            >
              <div className="flex items-center space-x-2">
                {TabIcon && <TabIcon className="w-4 h-4" />}
                <span>{title}</span>
              </div>
            </button>
          );
        })}
        
        {variant === 'default' && (
          <motion.div
            className="absolute bottom-0 h-0.5 bg-primary-600 dark:bg-primary-400"
            initial={false}
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          />
        )}
      </div>
      
      <div className="mt-4">
        {renderActiveTabContent()}
      </div>
    </div>
  );
};

// TabPane Component
const TabPane = ({ children, tabKey, title, icon, disabled, className }) => {
  return (
    <div
      id={`tabpanel-${tabKey}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabKey}`}
      className={className}
    >
      {children}
    </div>
  );
};

// Add display names for better dev tools
Tabs.displayName = 'Tabs';
TabPane.displayName = 'Tabs.Pane';

// Export Tabs with TabPane as a static property
const TabsComponent = Object.assign(Tabs, {
  Pane: TabPane,
});

export default TabsComponent;

// Prop Types
Tabs.propTypes = {
  children: PropTypes.node,
  defaultActiveKey: PropTypes.string,
  activeKey: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'pills', 'underline', 'segmented']),
  className: PropTypes.string,
  tabClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};

TabPane.propTypes = {
  tabKey: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  icon: PropTypes.elementType,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
