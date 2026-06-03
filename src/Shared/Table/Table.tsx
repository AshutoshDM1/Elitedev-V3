import * as React from "react";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface Column<T> {
  header: React.ReactNode;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface ReusableTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  className?: string;
  containerClassName?: string;
  onHeaderClick?: (accessorKey: string) => void;
  sortKey?: string;
  sortOrder?: "asc" | "desc";
}

export function Table<T>({
  columns,
  data,
  onRowClick,
  className,
  containerClassName,
  onHeaderClick,
  sortKey,
  sortOrder,
}: ReusableTableProps<T>) {
  const [widths, setWidths] = React.useState<Record<string, number>>({});

  const handleMouseDown = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    
    // Find the th element containing the handle to get its current actual width
    const headerEl = e.currentTarget.parentElement;
    if (!headerEl) return;
    const startWidth = headerEl.getBoundingClientRect().width;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(20, startWidth + deltaX); // Keep min size of 20px
      setWidths((prev) => ({
        ...prev,
        [key]: newWidth,
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden border border-dashed border-zinc-400 dark:border-zinc-700 rounded-none bg-background/50 backdrop-blur-sm",
        containerClassName
      )}
    >
      <div className="relative w-full overflow-x-auto">
        <ShadcnTable 
          className={cn("border-collapse min-w-[700px]", className)}
          style={{ tableLayout: Object.keys(widths).length > 0 ? "fixed" : "auto" }}
        >
          <TableHeader>
            <TableRow className="border-b border-dashed border-zinc-400 dark:border-zinc-700 hover:bg-transparent rounded-none">
              {columns.map((column, index) => {
                const columnKey = String(column.accessorKey) + index;
                const columnWidth = widths[columnKey];
                const isSortable = onHeaderClick && ["id", "title", "isActive", "createdAt"].includes(column.accessorKey as string);
                
                return (
                  <TableHead
                    key={columnKey}
                    onClick={() => {
                      if (isSortable) {
                        onHeaderClick?.(column.accessorKey as string);
                      }
                    }}
                    style={{
                      width: columnWidth ? `${columnWidth}px` : undefined,
                      minWidth: columnWidth ? `${columnWidth}px` : undefined,
                    }}
                    className={cn(
                      "relative group font-mono text-[10px] tracking-wider uppercase border-r border-dashed border-zinc-400 dark:border-zinc-700 last:border-r-0 py-3 px-4 text-muted-foreground bg-muted/40 select-none",
                      isSortable && "cursor-pointer hover:bg-muted/60 transition-colors",
                      column.className
                    )}
                  >
                    <div className="flex items-center gap-1 truncate pr-2">
                      <span>{column.header}</span>
                      {isSortable && sortKey === column.accessorKey && (
                        <span className="text-[9px] font-bold text-foreground font-sans">
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleMouseDown(columnKey, e);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize select-none bg-transparent hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-colors active:bg-zinc-550 z-10"
                    />
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center font-mono text-xs text-muted-foreground"
                >
                  NO DATA FOUND
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    "border-b border-dashed border-zinc-400 dark:border-zinc-700 last:border-b-0 hover:bg-muted/20 transition-colors duration-150 ease-in-out cursor-default rounded-none",
                    onRowClick && "cursor-pointer"
                  )}
                >
                  {columns.map((column, colIndex) => {
                    const columnKey = String(column.accessorKey) + colIndex;
                    const columnWidth = widths[columnKey];
                    const cellValue = column.cell
                      ? column.cell(item)
                      : (item[column.accessorKey as keyof T] as React.ReactNode);

                    return (
                      <TableCell
                        key={colIndex}
                        style={{
                          width: columnWidth ? `${columnWidth}px` : undefined,
                          minWidth: columnWidth ? `${columnWidth}px` : undefined,
                        }}
                        className={cn(
                          "font-sans text-xs border-r border-dashed border-zinc-400 dark:border-zinc-700 last:border-r-0 p-4 align-top text-foreground/90 overflow-hidden",
                          column.className
                        )}
                      >
                        {cellValue}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </ShadcnTable>
      </div>
    </div>
  );
}
