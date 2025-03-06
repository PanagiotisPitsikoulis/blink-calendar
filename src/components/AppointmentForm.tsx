import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LanguageStrings } from "@/config/languages";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

interface AppointmentFormProps {
  strings: LanguageStrings;
  eventTitle: string;
  eventDescription: string;
  date: Date | undefined;
  time: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (value: string) => void;
}

export function AppointmentForm({
  strings,
  eventTitle,
  eventDescription,
  date,
  time,
  onTitleChange,
  onDescriptionChange,
  onDateChange,
  onTimeChange,
}: AppointmentFormProps) {
  return (
    <Card>
      <CardHeader className='grid grid-cols-3'>
        <div className='col-span-2 flex flex-col gap-2'>
          <CardTitle>{strings.appointmentSchedule}</CardTitle>
          <CardDescription>{strings.selectDateTime}</CardDescription>
        </div>
        <div className='w-full flex items-center justify-end'>
          <Link href='https://www.blinktattoo.gr/'>
            <Image
              src='/blink.avif'
              className='shrink-0'
              alt='Blink Tattoo Studio Logo'
              width={60}
              height={60}
            />
          </Link>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <div>
            <h3 className='text-lg font-semibold mb-4'>
              {strings.appointmentDetails}
            </h3>
            <div className='space-y-4'>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='title'>{strings.appointmentTitle}</Label>
                <Input
                  id='title'
                  value={eventTitle}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder={strings.appointmentTitlePlaceholder}
                />
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='description'>{strings.description}</Label>
                <Textarea
                  id='description'
                  value={eventDescription}
                  onChange={(e) => onDescriptionChange(e.target.value)}
                  placeholder={strings.descriptionPlaceholder}
                  className='min-h-[80px]'
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-4'>{strings.selectDate}</h3>
          <Calendar
            mode='single'
            selected={date}
            onSelect={onDateChange}
            className='rounded-md border mx-auto'
          />
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-4'>{strings.selectTime}</h3>
          <div className='flex justify-start'>
            <div className='w-[150px]'>
              <Label htmlFor='time'>{strings.time}</Label>
              <Input
                id='time'
                type='time'
                min='00:00'
                max='23:59'
                value={time}
                className='mt-2'
                onChange={(e) => onTimeChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
