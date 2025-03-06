"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo, useRef } from "react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { AppointmentView } from "@/components/AppointmentView";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Language,
  languages,
  defaultAppointmentTitles,
  defaultAppointmentDescriptions,
  studioLocations,
} from "@/config/languages";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { createCalendarUrls } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeSwitch";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [eventTitle, setEventTitle] = useState(
    defaultAppointmentTitles[language]
  );
  const [eventDescription, setEventDescription] = useState(
    defaultAppointmentDescriptions[language]
  );
  const [activeTab, setActiveTab] = useState("admin");
  const tabsRef = useRef<HTMLDivElement>(null);

  const strings = languages[language];
  const studioLocation = studioLocations[language];

  const calendarUrls = useMemo((): {
    google: string;
    apple: string;
    icsContent: string;
  } => {
    if (!date || !time) return { google: "", apple: "", icsContent: "" };

    return createCalendarUrls(
      date,
      time,
      eventTitle,
      eventDescription,
      studioLocation
    );
  }, [date, time, eventTitle, eventDescription, studioLocation]);

  const isFormComplete = date && time && eventTitle && eventDescription;

  const handleViewAppointment = () => {
    setActiveTab("user");
    tabsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBackToAdmin = () => {
    setActiveTab("admin");
    tabsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className='container mx-auto p-4 py-8 md:py-20'>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='w-full max-w-4xl mx-auto'
        ref={tabsRef}
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='admin'>{strings.admin}</TabsTrigger>
          <TabsTrigger value='user'>{strings.user}</TabsTrigger>
        </TabsList>

        <TabsContent value='admin'>
          <AppointmentForm
            strings={strings}
            eventTitle={eventTitle}
            eventDescription={eventDescription}
            date={date}
            time={time}
            onTitleChange={setEventTitle}
            onDescriptionChange={setEventDescription}
            onDateChange={setDate}
            onTimeChange={setTime}
          />
        </TabsContent>

        <TabsContent value='user'>
          <AppointmentView
            strings={strings}
            eventTitle={eventTitle}
            eventDescription={eventDescription}
            studioLocation={studioLocation}
            date={date}
            time={time}
            calendarUrls={calendarUrls}
            language={language}
            onBackToAdmin={handleBackToAdmin}
          />
        </TabsContent>
      </Tabs>

      <div className='mt-8 flex justify-center flex-row gap-4'>
        <Select
          value={language}
          onValueChange={(value: Language) => {
            setLanguage(value);
            setEventTitle(defaultAppointmentTitles[value]);
            setEventDescription(defaultAppointmentDescriptions[value]);
          }}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder={strings.selectLanguage} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='en'>English</SelectItem>
            <SelectItem value='el'>Ελληνικά</SelectItem>
          </SelectContent>
        </Select>
        <ThemeToggle />
      </div>

      {isFormComplete && activeTab === "admin" && (
        <FloatingActionButton onClick={handleViewAppointment} />
      )}
    </div>
  );
}
