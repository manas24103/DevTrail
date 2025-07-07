import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowSmUpIcon,
  ArrowSmDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline';

/**
 * Table component for displaying tabular data with sorting, pagination, and selection
 */
const Table = ({
  columns = [],
  data = [],
  loading = false,
  onRowClick,
  rowKey = 'id',
  className = '',
  headerClassName = '',
  bodyClassName = '',
  rowClassName = '',
  cellClassName = '',
  emptyText = 'No data available',
  loadingText = 'Loading...',
  sortable = true,
  pagination = true,
  pageSize = 10,
  showSizeChanger = true,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  currentPage: controlledCurrentPage,
  total: controlledTotal,
  rowSelection,
  ...props
}) => {
  const isControlled = controlledCurrentPage !== undefined && controlledTotal !== undefined;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeState, setPageSizeState] = useState(pageSize);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Use controlled or uncontrolled state
  const actualPage = isControlled ? controlledCurrentPage : currentPage;
  const actualPageSize = isControlled ? pageSize : pageSizeState;
  const total = isControlled ? controlledTotal : data.length;

  // Handle sorting
  const handleSort = (column) => {
    if (!sortable || !column.sortable) return;

    if (sortColumn === column.dataIndex) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to ascending
      setSortColumn(column.dataIndex);
      setSortDirection('asc');
    }
  };

  // Sort data if sortable
  const sortedData = useMemo(() => {
    if (!sortColumn) return [...data];

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      const column = columns.find(col => col.dataIndex === sortColumn);
      
      // Use custom sorter if provided
      if (column?.sorter) {
        return column.sorter(a, b, sortDirection);
      }
      
      // Default sorting
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection, columns]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (actualPage - 1) * actualPageSize;
    return sortedData.slice(startIndex, startIndex + actualPageSize);
  }, [sortedData, pagination, actualPage, actualPageSize]);

  // Handle page change
  const handlePageChange = (page) => {
    if (!isControlled) {
      setCurrentPage(page);
    }
    onPageChange?.(page);
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    if (!isControlled) {
      setPageSizeState(newSize);
      setCurrentPage(1); // Reset to first page
    }
    onPageSizeChange?.(newSize);
  };

  // Handle row selection
  const handleRowSelect = (row, checked) => {
    const key = row[rowKey];
    let newSelectedRowKeys = [...selectedRowKeys];
    
    if (checked) {
      newSelectedRowKeys = [...newSelectedRowKeys, key];
    } else {
      newSelectedRowKeys = newSelectedRowKeys.filter(k => k !== key);
    }
    
    setSelectedRowKeys(newSelectedRowKeys);
    rowSelection?.onChange?.(newSelectedRowKeys, newSelectedRowKeys.map(k => 
      data.find(item => item[rowKey] === k)
    ));
  };

  // Handle select all
  const handleSelectAll = (checked) => {
    const currentPageKeys = paginatedData.map(item => item[rowKey]);
    let newSelectedRowKeys = [...selectedRowKeys];n    
    if (checked) {
      // Add all non-selected keys from current page
      currentPageKeys.forEach(key => {
        if (!newSelectedRowKeys.includes(key)) {
          newSelectedRowKeys.push(key);
        }
      });
    } else {
      // Remove all keys from current page
      newSelectedRowKeys = newSelectedRowKeys.filter(k => !currentPageKeys.includes(k));
    }
    
    setSelectedRowKeys(newSelectedRowKeys);
    rowSelection?.onChange?.(newSelectedRowKeys, newSelectedRowKeys.map(k => 
      data.find(item => item[rowKey] === k)
    ));
  };

  // Check if all rows on current page are selected
  const allSelected = paginatedData.length > 0 && 
    paginatedData.every(item => selectedRowKeys.includes(item[rowKey]));
  
  // Check if some rows on current page are selected
  const someSelected = !allSelected && 
    paginatedData.some(item => selectedRowKeys.includes(item[rowKey]));

  // Render sort indicator
  const renderSortIndicator = (column) => {
    if (!sortable || !column.sortable || sortColumn !== column.dataIndex) {
      return <span className="opacity-0 group-hover:opacity-50"><DotsHorizontalIcon className="w-4 h-4" /></span>;
    }
    
    return sortDirection === 'asc' ? (
      <ArrowSmUpIcon className="w-4 h-4 text-primary-500" />
    ) : (
      <ArrowSmDownIcon className="w-4 h-4 text-primary-500" />
    );
  };

  // Render cell content
  const renderCell = (item, column) => {
    if (column.render) {
      return column.render(item[column.dataIndex], item);
    }
    return item[column.dataIndex];
  };

  // Render loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 text-gray-500 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mr-3"></div>
        {loadingText}
      </div>
    );
  }

  // Render empty state
  if (data.length === 0) {
    return (
      <div className={`flex items-center justify-center p-8 text-gray-500 ${className}`}>
        {emptyText}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
            <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${className}`} {...props}>
              <thead className={`bg-gray-50 dark:bg-gray-800 ${headerClassName}`}>
                <tr>
                  {/* Selection checkbox */}
                  {rowSelection && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-10">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        checked={allSelected}
                        ref={el => {
                          if (el) {
                            el.indeterminate = someSelected;
                          }
                        }}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </th>
                  )}
                  
                  {/* Table headers */}
                  {columns.map((column) => (
                    <th
                      key={column.dataIndex || column.key}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
                        column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group' : ''
                      } ${column.className || ''}`}
                      onClick={() => handleSort(column)}
                    >
                      <div className="flex items-center">
                        {column.title}
                        {column.sortable && (
                          <span className="ml-1">
                            {renderSortIndicator(column)}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 ${bodyClassName}`}>
                {paginatedData.map((item, rowIndex) => {
                  const isSelected = selectedRowKeys.includes(item[rowKey]);
                  const rowClasses = [
                    'hover:bg-gray-50 dark:hover:bg-gray-700',
                    onRowClick ? 'cursor-pointer' : '',
                    isSelected ? 'bg-blue-50 dark:bg-blue-900/30' : '',
                    rowClassName
                  ].filter(Boolean).join(' ');
                  
                  return (
                    <tr
                      key={item[rowKey] || rowIndex}
                      className={rowClasses}
                      onClick={() => onRowClick?.(item, rowIndex)}
                    >
                      {/* Selection checkbox */}
                      {rowSelection && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleRowSelect(item, e.target.checked);
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                      )}
                      
                      {/* Table cells */}
                      {columns.map((column) => (
                        <td
                          key={column.dataIndex || column.key}
                          className={`px-6 py-4 whitespace-nowrap text-sm ${cellClassName} ${column.cellClassName || ''}`}
                        >
                          {renderCell(item, column)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between mt-4 px-4 sm:px-0">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(actualPage - 1)}
              disabled={actualPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(actualPage + 1)}
              disabled={actualPage * actualPageSize >= total}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{(actualPage - 1) * actualPageSize + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(actualPage * actualPageSize, total)}
                </span>{' '}
                of <span className="font-medium">{total}</span> results
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Page size selector */}
              {showSizeChanger && (
                <div className="flex items-center text-sm">
                  <span className="mr-2 text-gray-700 dark:text-gray-300">Show:</span>
                  <select
                    value={actualPageSize}
                    onChange={handlePageSizeChange}
                    className="block w-20 pl-3 pr-10 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {pageSizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Pagination controls */}
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(actualPage - 1)}
                  disabled={actualPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                
                {/* Page numbers */}
                {(() => {
                  const pageCount = Math.ceil(total / actualPageSize);
                  const pages = [];
                  
                  // Always show first page
                  pages.push(
                    <button
                      key={1}
                      onClick={() => handlePageChange(1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        1 === actualPage
                          ? 'z-10 bg-primary-50 border-primary-500 text-primary-600 dark:bg-primary-900/30 dark:border-primary-700 dark:text-primary-200'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      1
                    </button>
                  );
                  
                  // Calculate range of pages to show
                  let startPage = Math.max(2, actualPage - 1);
                  let endPage = Math.min(pageCount - 1, actualPage + 1);
                  
                  // Adjust if we're near the start
                  if (actualPage <= 3) {
                    endPage = Math.min(4, pageCount - 1);
                  }
                  
                  // Adjust if we're near the end
                  if (actualPage >= pageCount - 2) {
                    startPage = Math.max(2, pageCount - 3);
                  }
                  
                  // Add ellipsis after first page if needed
                  if (startPage > 2) {
                    pages.push(
                      <span key="start-ellipsis" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                        ...
                      </span>
                    );
                  }
                  
                  // Add middle pages
                  for (let i = startPage; i <= endPage; i++) {
                    if (i > 1 && i < pageCount) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => handlePageChange(i)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            i === actualPage
                              ? 'z-10 bg-primary-50 border-primary-500 text-primary-600 dark:bg-primary-900/30 dark:border-primary-700 dark:text-primary-200'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          {i}
                        </button>
                      );
                    }
                  }
                  
                  // Add ellipsis before last page if needed
                  if (endPage < pageCount - 1) {
                    pages.push(
                      <span key="end-ellipsis" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                        ...
                      </span>
                    );
                  }
                  
                  // Always show last page if there is more than one page
                  if (pageCount > 1) {
                    pages.push(
                      <button
                        key={pageCount}
                        onClick={() => handlePageChange(pageCount)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          pageCount === actualPage
                            ? 'z-10 bg-primary-50 border-primary-500 text-primary-600 dark:bg-primary-900/30 dark:border-primary-700 dark:text-primary-200'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {pageCount}
                      </button>
                    );
                  }
                  
                  return pages;
                })()}
                
                <button
                  onClick={() => handlePageChange(actualPage + 1)}
                  disabled={actualPage * actualPageSize >= total}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Table Column definition
const TableColumn = ({ children }) => children;
TableColumn.displayName = 'Table.Column';

// Add static properties to Table
Table.Column = TableColumn;

// Prop Types
Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      dataIndex: PropTypes.string,
      key: PropTypes.string,
      render: PropTypes.func,
      sortable: PropTypes.bool,
      sorter: PropTypes.func,
      className: PropTypes.string,
      cellClassName: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  onRowClick: PropTypes.func,
  rowKey: PropTypes.string,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  cellClassName: PropTypes.string,
  emptyText: PropTypes.node,
  loadingText: PropTypes.node,
  sortable: PropTypes.bool,
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      current: PropTypes.number,
      pageSize: PropTypes.number,
      total: PropTypes.number,
      showSizeChanger: PropTypes.bool,
      pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
      onChange: PropTypes.func,
      onShowSizeChange: PropTypes.func,
    }),
  ]),
  pageSize: PropTypes.number,
  showSizeChanger: PropTypes.bool,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  currentPage: PropTypes.number,
  total: PropTypes.number,
  rowSelection: PropTypes.shape({
    selectedRowKeys: PropTypes.array,
    onChange: PropTypes.func,
    getCheckboxProps: PropTypes.func,
  }),
};

export default Table;
