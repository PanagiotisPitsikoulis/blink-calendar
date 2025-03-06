import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeForDisplay(time: string): string {
  return time.padStart(2, "0");
}

export function createCalendarUrls(
  date: Date,
  time: string,
  title: string,
  description: string,
  location: string
) {
  if (!date || !time) return { google: "", apple: "", icsContent: "" };

  // Create event start and end time
  const [hours, minutes] = time.split(":");
  const startDate = new Date(date);
  startDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + 1);

  // Format dates
  const startFormatted = startDate
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/g, "");
  const endFormatted = endDate
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/g, "");

  const coordinates = {
    lat: 40.62999,
    lng: 22.95042,
  };

  // Simplified map URLs
  const googleMapsUrl = `https://maps.app.goo.gl/JN3CLUQ4janyyGrZ8`;
  const appleMapsUrl = `https://maps.apple.com/?ll=${coordinates.lat},${coordinates.lng}&q=Blink+Tattoo+Studio`;

  // Shorter description for QR codes
  const mapInfo = `\n\nFind us on Maps:\n${googleMapsUrl}`;

  // Google Calendar URL
  const googleParams = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description + mapInfo,
    location: location,
    dates: `${startFormatted}/${endFormatted}`,
  });
  const googleUrl = `https://calendar.google.com/calendar/render?${googleParams.toString()}`;

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:${escapeIcsValue(title)}`,
    `DESCRIPTION:${escapeIcsValue(description + mapInfo)}`,
    `LOCATION:${escapeIcsValue(location)}`,
    `GEO:${coordinates.lat};${coordinates.lng}`,
    `URL;VALUE=URI:${appleMapsUrl}`,
    `UID:${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}@blink-calendar.vercel.app`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const appleUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(
    icsContent
  )}`;

  return { google: googleUrl, apple: appleUrl, icsContent };
}

// Helper function to escape special characters in ICS values
function escapeIcsValue(value: string): string {
  return value
    .replace(/[\\;,]/g, (match) => "\\" + match)
    .replace(/\n/g, "\\n");
}
