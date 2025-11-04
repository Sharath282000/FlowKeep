export function capitalizeWords(str: string) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function capitalizefirstletter(str: string) {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1);
}

export const getProgressColor = (value: number): string => {
  if (value === 0) return "*:bg-transparent";
  if (value > 0 && value <= 30) return "*:bg-destructive";
  if (value > 30 && value <= 60) return "*:bg-yellow-500";
  if (value > 60 && value <= 90) return "*:bg-green-500";
  if (value > 90) return "bg-primary";
  return "*:bg-transparent";
};

export const getPriorityClass = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-500";
    case "Medium":
      return "bg-yellow-500";
    case "Low":
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
};

export const getborderclass = (priority: string) => {
  switch (priority) {
    case "High":
      return "border-l-red-500";
    case "Medium":
      return "border-l-yellow-500";
    case "Low":
      return "border-l-green-500";
    default:
      return "border-l-gray-900";
  }
};

export const convertDate = (val: any) => {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (val?.toDate) return val.toDate().toISOString();
  if (val?.seconds) return new Date(val.seconds * 1000).toISOString();
  return String(val);
};

export const formatReadableDate = (val: any) => {
        const dateValue = convertDate(val);
        if (!dateValue) return "";
        const parsed = new Date(dateValue);
        if (isNaN(parsed.getTime())) return "";
        return parsed.toLocaleDateString("en-GB"); // e.g. "03/11/2025"
    };
