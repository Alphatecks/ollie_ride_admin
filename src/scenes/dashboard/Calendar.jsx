import { useState } from "react";
import { format } from "date-fns"; // format is used to display dates
import { cn } from "@/lib/utils.js"; // Utility for classnames
import { Calendar } from "@/components/ui/calendar"; // Calendar component
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Popover for dropdown
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export function CalendarForm() {
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null }); // Hold start and end dates

  // Helper function to safely format dates
  const formatDate = (date) => {
    return date && !isNaN(date) ? format(date, "PPP") : "Pick a date"; // Check if date is valid, else show default
  };

  // Handle selecting a date range (start and end)
  const handleDateSelect = (date) => {
    if (date) {
      setSelectedRange((prev) => {
        if (!prev.start || (prev.start && prev.end)) {
          return { start: date, end: null }; // Set start date, reset end if both already selected
        } else if (prev.start && !prev.end && date >= prev.start) {
          return { start: prev.start, end: date }; // Set end date if it's after the start
        } else {
          return { start: date, end: null }; // Reset if earlier date clicked again
        }
      });
    }
  };

  return (
    <div className="space-y-8 bg-white">
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "w-[240px] flex gap-2 justify-between items-center py-2 cursor-pointer px-4 font-normal",
              !selectedRange.start && "text-muted-foreground" // Gray text when no date selected
            )}
          >
            <CalendarMonthOutlinedIcon
              className="w-10 h-10"
              style={{ fontSize: 17 }}
            />
            <div className="flex flex-col w-full">
              <p className="text-[10px] flex">Filter</p>
              {/* Safely display the selected dates */}
              {selectedRange.start && selectedRange.end ? (
                `${formatDate(selectedRange.start)} - ${formatDate(selectedRange.end)}`
              ) : selectedRange.start ? (
                `${formatDate(selectedRange.start)}`
              ) : (
                <p className="text-[10px] text-left text-gray-500">
                  Pick a date
                </p>
              )}
            </div>
            <ExpandMoreOutlinedIcon
              className="w-10 h-10"
              style={{ fontSize: 17 }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Calendar
            mode="range"
            selected={{ from: selectedRange.start, to: selectedRange.end }} // Correctly pass selected range
            onSelect={handleDateSelect} // Handle selection
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01") // Disable dates out of range
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
